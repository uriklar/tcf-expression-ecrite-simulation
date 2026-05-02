import { useEffect, useState } from 'react';
import { AISettingsPanel } from './components/AISettingsPanel';
import { GeneralInstructions } from './components/GeneralInstructions';
import { Layout } from './components/Layout';
import { ResizeSplit } from './components/ResizeSplit';
import { Sidebar } from './components/Sidebar';
import { TaskDescription } from './components/TaskDescription';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { WritingEditor } from './components/WritingEditor';
import { useActiveEditor } from './hooks/useActiveEditor';
import { useAISettings } from './hooks/useAISettings';
import { useCountdownTimer } from './hooks/useCountdownTimer';
import { useWritingTasks } from './hooks/useWritingTasks';
import type { GradingResult, SuggestionMode, SuggestionResult, WritingTask } from './types';
import { insertAtCursor } from './utils/insertAtCursor';

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

export default function App() {
  const { tasks, activeTask, activeTaskId, setActiveTaskId, updateAnswer, updateTaskAI } = useWritingTasks();
  const { settings: aiSettings, providerModels, updateSettings, clearSavedToken } = useAISettings();
  const { timeRemaining, hasStarted, isLocked, timerState, start, end } = useCountdownTimer();
  const editorRef = useActiveEditor();
  const [isUppercase, setIsUppercase] = useState(false);
  const isEditorDisabled = !hasStarted || isLocked;

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
    return <GeneralInstructions onStart={start} />;
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
          onEnd={end}
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
