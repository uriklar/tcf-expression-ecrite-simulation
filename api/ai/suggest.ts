import { handleSuggestRequest } from './_handlers.js';
import { readBearerToken, readJsonBody, sendJson, toLoggableError, type JsonRequest, type JsonResponse } from './_http.js';

export const config = {
  runtime: 'nodejs',
  maxDuration: 30,
};

export default async function handler(request: JsonRequest, response: JsonResponse) {
  try {
    const body = await readJsonBody(request);
    const apiKey = readBearerToken(request.headers.authorization);
    const result = await handleSuggestRequest(request.method, body, apiKey);
    sendJson(response, result.status, result.body);
  } catch (error) {
    console.error('AI suggest API failed', toLoggableError(error));
    sendJson(response, error instanceof SyntaxError ? 400 : 500, {
      error:
        error instanceof SyntaxError
          ? 'Invalid JSON request.'
          : 'A server error occurred while generating a suggestion.',
    });
  }
}
