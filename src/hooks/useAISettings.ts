import { useEffect, useMemo, useState } from 'react';
import type { AIProvider, AISettings, FeedbackLanguage } from '../types';

export const AI_SETTINGS_STORAGE_KEY = 'tcf-writing-ai-settings';

type SavedAISettings = {
  provider: AIProvider;
  model: string;
  feedbackLanguage: FeedbackLanguage;
};

const defaultModels: Record<AIProvider, string> = {
  openai: 'gpt-4.1-mini',
  anthropic: 'claude-3-5-haiku-latest',
  google: 'gemini-1.5-flash',
};

const defaultSettings: AISettings = {
  provider: 'openai',
  apiKey: '',
  model: defaultModels.openai,
  feedbackLanguage: 'english',
};

function readSavedSettings(): SavedAISettings | null {
  try {
    const rawSettings = window.localStorage.getItem(AI_SETTINGS_STORAGE_KEY);
    return rawSettings ? (JSON.parse(rawSettings) as SavedAISettings) : null;
  } catch {
    return null;
  }
}

function toInitialSettings(): AISettings {
  const savedSettings = readSavedSettings();

  if (!savedSettings) {
    return defaultSettings;
  }

  const provider = savedSettings.provider ?? defaultSettings.provider;

  return {
    provider,
    apiKey: '',
    model: savedSettings.model || defaultModels[provider],
    feedbackLanguage: savedSettings.feedbackLanguage ?? defaultSettings.feedbackLanguage,
  };
}

function persistSettings(settings: AISettings) {
  const nextSettings: SavedAISettings = {
    provider: settings.provider,
    model: settings.model,
    feedbackLanguage: settings.feedbackLanguage,
  };

  window.localStorage.setItem(AI_SETTINGS_STORAGE_KEY, JSON.stringify(nextSettings));
}

export function useAISettings() {
  const [settings, setSettings] = useState<AISettings>(() =>
    typeof window === 'undefined' ? defaultSettings : toInitialSettings(),
  );

  const providerModels = useMemo(
    () => ({
      openai: ['gpt-4.1-mini', 'gpt-4o-mini'],
      anthropic: ['claude-3-5-sonnet-latest', 'claude-3-5-haiku-latest'],
      google: ['gemini-1.5-pro', 'gemini-1.5-flash'],
    }),
    [],
  );

  useEffect(() => {
    persistSettings(settings);
  }, [settings]);

  function updateSettings(updates: Partial<AISettings>) {
    setSettings((currentSettings) => {
      const nextProvider = updates.provider ?? currentSettings.provider;
      const providerChanged = nextProvider !== currentSettings.provider;

      return {
        ...currentSettings,
        ...updates,
        provider: nextProvider,
        apiKey: updates.apiKey ?? (providerChanged ? '' : currentSettings.apiKey),
        model: updates.model ?? (providerChanged ? defaultModels[nextProvider] : currentSettings.model),
      };
    });
  }

  function clearSavedToken() {
    setSettings((currentSettings) => ({ ...currentSettings, apiKey: '' }));
  }

  return {
    settings,
    providerModels,
    updateSettings,
    clearSavedToken,
  };
}
