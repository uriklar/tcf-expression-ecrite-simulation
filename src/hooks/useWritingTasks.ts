import { useMemo, useState } from 'react';
import { initialTasks } from '../data/tasks';
import type { WritingTask } from '../types';

export function useWritingTasks() {
  const [tasks, setTasks] = useState<WritingTask[]>(initialTasks);
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

  return {
    tasks,
    activeTask,
    activeTaskId,
    setActiveTaskId,
    updateAnswer,
  };
}
