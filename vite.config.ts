import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleGradeRequest, handleSuggestRequest } from './api/ai/_handlers.js';
import { readBearerToken, readJsonBody, sendJson, type JsonRequest, type JsonResponse } from './api/ai/_http.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-ai-api',
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          if (request.url !== '/api/ai/grade' && request.url !== '/api/ai/suggest') {
            next();
            return;
          }

          try {
            const body = await readJsonBody(request as JsonRequest);
            const apiKey = readBearerToken(request.headers.authorization);
            const result =
              request.url === '/api/ai/grade'
                ? await handleGradeRequest(request.method, body, apiKey)
                : await handleSuggestRequest(request.method, body, apiKey);

            sendJson(response as JsonResponse, result.status, result.body);
          } catch {
            sendJson(response as JsonResponse, 400, { error: 'Invalid JSON request.' });
          }
        });
      },
    },
  ],
});
