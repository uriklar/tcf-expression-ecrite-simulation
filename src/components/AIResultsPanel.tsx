import { Clipboard, RotateCcw } from 'lucide-react';
import type { GradingResult, SuggestionResult } from '../types';

type AIResultsPanelProps = {
  gradingResult?: GradingResult;
  suggestionResult?: SuggestionResult;
  onReplaceSuggestion: () => void;
};

export function AIResultsPanel({ gradingResult, suggestionResult, onReplaceSuggestion }: AIResultsPanelProps) {
  if (!gradingResult && !suggestionResult) {
    return null;
  }

  function copySuggestion() {
    if (!suggestionResult) {
      return;
    }

    void navigator.clipboard.writeText(suggestionResult.suggestedAnswer);
  }

  return (
    <div className="ai-results">
      {gradingResult ? (
        <section className="ai-result-panel" aria-labelledby="ai-feedback-heading">
          <div className="ai-result-header">
            <div>
              <p className="eyebrow">AI Feedback</p>
              <h3 id="ai-feedback-heading">Estimated level: {gradingResult.estimatedLevel}</h3>
            </div>
          </div>

          <p className="ai-summary">{gradingResult.summary}</p>

          <div className="ai-feedback-grid">
            <FeedbackList title="Strengths" items={gradingResult.strengths} />
            <FeedbackList title="Issues" items={gradingResult.issues} />
          </div>

          {gradingResult.grammarCorrections.length > 0 ? (
            <div className="correction-list">
              <h4>Corrections</h4>
              {gradingResult.grammarCorrections.map((correction, index) => (
                <article className="correction-item" key={`${correction.original}-${index}`}>
                  <p>
                    <span>{correction.original}</span>
                    <strong>{correction.correction}</strong>
                  </p>
                  <small>{correction.explanation}</small>
                </article>
              ))}
            </div>
          ) : null}

          <FeedbackList title="Vocabulary" items={gradingResult.vocabularyFeedback} />
          <FeedbackList title="Structure" items={gradingResult.structureFeedback} />

          <div className="ai-advice">
            <h4>Task completion</h4>
            <p>{gradingResult.taskCompletionFeedback}</p>
          </div>

          <div className="ai-advice">
            <h4>Final advice</h4>
            <p>{gradingResult.finalAdvice}</p>
          </div>
        </section>
      ) : null}

      {suggestionResult ? (
        <section className="ai-result-panel" aria-labelledby="ai-suggestion-heading">
          <div className="ai-result-header">
            <div>
              <p className="eyebrow">AI Suggestion</p>
              <h3 id="ai-suggestion-heading">
                {suggestionResult.mode === 'brand-new' ? 'Brand-new answer' : 'Improved answer'}
              </h3>
            </div>
            <div className="ai-result-actions">
              <button className="icon-button" type="button" onClick={copySuggestion} title="Copy suggestion">
                <Clipboard size={15} />
              </button>
              <button
                className="icon-button"
                type="button"
                onClick={onReplaceSuggestion}
                title="Replace my answer"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          <p className="suggestion-answer">{suggestionResult.suggestedAnswer}</p>
          <div className="ai-advice">
            <h4>Explanation</h4>
            <p>{suggestionResult.explanation}</p>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function FeedbackList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="feedback-list">
      <h4>{title}</h4>
      <ul>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
