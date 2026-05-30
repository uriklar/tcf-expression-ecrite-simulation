import { useMemo, useState } from 'react';
import { createInitialTasks } from '../data/tasks';
import type { TaskBankItem, TaskSlotId, WritingTask } from '../types';

type SavedAnswers = Partial<Record<TaskSlotId, string>>;

function applySavedAnswers(tasks: WritingTask[], savedAnswers?: SavedAnswers) {
  if (!savedAnswers) {
    return tasks;
  }

  return tasks.map((task) => ({
    ...task,
    answer: savedAnswers[task.id] ?? task.answer,
  }));
}

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

  function resetTasks(taskBankItems: TaskBankItem[], savedAnswers?: SavedAnswers) {
    setTasks(applySavedAnswers(createInitialTasks(taskBankItems), savedAnswers));
    setActiveTaskId(1);
  }

  return {
    tasks,
    activeTask,
    activeTaskId,
    setActiveTaskId,
    resetTasks,
    updateAnswer,
    updateTaskAI,
  };
}
