import { z } from 'zod';
import { readJsonBody, sendJson, toLoggableError, type JsonRequest, type JsonResponse } from '../ai/_http.js';
import { createCustomTask, listCustomTasks } from './_db.js';

export const config = {
  runtime: 'nodejs',
  maxDuration: 10,
};

const taskDocumentSchema = z.object({
  label: z.string().trim().min(1),
  text: z.string().trim().min(1),
});

const createTaskSchema = z.object({
  taskId: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  prompt: z.string().trim().min(1),
  documents: z.array(taskDocumentSchema).optional(),
});

export default async function handler(request: JsonRequest, response: JsonResponse) {
  try {
    if (request.method === 'GET') {
      const tasks = await listCustomTasks();
      sendJson(response, 200, { tasks });
      return;
    }

    if (request.method === 'POST') {
      const body = await readJsonBody(request);
      const parsedTask = createTaskSchema.parse(body);
      const task = await createCustomTask(parsedTask);
      sendJson(response, 201, { task });
      return;
    }

    response.setHeader('Allow', 'GET, POST');
    sendJson(response, 405, { error: 'Method not allowed.' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      sendJson(response, 400, { error: 'Invalid task data.', issues: error.issues });
      return;
    }

    console.error('Tasks API failed', toLoggableError(error, [process.env.DATABASE_URL || '', process.env.POSTGRES_URL || '']));
    sendJson(response, 500, { error: 'A server error occurred while loading tasks.' });
  }
}
