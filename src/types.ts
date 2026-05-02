export type TaskStatus = 'not-started' | 'incomplete' | 'complete' | 'over-limit';

export type TCFLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type AIProvider = 'openai' | 'anthropic' | 'google';

export type FeedbackLanguage = 'english' | 'french' | 'hebrew';

export type AISettings = {
  provider: AIProvider;
  apiKey: string;
  model: string;
  feedbackLanguage: FeedbackLanguage;
  rememberToken: boolean;
};

export type GradingResult = {
  estimatedLevel: TCFLevel;
  summary: string;
  strengths: string[];
  issues: string[];
  grammarCorrections: {
    original: string;
    correction: string;
    explanation: string;
  }[];
  vocabularyFeedback: string[];
  structureFeedback: string[];
  taskCompletionFeedback: string;
  finalAdvice: string;
};

export type SuggestionMode = 'brand-new' | 'improve-original';

export type SuggestionResult = {
  mode: SuggestionMode;
  suggestedAnswer: string;
  explanation: string;
};

export type WritingTask = {
  id: 1 | 2 | 3;
  title: string;
  type: string;
  prompt: string;
  minWords: number;
  maxWords: number;
  suggestedMinutes: number;
  answer: string;
  documents?: {
    label: string;
    text: string;
  }[];
  gradingResult?: GradingResult;
  suggestionResult?: SuggestionResult;
  aiStatus?: 'idle' | 'grading' | 'suggesting' | 'error';
  aiError?: string;
};
