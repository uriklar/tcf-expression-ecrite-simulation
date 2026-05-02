import { z } from 'zod';

export const aiProviderSchema = z.enum(['openai', 'anthropic', 'google']);
export const feedbackLanguageSchema = z.enum(['english', 'french', 'hebrew']);
export const suggestionModeSchema = z.enum(['brand-new', 'improve-original']);

export const taskSchema = z.object({
  id: z.number().int().min(1).max(3),
  type: z.string().trim().min(1),
  prompt: z.string().trim().min(1),
  minWords: z.number().int().positive(),
  maxWords: z.number().int().positive(),
});

export const gradeRequestSchema = z.object({
  provider: aiProviderSchema,
  model: z.string().trim().min(1),
  feedbackLanguage: feedbackLanguageSchema,
  task: taskSchema,
  answer: z.string().trim().min(1),
}).strict();

export const suggestRequestSchema = z
  .object({
    provider: aiProviderSchema,
    model: z.string().trim().min(1),
    feedbackLanguage: feedbackLanguageSchema,
    mode: suggestionModeSchema,
    task: taskSchema,
    answer: z.string().optional(),
  })
  .strict()
  .refine((request) => request.mode === 'brand-new' || Boolean(request.answer?.trim()), {
    message: 'Answer is required for improve-original mode.',
    path: ['answer'],
  });

export const gradingResultSchema = z.object({
  estimatedLevel: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  summary: z.string(),
  strengths: z.array(z.string()),
  issues: z.array(z.string()),
  grammarCorrections: z.array(
    z.object({
      original: z.string(),
      correction: z.string(),
      explanation: z.string(),
    }),
  ),
  vocabularyFeedback: z.array(z.string()),
  structureFeedback: z.array(z.string()),
  taskCompletionFeedback: z.string(),
  finalAdvice: z.string(),
});

export const suggestionResultSchema = z.object({
  mode: suggestionModeSchema,
  suggestedAnswer: z.string(),
  explanation: z.string(),
});

export type GradeRequest = z.infer<typeof gradeRequestSchema>;
export type SuggestRequest = z.infer<typeof suggestRequestSchema>;
