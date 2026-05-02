import { KeyRound } from 'lucide-react';
import type { AIProvider, AISettings, FeedbackLanguage } from '../types';

type AISettingsPanelProps = {
  settings: AISettings;
  providerModels: Record<AIProvider, string[]>;
  onChange: (updates: Partial<AISettings>) => void;
  onClearSavedToken: () => void;
};

const providerLabels: Record<AIProvider, string> = {
  openai: 'OpenAI / ChatGPT',
  anthropic: 'Anthropic / Claude',
  google: 'Google / Gemini',
};

const feedbackLanguageLabels: Record<FeedbackLanguage, string> = {
  english: 'English',
  french: 'French',
  hebrew: 'Hebrew',
};

export function AISettingsPanel({ settings, providerModels, onChange, onClearSavedToken }: AISettingsPanelProps) {
  const models = providerModels[settings.provider];

  return (
    <details className="ai-settings-panel">
      <summary>
        <KeyRound size={15} />
        AI Provider
      </summary>

      <div className="ai-settings-fields">
        <label>
          <span>Provider</span>
          <select
            value={settings.provider}
            onChange={(event) => onChange({ provider: event.target.value as AIProvider })}
          >
            {(Object.keys(providerLabels) as AIProvider[]).map((provider) => (
              <option key={provider} value={provider}>
                {providerLabels[provider]}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>API Token</span>
          <input
            type="password"
            value={settings.apiKey}
            onChange={(event) => onChange({ apiKey: event.target.value })}
            placeholder="Paste provider token"
            autoComplete="off"
            spellCheck={false}
          />
        </label>

        <label>
          <span>Model</span>
          <input
            list="ai-model-options"
            value={settings.model}
            onChange={(event) => onChange({ model: event.target.value })}
            placeholder={models[0]}
            spellCheck={false}
          />
        </label>
        <datalist id="ai-model-options">
          {models.map((model) => (
            <option key={model} value={model} />
          ))}
        </datalist>

        <label>
          <span>Feedback language</span>
          <select
            value={settings.feedbackLanguage}
            onChange={(event) => onChange({ feedbackLanguage: event.target.value as FeedbackLanguage })}
          >
            {(Object.keys(feedbackLanguageLabels) as FeedbackLanguage[]).map((language) => (
              <option key={language} value={language}>
                {feedbackLanguageLabels[language]}
              </option>
            ))}
          </select>
        </label>

        <button className="token-clear-button" type="button" onClick={onClearSavedToken}>
          Clear token
        </button>
      </div>
    </details>
  );
}
