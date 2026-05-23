import { useEffect, useMemo, useState } from 'react';
import { defaultTaskBankItems } from '../data/tasks';
import type { TaskBankItem, TaskDocument, TaskSlotId } from '../types';

type NewTaskBankItem = {
  taskId: TaskSlotId;
  prompt: string;
  documents?: TaskDocument[];
};

type TasksListResponse = {
  tasks?: TaskBankItem[];
  error?: string;
};

type CreateTaskResponse = {
  task?: TaskBankItem;
  error?: string;
};

function isTaskSlotId(value: unknown): value is TaskSlotId {
  return value === 1 || value === 2 || value === 3;
}

function isTaskBankItem(item: unknown): item is TaskBankItem {
  const task = item as TaskBankItem;
  const documents = task?.documents;

  return (
    typeof task?.id === 'string' &&
    isTaskSlotId(task.taskId) &&
    typeof task.prompt === 'string' &&
    (!documents ||
      (Array.isArray(documents) &&
        documents.every((document) => typeof document.label === 'string' && typeof document.text === 'string')))
  );
}

async function readJsonResponse<Result>(response: Response, fallbackError: string) {
  const body = (await response.json().catch(() => undefined)) as Result | undefined;

  if (!response.ok) {
    throw new Error((body as { error?: string } | undefined)?.error || fallbackError);
  }

  return body;
}

export function useTaskBank() {
  const [customTaskBankItems, setCustomTaskBankItems] = useState<TaskBankItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const taskBankItems = useMemo(
    () => [...defaultTaskBankItems, ...customTaskBankItems],
    [customTaskBankItems],
  );

  useEffect(() => {
    let isActive = true;

    async function loadCustomTasks() {
      setIsLoading(true);
      setError(undefined);

      try {
        const body = await readJsonResponse<TasksListResponse>(await fetch('/api/tasks'), 'Could not load saved tasks.');
        const tasks = body?.tasks?.filter(isTaskBankItem) ?? [];

        if (isActive) {
          setCustomTaskBankItems(tasks);
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError instanceof Error ? loadError.message : 'Could not load saved tasks.');
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadCustomTasks();

    return () => {
      isActive = false;
    };
  }, []);

  async function addTaskBankItem(newItem: NewTaskBankItem) {
    const documents = newItem.documents
      ?.map((document) => ({
        label: document.label.trim(),
        text: document.text.trim(),
      }))
      .filter((document) => document.label && document.text);

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskId: newItem.taskId,
        prompt: newItem.prompt.trim(),
        documents: documents?.length ? documents : undefined,
      }),
    });

    const body = await readJsonResponse<CreateTaskResponse>(response, 'Could not save this task.');

    if (!body?.task || !isTaskBankItem(body.task)) {
      throw new Error('The server returned invalid task data.');
    }

    setCustomTaskBankItems((currentItems) => [...currentItems, body.task as TaskBankItem]);
    setError(undefined);

    return body.task;
  }

  return {
    taskBankItems,
    customTaskBankItems,
    isLoading,
    error,
    addTaskBankItem,
  };
}
