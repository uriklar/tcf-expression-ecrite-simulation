import { useEffect, useMemo, useState } from 'react';
import type { AIProvider, AISettings, FeedbackLanguage } from '../types';

export const AI_SETTINGS_STORAGE_KEY = 'tcf-writing-ai-settings';

type SavedAISettings = {
  provider: AIProvider;
  model: string;
  feedbackLanguage: FeedbackLanguage;
  rememberToken: boolean;
  apiKeysByProvider?: Partial<Record<AIProvider, string>>;
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
  rememberToken: false,
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
    apiKey: savedSettings.rememberToken ? savedSettings.apiKeysByProvider?.[provider] ?? '' : '',
    model: savedSettings.model || defaultModels[provider],
    feedbackLanguage: savedSettings.feedbackLanguage ?? defaultSettings.feedbackLanguage,
    rememberToken: Boolean(savedSettings.rememberToken),
  };
}

function persistSettings(settings: AISettings) {
  const savedSettings = readSavedSettings();
  const apiKeysByProvider = { ...(savedSettings?.apiKeysByProvider ?? {}) };

  if (settings.rememberToken) {
    if (settings.apiKey) {
      apiKeysByProvider[settings.provider] = settings.apiKey;
    } else {
      delete apiKeysByProvider[settings.provider];
    }
  }

  const nextSettings: SavedAISettings = {
    provider: settings.provider,
    model: settings.model,
    feedbackLanguage: settings.feedbackLanguage,
    rememberToken: settings.rememberToken,
    ...(settings.rememberToken && Object.keys(apiKeysByProvider).length > 0 ? { apiKeysByProvider } : {}),
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
      const savedSettings = readSavedSettings();
      const providerChanged = nextProvider !== currentSettings.provider;
      const rememberToken = updates.rememberToken ?? currentSettings.rememberToken;
      const savedProviderToken = rememberToken ? savedSettings?.apiKeysByProvider?.[nextProvider] ?? '' : '';

      return {
        ...currentSettings,
        ...updates,
        provider: nextProvider,
        apiKey: updates.apiKey ?? (providerChanged ? savedProviderToken : currentSettings.apiKey),
        model: updates.model ?? (providerChanged ? defaultModels[nextProvider] : currentSettings.model),
      };
    });
  }

  function clearSavedToken() {
    const savedSettings = readSavedSettings();
    const nextApiKeys = { ...(savedSettings?.apiKeysByProvider ?? {}) };
    delete nextApiKeys[settings.provider];

    const nextSavedSettings: SavedAISettings = {
      provider: settings.provider,
      model: settings.model,
      feedbackLanguage: settings.feedbackLanguage,
      rememberToken: settings.rememberToken,
      ...(settings.rememberToken ? { apiKeysByProvider: nextApiKeys } : {}),
    };

    window.localStorage.setItem(AI_SETTINGS_STORAGE_KEY, JSON.stringify(nextSavedSettings));
    setSettings((currentSettings) => ({ ...currentSettings, apiKey: '' }));
  }

  return {
    settings,
    providerModels,
    updateSettings,
    clearSavedToken,
  };
}
