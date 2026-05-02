import type { IncomingMessage, ServerResponse } from 'node:http';

export type JsonRequest = IncomingMessage & {
  body?: unknown;
  method?: string;
};

export type JsonResponse = ServerResponse & {
  status?: (statusCode: number) => JsonResponse;
  json?: (body: unknown) => void;
};

export async function readJsonBody(request: JsonRequest) {
  if (request.body !== undefined) {
    return request.body;
  }

  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return undefined;
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export function sendJson(response: JsonResponse, status: number, body: unknown) {
  const statusFn = response.status;
  const jsonFn = response.json;

  if (typeof statusFn === 'function' && typeof jsonFn === 'function') {
    statusFn.call(response, status);
    jsonFn.call(response, body);
    return;
  }

  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}
