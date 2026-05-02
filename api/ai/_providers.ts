import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import type { LanguageModel } from 'ai';
import type { GradeRequest, SuggestRequest } from './_schemas.js';

type AIRequestSettings = Pick<GradeRequest | SuggestRequest, 'provider' | 'model'> & {
  apiKey: string;
};

export function getModel(settings: AIRequestSettings): LanguageModel {
  switch (settings.provider) {
    case 'openai':
      return createOpenAI({ apiKey: settings.apiKey })(settings.model as never);
    case 'anthropic':
      return createAnthropic({ apiKey: settings.apiKey })(settings.model as never);
    case 'google':
      return createGoogleGenerativeAI({ apiKey: settings.apiKey })(settings.model as never);
    default:
      throw new Error('Unsupported provider.');
  }
}
