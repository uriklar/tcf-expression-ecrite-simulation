import { generateObject } from 'ai';
import { getModel } from './_providers';
import {
  gradeRequestSchema,
  gradingResultSchema,
  suggestRequestSchema,
  suggestionResultSchema,
  type GradeRequest,
  type SuggestRequest,
} from './_schemas';

type ApiHandlerResponse = {
  status: number;
  body: unknown;
};

const genericGradeError = 'Could not grade this answer. Check your API token, provider, or model name.';
const genericSuggestError = 'Could not generate a suggestion. Check your API token, provider, or model name.';

export async function handleGradeRequest(method: string | undefined, body: unknown): Promise<ApiHandlerResponse> {
  if (method !== 'POST') {
    return { status: 405, body: { error: 'Method not allowed.' } };
  }

  const parsedRequest = gradeRequestSchema.safeParse(body);

  if (!parsedRequest.success) {
    return { status: 400, body: { error: validationMessage(parsedRequest.error.issues[0]?.path.join('.')) } };
  }

  try {
    const request = parsedRequest.data;
    const { object } = await generateObject({
      model: getModel(request),
      schema: gradingResultSchema,
      schemaName: 'TCFWritingGradingResult',
      prompt: buildGradingPrompt(request),
    });

    return { status: 200, body: { result: object } };
  } catch {
    return { status: 502, body: { error: genericGradeError } };
  }
}

export async function handleSuggestRequest(method: string | undefined, body: unknown): Promise<ApiHandlerResponse> {
  if (method !== 'POST') {
    return { status: 405, body: { error: 'Method not allowed.' } };
  }

  const parsedRequest = suggestRequestSchema.safeParse(body);

  if (!parsedRequest.success) {
    return { status: 400, body: { error: validationMessage(parsedRequest.error.issues[0]?.path.join('.')) } };
  }

  try {
    const request = parsedRequest.data;
    const { object } = await generateObject({
      model: getModel(request),
      schema: suggestionResultSchema,
      schemaName: 'TCFWritingSuggestionResult',
      prompt:
        request.mode === 'brand-new'
          ? buildBrandNewSuggestionPrompt(request)
          : buildImproveSuggestionPrompt(request),
    });

    return { status: 200, body: { result: object } };
  } catch {
    return { status: 502, body: { error: genericSuggestError } };
  }
}

function validationMessage(path: string | undefined) {
  switch (path) {
    case 'apiKey':
      return 'API token is required.';
    case 'answer':
      return 'Answer is required for this AI action.';
    case 'provider':
      return 'Unsupported AI provider.';
    case 'model':
      return 'Model name is required.';
    case 'task.prompt':
      return 'Task prompt is required.';
    default:
      return 'The AI request is missing required information.';
  }
}

function feedbackLanguageName(language: GradeRequest['feedbackLanguage'] | SuggestRequest['feedbackLanguage']) {
  switch (language) {
    case 'french':
      return 'French';
    case 'hebrew':
      return 'Hebrew';
    case 'english':
    default:
      return 'English';
  }
}

function buildGradingPrompt(request: GradeRequest) {
  return `You are grading a French TCF Canada Expression Ecrite practice answer.
Important:
- This is not an official TCF score.
- Give practical feedback for improvement.
- Be strict but helpful.
- Evaluate only the submitted answer. The task prompt is context for task completion only.
- Do not invent missing content.
- Do not attribute words, phrases, grammar, ideas, or structure from the task prompt to the user.
- Before praising or criticizing a specific word or phrase, verify it appears in the submitted answer.
- If a word or phrase appears in the task prompt but not in the submitted answer, never say the user used it.
- Do not rewrite the whole answer unless asked.
- The user may make grammar, spelling, agreement, accent, structure, and register mistakes.
- Return feedback text in ${feedbackLanguageName(request.feedbackLanguage)}.
- Keep quoted French corrections in French.

Task details:
Task number: ${request.task.id}
Task type: ${request.task.type}
Expected word count: ${request.task.minWords}-${request.task.maxWords} words

Task prompt for context only. Use it only to judge whether the answer completes the task:
${request.task.prompt}

Submitted user answer. This is the only text you may evaluate for vocabulary, grammar, structure, register, and wording:
${request.answer}

Return feedback as JSON with this shape:
{
  "estimatedLevel": "A1 | A2 | B1 | B2 | C1 | C2",
  "summary": string,
  "strengths": string[],
  "issues": string[],
  "grammarCorrections": [
    {
      "original": string,
      "correction": string,
      "explanation": string
    }
  ],
  "vocabularyFeedback": string[],
  "structureFeedback": string[],
  "taskCompletionFeedback": string,
  "finalAdvice": string
}

Grading criteria:
1. Task completion
2. Clarity
3. Grammar accuracy
4. Vocabulary range
5. Register and tone
6. Structure and coherence
7. Word count fit

Field-specific rules:
- "strengths": mention specific vocabulary, expressions, or structures only if they appear in the submitted user answer.
- "issues": mention specific wording problems only if they appear in the submitted user answer.
- "grammarCorrections": every "original" value must be copied exactly from the submitted user answer, not from the task prompt.
- "vocabularyFeedback": discuss only vocabulary actually used in the submitted user answer, or suggest new vocabulary the user could use. Do not claim the user used suggested vocabulary.
- "structureFeedback": evaluate the organization of the submitted user answer only.
- "taskCompletionFeedback": you may compare the submitted user answer with the task prompt, but do not treat prompt wording as user wording.

For Task 1:
- Prioritize clarity, simple correctness, and direct response to the situation.
For Task 2:
- Prioritize formal register, polite structure, clear purpose, and appropriate opening/closing.
For Task 3:
- Prioritize comparison of the two viewpoints, argument structure, connectors, opinion, and conclusion.`;
}

function buildBrandNewSuggestionPrompt(request: SuggestRequest) {
  return `You are helping a learner prepare for the TCF Canada Expression Ecrite.
Generate a strong B2-level sample answer in French for the task below.

Task details:
Task number: ${request.task.id}
Task type: ${request.task.type}
Expected word count: ${request.task.minWords}-${request.task.maxWords} words

Prompt:
${request.task.prompt}

Requirements:
- Write the answer only in French.
- Aim for B2-level French.
- Stay within the expected word count.
- Match the required task format.
- Use natural, exam-appropriate French.
- Use clear structure and appropriate connectors.
- Do not make the answer sound like native-level academic French.
- Do not include explanations inside the answer.
- Return the explanation in ${feedbackLanguageName(request.feedbackLanguage)}.

Return JSON:
{
  "mode": "brand-new",
  "suggestedAnswer": string,
  "explanation": string
}`;
}

function buildImproveSuggestionPrompt(request: SuggestRequest) {
  return `You are helping a learner improve their French TCF Canada Expression Ecrite answer.

Task details:
Task number: ${request.task.id}
Task type: ${request.task.type}
Expected word count: ${request.task.minWords}-${request.task.maxWords} words

Prompt:
${request.task.prompt}

Original user answer:
${request.answer}

Rewrite the answer into stronger B2-level French while preserving the user's original intent as much as possible.
Requirements:
- Write the improved answer only in French.
- Aim for B2-level French.
- Stay within the expected word count.
- Preserve the original meaning when possible.
- Improve grammar, spelling, accents, register, structure, and clarity.
- Do not add unrelated ideas.
- Do not make it sound like native-level academic French.
- Return the explanation in ${feedbackLanguageName(request.feedbackLanguage)}.

Return JSON:
{
  "mode": "improve-original",
  "suggestedAnswer": string,
  "explanation": string
}`;
}
