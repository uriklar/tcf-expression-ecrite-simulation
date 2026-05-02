import { RefObject } from 'react';
import type { WritingTask } from '../types';
import { countWords } from '../utils/wordCount';

type WritingEditorProps = {
  task: WritingTask;
  disabled: boolean;
  disabledMessage: string;
  editorRef: RefObject<HTMLTextAreaElement>;
  onChange: (answer: string) => void;
};

export function WritingEditor({ task, disabled, disabledMessage, editorRef, onChange }: WritingEditorProps) {
  const wordCount = countWords(task.answer);
  const isAboveMax = wordCount > task.maxWords;
  const isBelowMin = wordCount > 0 && wordCount < task.minWords;

  return (
    <section className="writing-editor" aria-labelledby="editor-heading">
      <div className="editor-toolbar">
        <div>
          <p className="eyebrow">Response</p>
          <h2 id="editor-heading">Write your answer</h2>
        </div>
        <div className="word-count">
          <strong>{wordCount}</strong>
          <span>words</span>
        </div>
      </div>

      <textarea
        ref={editorRef}
        value={task.answer}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        autoComplete="off"
        aria-label={`${task.title} response`}
        placeholder={disabled ? disabledMessage : 'Type your response in French...'}
      />

      <div className="editor-feedback" aria-live="polite">
        {disabled ? <span className="feedback-locked">Writing is locked.</span> : null}
        {isBelowMin ? <span className="feedback-warning">Below minimum word count.</span> : null}
        {isAboveMax ? <span className="feedback-neutral">Above recommended word count.</span> : null}
      </div>
    </section>
  );
}
