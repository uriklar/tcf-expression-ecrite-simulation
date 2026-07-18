import { useMemo, useState } from 'react';
import { defaultTaskBankItems } from '../data/tasks';
import type { TaskBankItem, TaskDocument, TaskSlotId } from '../types';

const STORAGE_KEY = 'tfc-ecrite.custom-task-bank';

type NewTaskBankItem = {
  taskId: TaskSlotId;
  prompt: string;
  documents?: TaskDocument[];
};

function isTaskSlotId(value: unknown): value is TaskSlotId {
  return value === 1 || value === 2 || value === 3;
}

function readCustomTasks() {
  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter((item): item is TaskBankItem => {
      const documents = (item as TaskBankItem).documents;

      return (
        typeof item?.id === 'string' &&
        isTaskSlotId(item.taskId) &&
        (typeof item.label === 'undefined' || typeof item.label === 'string') &&
        typeof item.prompt === 'string' &&
        (!documents ||
          (Array.isArray(documents) &&
            documents.every((document) => typeof document.label === 'string' && typeof document.text === 'string')))
      );
    });
  } catch {
    return [];
  }
}

function saveCustomTasks(tasks: TaskBankItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTaskId() {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useTaskBank() {
  const [customTaskBankItems, setCustomTaskBankItems] = useState<TaskBankItem[]>(readCustomTasks);

  const taskBankItems = useMemo(
    () => [...defaultTaskBankItems, ...customTaskBankItems],
    [customTaskBankItems],
  );

  function addTaskBankItem(newItem: NewTaskBankItem) {
    const documents = newItem.documents
      ?.map((document) => ({
        label: document.label.trim(),
        text: document.text.trim(),
      }))
      .filter((document) => document.label && document.text);

    const taskBankItem: TaskBankItem = {
      id: createTaskId(),
      taskId: newItem.taskId,
      prompt: newItem.prompt.trim(),
      documents: documents?.length ? documents : undefined,
      createdAt: new Date().toISOString(),
    };

    setCustomTaskBankItems((currentItems) => {
      const nextItems = [...currentItems, taskBankItem];
      saveCustomTasks(nextItems);
      return nextItems;
    });

    return taskBankItem;
  }

  return {
    taskBankItems,
    customTaskBankItems,
    addTaskBankItem,
  };
}
