import { handleGradeRequest } from './_handlers';
import { readJsonBody, sendJson, type JsonRequest, type JsonResponse } from './_http';

export default async function handler(request: JsonRequest, response: JsonResponse) {
  const body = await readJsonBody(request);
  const result = await handleGradeRequest(request.method, body);
  sendJson(response, result.status, result.body);
}
