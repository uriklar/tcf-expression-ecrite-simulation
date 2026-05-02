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
          <p className="eyebrow">Réponse</p>
          <h2 id="editor-heading">Rédigez votre réponse</h2>
        </div>
        <div className="word-count">
          <strong>{wordCount}</strong>
          <span>mots</span>
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
        aria-label={`Réponse à la ${task.title.toLowerCase()}`}
        placeholder={disabled ? disabledMessage : 'Rédigez votre réponse en français...'}
      />

      <div className="editor-feedback" aria-live="polite">
        {disabled ? <span className="feedback-locked">La rédaction est verrouillée.</span> : null}
        {isBelowMin ? <span className="feedback-warning">Nombre de mots inférieur au minimum.</span> : null}
        {isAboveMax ? <span className="feedback-warning">Nombre de mots supérieur au maximum.</span> : null}
      </div>
    </section>
  );
}
