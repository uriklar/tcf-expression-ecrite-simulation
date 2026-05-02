import { RefObject, useState } from 'react';
import { Bot, WandSparkles } from 'lucide-react';
import type { SuggestionMode, WritingTask } from '../types';
import { AIResultsPanel } from './AIResultsPanel';
import { countWords } from '../utils/wordCount';

type WritingEditorProps = {
  task: WritingTask;
  disabled: boolean;
  disabledMessage: string;
  editorRef: RefObject<HTMLTextAreaElement>;
  onChange: (answer: string) => void;
  onGrade: () => void;
  onSuggest: (mode: SuggestionMode) => void;
  onReplaceSuggestion: () => void;
};

export function WritingEditor({
  task,
  disabled,
  disabledMessage,
  editorRef,
  onChange,
  onGrade,
  onSuggest,
  onReplaceSuggestion,
}: WritingEditorProps) {
  const [isSuggestionChooserOpen, setIsSuggestionChooserOpen] = useState(false);
  const [suggestionMode, setSuggestionMode] = useState<SuggestionMode>('brand-new');
  const wordCount = countWords(task.answer);
  const isAboveMax = wordCount > task.maxWords;
  const isBelowMin = wordCount > 0 && wordCount < task.minWords;
  const isGrading = task.aiStatus === 'grading';
  const isSuggesting = task.aiStatus === 'suggesting';
  const hasAnswer = task.answer.trim().length > 0;

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

      <div className="editor-ai-footer">
        <div className="word-range">
          Words: {wordCount} / {task.minWords}-{task.maxWords}
        </div>
        <div className="editor-ai-actions">
          <button
            className="secondary-action"
            type="button"
            onClick={onGrade}
            disabled={isGrading || isSuggesting}
          >
            <Bot size={15} />
            {isGrading ? 'Checking...' : 'Check with AI'}
          </button>
          <button
            className="secondary-action"
            type="button"
            onClick={() => setIsSuggestionChooserOpen((isOpen) => !isOpen)}
            disabled={isGrading || isSuggesting}
          >
            <WandSparkles size={15} />
            {isSuggesting ? 'Generating...' : 'Generate suggestion'}
          </button>
        </div>
      </div>

      {isSuggestionChooserOpen ? (
        <form
          className="suggestion-mode-panel"
          onSubmit={(event) => {
            event.preventDefault();
            onSuggest(suggestionMode);
          }}
        >
          <span>Generate suggestion:</span>
          <label>
            <input
              type="radio"
              name="suggestion-mode"
              value="brand-new"
              checked={suggestionMode === 'brand-new'}
              onChange={() => setSuggestionMode('brand-new')}
            />
            Brand new answer
          </label>
          <label>
            <input
              type="radio"
              name="suggestion-mode"
              value="improve-original"
              checked={suggestionMode === 'improve-original'}
              onChange={() => setSuggestionMode('improve-original')}
            />
            Improve my answer
          </label>
          <button className="primary-action" type="submit" disabled={isSuggesting}>
            Generate
          </button>
        </form>
      ) : null}

      {task.aiError ? (
        <div className="ai-error" role="alert">
          {task.aiError}
        </div>
      ) : null}

      <AIResultsPanel
        gradingResult={task.gradingResult}
        suggestionResult={task.suggestionResult}
        onReplaceSuggestion={onReplaceSuggestion}
      />
    </section>
  );
}
