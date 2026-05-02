import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleGradeRequest, handleSuggestRequest } from './api/ai/_handlers';
import { readJsonBody, sendJson, type JsonRequest, type JsonResponse } from './api/ai/_http';

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
            const result =
              request.url === '/api/ai/grade'
                ? await handleGradeRequest(request.method, body)
                : await handleSuggestRequest(request.method, body);

            sendJson(response as JsonResponse, result.status, result.body);
          } catch {
            sendJson(response as JsonResponse, 400, { error: 'Invalid JSON request.' });
          }
        });
      },
    },
  ],
});
