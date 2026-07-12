import { useEffect, useState } from 'react';
import { AISettingsPanel } from './components/AISettingsPanel';
import { GeneralInstructions } from './components/GeneralInstructions';
import { Layout } from './components/Layout';
import { ModuleSwitcher, type AppModule } from './components/ModuleSwitcher';
import { ResizeSplit } from './components/ResizeSplit';
import { Sidebar } from './components/Sidebar';
import { Tache1Trainer } from './components/Tache1Trainer';
import { Tache2Trainer } from './components/Tache2Trainer';
import { TaskDescription } from './components/TaskDescription';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { WritingEditor } from './components/WritingEditor';
import { useActiveEditor } from './hooks/useActiveEditor';
import { useAISettings } from './hooks/useAISettings';
import { useCountdownTimer } from './hooks/useCountdownTimer';
import { useTaskBank } from './hooks/useTaskBank';
import { useWritingTasks } from './hooks/useWritingTasks';
import { taskIds } from './data/tasks';
import type { GradingResult, SuggestionMode, SuggestionResult, TaskBankItem, TaskSlotId, WritingTask } from './types';
import { insertAtCursor } from './utils/insertAtCursor';

type TaskSelection = Record<TaskSlotId, string>;

type SavedDraft = {
  answers: Partial<Record<TaskSlotId, string>>;
  updatedAt: number;
};

const DRAFT_STORAGE_KEY_PREFIX = 'tfc-ecrite.simulation-draft';
const DRAFT_TTL_MS = 24 * 60 * 60 * 1000;

type AIApiResponse<Result> = {
  result?: Result;
  error?: string;
};

async function readAIApiResponse<Result>(response: Response, fallbackError: string) {
  const responseText = await response.text();
  const body = parseAIApiResponse<Result>(responseText);

  if (!response.ok || !body?.result) {
    throw new Error(body?.error || readablePlatformError(responseText) || fallbackError);
  }

  return body.result;
}

function parseAIApiResponse<Result>(responseText: string): AIApiResponse<Result> | undefined {
  if (!responseText.trim()) {
    return undefined;
  }

  try {
    return JSON.parse(responseText) as AIApiResponse<Result>;
  } catch {
    return undefined;
  }
}

function readablePlatformError(responseText: string) {
  if (!responseText.trim()) {
    return undefined;
  }

  const lines = responseText
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.includes('FUNCTION_INVOCATION_FAILED')) {
    const requestId = lines.find((line) => /^[a-z0-9]+::/i.test(line));
    return `The production AI API failed on the server (FUNCTION_INVOCATION_FAILED${
      requestId ? `, request ${requestId}` : ''
    }). Check the Vercel function logs.`;
  }

  if (lines[0] && !lines[0].startsWith('<')) {
    return lines[0];
  }

  return undefined;
}

function createDefaultTaskSelection(taskBankItems: TaskBankItem[]): TaskSelection {
  return taskIds.reduce<TaskSelection>(
    (selection, taskId) => ({
      ...selection,
      [taskId]: taskBankItems.find((item) => item.taskId === taskId)?.id ?? '',
    }),
    { 1: '', 2: '', 3: '' },
  );
}

function getTaskSelectionFromUrl(taskBankItems: TaskBankItem[]): TaskSelection | undefined {
  const searchParams = new URLSearchParams(window.location.search);
  const selectedIds = taskIds.map((taskId) => searchParams.get(`q${taskId}`));

  if (selectedIds.every((selectedId) => !selectedId)) {
    return undefined;
  }

  const defaultSelection = createDefaultTaskSelection(taskBankItems);

  return taskIds.reduce<TaskSelection>((selection, taskId, index) => {
    const selectedId = selectedIds[index];
    const hasMatchingTask = taskBankItems.some((item) => item.taskId === taskId && item.id === selectedId);

    return {
      ...selection,
      [taskId]: hasMatchingTask && selectedId ? selectedId : defaultSelection[taskId],
    };
  }, defaultSelection);
}

function createInitialTaskSelection(taskBankItems: TaskBankItem[]) {
  return getTaskSelectionFromUrl(taskBankItems) ?? createDefaultTaskSelection(taskBankItems);
}

function getDraftStorageKey(selection: TaskSelection) {
  const selectionKey = taskIds.map((taskId) => selection[taskId]).join('|');
  return `${DRAFT_STORAGE_KEY_PREFIX}.${encodeURIComponent(selectionKey)}`;
}

function readSavedDraft(selection: TaskSelection): SavedDraft | undefined {
  try {
    const storedValue = window.localStorage.getItem(getDraftStorageKey(selection));

    if (!storedValue) {
      return undefined;
    }

    const parsedValue = JSON.parse(storedValue) as SavedDraft;

    if (!parsedValue.updatedAt || Date.now() - parsedValue.updatedAt > DRAFT_TTL_MS) {
      window.localStorage.removeItem(getDraftStorageKey(selection));
      return undefined;
    }

    return parsedValue;
  } catch {
    return undefined;
  }
}

function saveDraft(selection: TaskSelection, tasks: WritingTask[]) {
  try {
    const answers = tasks.reduce<Partial<Record<TaskSlotId, string>>>((savedAnswers, task) => {
      savedAnswers[task.id] = task.answer;
      return savedAnswers;
    }, {});

    window.localStorage.setItem(
      getDraftStorageKey(selection),
      JSON.stringify({
        answers,
        updatedAt: Date.now(),
      } satisfies SavedDraft),
    );
  } catch {
    // Ignore storage quota/private-mode failures so the writing UI remains usable.
  }
}

function clearSavedDraft(selection: TaskSelection) {
  try {
    window.localStorage.removeItem(getDraftStorageKey(selection));
  } catch {
    // Ignore storage failures so ending a simulation never crashes the app.
  }
}

function clearExpiredDrafts() {
  const now = Date.now();

  for (let index = window.localStorage.length - 1; index >= 0; index -= 1) {
    const key = window.localStorage.key(index);

    if (!key?.startsWith(`${DRAFT_STORAGE_KEY_PREFIX}.`)) {
      continue;
    }

    try {
      const storedValue = window.localStorage.getItem(key);
      const parsedValue = storedValue ? (JSON.parse(storedValue) as SavedDraft) : undefined;

      if (!parsedValue?.updatedAt || now - parsedValue.updatedAt > DRAFT_TTL_MS) {
        window.localStorage.removeItem(key);
      }
    } catch {
      window.localStorage.removeItem(key);
    }
  }
}

function updateUrlTaskSelection(selection: TaskSelection) {
  const url = new URL(window.location.href);

  taskIds.forEach((taskId) => {
    const selectedTaskItemId = selection[taskId];

    if (selectedTaskItemId) {
      url.searchParams.set(`q${taskId}`, selectedTaskItemId);
    } else {
      url.searchParams.delete(`q${taskId}`);
    }
  });

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (nextUrl !== currentUrl) {
    window.history.replaceState(null, '', nextUrl);
  }
}

export default function App() {
  const { taskBankItems, addTaskBankItem } = useTaskBank();
  const { tasks, activeTask, activeTaskId, setActiveTaskId, resetTasks, updateAnswer, updateTaskAI } = useWritingTasks();
  const { settings: aiSettings, providerModels, updateSettings, clearSavedToken } = useAISettings();
  const { timeRemaining, hasStarted, isLocked, timerState, start, end } = useCountdownTimer();
  const editorRef = useActiveEditor();
  const [activeModule, setActiveModule] = useState<AppModule>('simulation');
  const [isUppercase, setIsUppercase] = useState(false);
  const [selectedTaskItemIds, setSelectedTaskItemIds] = useState<TaskSelection>(() =>
    createInitialTaskSelection(taskBankItems),
  );
  const isEditorDisabled = !hasStarted || isLocked;

  useEffect(() => {
    clearExpiredDrafts();
  }, []);

  useEffect(() => {
    updateUrlTaskSelection(selectedTaskItemIds);
  }, [selectedTaskItemIds]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    if (isLocked) {
      clearSavedDraft(selectedTaskItemIds);
      return;
    }

    saveDraft(selectedTaskItemIds, tasks);
  }, [hasStarted, isLocked, selectedTaskItemIds, tasks]);

  useEffect(() => {
    editorRef.current?.focus();
  }, [activeTaskId, editorRef, hasStarted]);

  function handleInsert(character: string) {
    const editor = editorRef.current;

    if (!editor || isEditorDisabled) {
      return;
    }

    const { nextValue, nextCursor } = insertAtCursor(editor, activeTask.answer, character);
    updateAnswer(activeTask.id, nextValue);

    window.requestAnimationFrame(() => {
      editor.focus();
      editor.setSelectionRange(nextCursor, nextCursor);
    });
  }

  function handleSelectTaskItem(taskId: TaskSlotId, taskItemId: string) {
    setSelectedTaskItemIds((currentSelection) => ({
      ...currentSelection,
      [taskId]: taskItemId,
    }));
  }

  function handleRandomizeTaskSelection() {
    setSelectedTaskItemIds((currentSelection) =>
      taskIds.reduce<TaskSelection>((selection, taskId) => {
        const options = taskBankItems.filter((item) => item.taskId === taskId);
        const randomItem = options[Math.floor(Math.random() * options.length)] ?? options[0];

        return {
          ...selection,
          [taskId]: randomItem?.id ?? '',
        };
      }, currentSelection),
    );
  }

  function getSelectedTaskBankItems() {
    return taskIds.map((taskId) => {
      const selectedTask = taskBankItems.find(
        (item) => item.taskId === taskId && item.id === selectedTaskItemIds[taskId],
      );

      return selectedTask ?? taskBankItems.find((item) => item.taskId === taskId);
    }).filter((item): item is TaskBankItem => Boolean(item));
  }

  function handleStartSimulation() {
    resetTasks(getSelectedTaskBankItems(), readSavedDraft(selectedTaskItemIds)?.answers);
    start();
  }

  function handleEndSimulation() {
    clearSavedDraft(selectedTaskItemIds);
    end();
  }

  function getAIContextTask(task: WritingTask) {
    const documentContext = task.documents
      ?.map((document) => `${document.label}:\n${document.text}`)
      .join('\n\n');

    return {
      id: task.id,
      type: task.type,
      prompt: documentContext ? `${task.prompt}\n\nDocuments:\n${documentContext}` : task.prompt,
      minWords: task.minWords,
      maxWords: task.maxWords,
    };
  }

  async function handleGrade() {
    if (!aiSettings.apiKey.trim()) {
      updateTaskAI(activeTask.id, { aiStatus: 'error', aiError: 'Add an API token before checking with AI.' });
      return;
    }

    if (!activeTask.answer.trim()) {
      updateTaskAI(activeTask.id, { aiStatus: 'error', aiError: 'Write an answer before checking with AI.' });
      return;
    }

    updateTaskAI(activeTask.id, { aiStatus: 'grading', aiError: undefined });

    try {
      const response = await fetch('/api/ai/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${aiSettings.apiKey}`,
        },
        body: JSON.stringify({
          provider: aiSettings.provider,
          model: aiSettings.model,
          feedbackLanguage: aiSettings.feedbackLanguage,
          task: getAIContextTask(activeTask),
          answer: activeTask.answer,
        }),
      });
      const result = await readAIApiResponse<GradingResult>(response, 'Could not grade this answer.');

      updateTaskAI(activeTask.id, { aiStatus: 'idle', aiError: undefined, gradingResult: result });
    } catch (error) {
      updateTaskAI(activeTask.id, {
        aiStatus: 'error',
        aiError:
          error instanceof Error
            ? error.message
            : 'Could not grade this answer. Check your API token, provider, or model name.',
      });
    }
  }

  async function handleSuggest(mode: SuggestionMode) {
    if (!aiSettings.apiKey.trim()) {
      updateTaskAI(activeTask.id, { aiStatus: 'error', aiError: 'Add an API token before generating a suggestion.' });
      return;
    }

    if (mode === 'improve-original' && !activeTask.answer.trim()) {
      updateTaskAI(activeTask.id, {
        aiStatus: 'error',
        aiError: 'Write an answer before using improve-my-answer mode.',
      });
      return;
    }

    updateTaskAI(activeTask.id, { aiStatus: 'suggesting', aiError: undefined });

    try {
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${aiSettings.apiKey}`,
        },
        body: JSON.stringify({
          provider: aiSettings.provider,
          model: aiSettings.model,
          feedbackLanguage: aiSettings.feedbackLanguage,
          mode,
          task: getAIContextTask(activeTask),
          answer: activeTask.answer,
        }),
      });
      const result = await readAIApiResponse<SuggestionResult>(response, 'Could not generate a suggestion.');

      updateTaskAI(activeTask.id, { aiStatus: 'idle', aiError: undefined, suggestionResult: result });
    } catch (error) {
      updateTaskAI(activeTask.id, {
        aiStatus: 'error',
        aiError:
          error instanceof Error
            ? error.message
            : 'Could not generate a suggestion. Check your API token, provider, or model name.',
      });
    }
  }

  function handleReplaceSuggestion() {
    const suggestedAnswer = activeTask.suggestionResult?.suggestedAnswer;

    if (!suggestedAnswer) {
      return;
    }

    if (window.confirm('This will replace your current answer. Continue?')) {
      updateAnswer(activeTask.id, suggestedAnswer);
    }
  }

  if (!hasStarted) {
    return (
      <>
        <ModuleSwitcher activeModule={activeModule} onChange={setActiveModule} />
        {activeModule === 'simulation' ? (
          <GeneralInstructions
            taskBankItems={taskBankItems}
            selectedTaskItemIds={selectedTaskItemIds}
            onStart={handleStartSimulation}
            onSelectTaskItem={handleSelectTaskItem}
            onRandomizeSelection={handleRandomizeTaskSelection}
            onAddTask={addTaskBankItem}
          />
        ) : activeModule === 'tache1-trainer' ? (
          <Tache1Trainer />
        ) : (
          <Tache2Trainer />
        )}
      </>
    );
  }

  return (
    <Layout
      sidebar={
        <Sidebar
          tasks={tasks}
          activeTaskId={activeTaskId}
          timeRemaining={timeRemaining}
          timerState={timerState}
          hasStarted={hasStarted}
          isLocked={isLocked}
          onSelectTask={setActiveTaskId}
          onStart={start}
          onEnd={handleEndSimulation}
        >
          <AISettingsPanel
            settings={aiSettings}
            providerModels={providerModels}
            onChange={updateSettings}
            onClearSavedToken={clearSavedToken}
          />
        </Sidebar>
      }
      main={
        <>
          {isLocked ? (
            <div className="final-banner" role="status">
              Le temps est écoulé. Vos réponses sont verrouillées et les nombres de mots finaux sont affichés dans la
              liste des tâches.
            </div>
          ) : null}
          <ResizeSplit
            description={<TaskDescription task={activeTask} />}
            editor={
              <WritingEditor
                task={activeTask}
                disabled={isEditorDisabled}
                disabledMessage={
                  isLocked ? 'La simulation est terminée.' : 'Commencez la simulation pour rédiger votre réponse.'
                }
                editorRef={editorRef}
                onChange={(answer) => updateAnswer(activeTask.id, answer)}
                onGrade={handleGrade}
                onSuggest={handleSuggest}
                onReplaceSuggestion={handleReplaceSuggestion}
              />
            }
          />
        </>
      }
      keyboard={
        <VirtualKeyboard
          isUppercase={isUppercase}
          disabled={isEditorDisabled}
          onToggleCase={() => setIsUppercase((current) => !current)}
          onInsert={handleInsert}
        />
      }
    />
  );
}
