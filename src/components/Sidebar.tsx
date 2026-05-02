import { Square, Play } from 'lucide-react';
import type { ReactNode } from 'react';
import type { WritingTask } from '../types';
import { Timer } from './Timer';
import { TaskButton } from './TaskButton';

type SidebarProps = {
  tasks: WritingTask[];
  activeTaskId: number;
  timeRemaining: number;
  timerState: 'normal' | 'warning' | 'urgent';
  hasStarted: boolean;
  isLocked: boolean;
  children?: ReactNode;
  onSelectTask: (taskId: WritingTask['id']) => void;
  onStart: () => void;
  onEnd: () => void;
};

export function Sidebar({
  tasks,
  activeTaskId,
  timeRemaining,
  timerState,
  hasStarted,
  isLocked,
  children,
  onSelectTask,
  onStart,
  onEnd,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <Timer seconds={timeRemaining} state={timerState} />
        {!hasStarted ? (
          <button className="primary-action" type="button" onClick={onStart}>
            <Play size={16} />
            Commencer la simulation
          </button>
        ) : (
          <button className="secondary-action" type="button" onClick={onEnd} disabled={isLocked}>
            <Square size={15} />
            Terminer
          </button>
        )}
      </div>

      <nav className="task-nav" aria-label="Tâches d’expression écrite">
        {tasks.map((task) => (
          <TaskButton
            key={task.id}
            task={task}
            isActive={task.id === activeTaskId}
            onClick={() => onSelectTask(task.id)}
          />
        ))}
      </nav>
      {children}
    </aside>
  );
}
