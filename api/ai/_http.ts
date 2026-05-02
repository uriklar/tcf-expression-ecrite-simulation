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
    if (typeof request.body === 'string') {
      return request.body.trim() ? JSON.parse(request.body) : undefined;
    }

    if (Buffer.isBuffer(request.body)) {
      const text = request.body.toString('utf8');
      return text.trim() ? JSON.parse(text) : undefined;
    }

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

export function readBearerToken(authorization: string | string[] | undefined) {
  const value = Array.isArray(authorization) ? authorization[0] : authorization;
  const match = value?.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || undefined;
}

export function sendJson(response: JsonResponse, status: number, body: unknown) {
  const statusFn = response.status;
  const jsonFn = response.json;

  response.setHeader('Cache-Control', 'no-store');

  if (typeof statusFn === 'function' && typeof jsonFn === 'function') {
    statusFn.call(response, status);
    jsonFn.call(response, body);
    return;
  }

  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

export function toLoggableError(error: unknown, secrets: string[] = []) {
  const redact = (value: string) =>
    secrets
      .filter(Boolean)
      .reduce((redacted, secret) => redacted.split(secret).join('[REDACTED_API_TOKEN]'), value);

  if (error instanceof Error) {
    return {
      name: error.name,
      message: redact(error.message),
      stack: error.stack ? redact(error.stack) : undefined,
    };
  }

  return { message: redact(String(error)) };
}
