import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { ResizeSplit } from './components/ResizeSplit';
import { Sidebar } from './components/Sidebar';
import { TaskDescription } from './components/TaskDescription';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { WritingEditor } from './components/WritingEditor';
import { useActiveEditor } from './hooks/useActiveEditor';
import { useCountdownTimer } from './hooks/useCountdownTimer';
import { useWritingTasks } from './hooks/useWritingTasks';
import { insertAtCursor } from './utils/insertAtCursor';

export default function App() {
  const { tasks, activeTask, activeTaskId, setActiveTaskId, updateAnswer } = useWritingTasks();
  const { timeRemaining, hasStarted, isLocked, timerState, start, end } = useCountdownTimer();
  const editorRef = useActiveEditor();
  const [isUppercase, setIsUppercase] = useState(false);
  const isEditorDisabled = !hasStarted || isLocked;

  useEffect(() => {
    editorRef.current?.focus();
  }, [activeTaskId, editorRef]);

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
        />
      }
      main={
        <>
          {isLocked ? (
            <div className="final-banner" role="status">
              Time is over. Your responses are locked, and final word counts are shown in the task list.
            </div>
          ) : null}
          <ResizeSplit
            description={<TaskDescription task={activeTask} />}
            editor={
              <WritingEditor
                task={activeTask}
                disabled={isEditorDisabled}
                disabledMessage={isLocked ? 'The simulation has ended.' : 'Start the simulation to begin writing.'}
                editorRef={editorRef}
                onChange={(answer) => updateAnswer(activeTask.id, answer)}
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
