import { useMemo, useState } from 'react';
import { createInitialTasks } from '../data/tasks';
import type { WritingTask } from '../types';

export function useWritingTasks() {
  const [tasks, setTasks] = useState<WritingTask[]>(createInitialTasks);
  const [activeTaskId, setActiveTaskId] = useState<WritingTask['id']>(1);

  const activeTask = useMemo(
    () => tasks.find((task) => task.id === activeTaskId) ?? tasks[0],
    [activeTaskId, tasks],
  );

  function updateAnswer(taskId: WritingTask['id'], answer: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, answer } : task)),
    );
  }

  function updateTaskAI(taskId: WritingTask['id'], updates: Partial<WritingTask>) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task)),
    );
  }

  return {
    tasks,
    activeTask,
    activeTaskId,
    setActiveTaskId,
    updateAnswer,
    updateTaskAI,
  };
}
