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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: aiSettings.provider,
          apiKey: aiSettings.apiKey,
          model: aiSettings.model,
          feedbackLanguage: aiSettings.feedbackLanguage,
          task: getAIContextTask(activeTask),
          answer: activeTask.answer,
        }),
      });
      const body = (await response.json()) as { result?: GradingResult; error?: string };

      if (!response.ok || !body.result) {
        throw new Error(body.error || 'Could not grade this answer.');
      }

      updateTaskAI(activeTask.id, { aiStatus: 'idle', aiError: undefined, gradingResult: body.result });
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: aiSettings.provider,
          apiKey: aiSettings.apiKey,
          model: aiSettings.model,
          feedbackLanguage: aiSettings.feedbackLanguage,
          mode,
          task: getAIContextTask(activeTask),
          answer: activeTask.answer,
        }),
      });
      const body = (await response.json()) as { result?: SuggestionResult; error?: string };

      if (!response.ok || !body.result) {
        throw new Error(body.error || 'Could not generate a suggestion.');
      }

      updateTaskAI(activeTask.id, { aiStatus: 'idle', aiError: undefined, suggestionResult: body.result });
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
