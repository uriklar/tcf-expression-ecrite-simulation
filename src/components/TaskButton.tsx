import { CheckCircle2, Circle, CircleAlert } from 'lucide-react';
import type { TaskStatus, WritingTask } from '../types';
import { countWords, getTaskStatus } from '../utils/wordCount';

type TaskButtonProps = {
  task: WritingTask;
  isActive: boolean;
  onClick: () => void;
};

const statusCopy: Record<TaskStatus, string> = {
  'not-started': 'Non commencée',
  incomplete: 'Sous le minimum',
  complete: 'Minimum atteint',
  'over-limit': 'Au-dessus du maximum',
};

export function TaskButton({ task, isActive, onClick }: TaskButtonProps) {
  const wordCount = countWords(task.answer);
  const status = getTaskStatus(wordCount, task.minWords, task.maxWords);
  const StatusIcon = status === 'complete' ? CheckCircle2 : status === 'not-started' ? Circle : CircleAlert;

  return (
    <button className={`task-button ${isActive ? 'active' : ''}`} type="button" onClick={onClick}>
      <span className={`status-dot status-${status}`} aria-hidden="true">
        <StatusIcon size={16} strokeWidth={2.4} />
      </span>
      <span className="task-button-copy">
        <span className="task-button-title">{task.title}</span>
        <span className="task-button-meta">
          {wordCount} mots · {statusCopy[status]}
        </span>
      </span>
    </button>
  );
}
