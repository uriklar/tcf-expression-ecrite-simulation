import { CheckCircle2, Circle, CircleAlert } from 'lucide-react';
import type { TaskStatus, WritingTask } from '../types';
import { countWords, getTaskStatus } from '../utils/wordCount';

type TaskButtonProps = {
  task: WritingTask;
  isActive: boolean;
  onClick: () => void;
};

const statusCopy: Record<TaskStatus, string> = {
  'not-started': 'Not started',
  incomplete: 'Below minimum',
  complete: 'Minimum reached',
};

export function TaskButton({ task, isActive, onClick }: TaskButtonProps) {
  const wordCount = countWords(task.answer);
  const status = getTaskStatus(wordCount, task.minWords);
  const StatusIcon = status === 'complete' ? CheckCircle2 : status === 'incomplete' ? CircleAlert : Circle;

  return (
    <button className={`task-button ${isActive ? 'active' : ''}`} type="button" onClick={onClick}>
      <span className={`status-dot status-${status}`} aria-hidden="true">
        <StatusIcon size={16} strokeWidth={2.4} />
      </span>
      <span className="task-button-copy">
        <span className="task-button-title">{task.title}</span>
        <span className="task-button-meta">
          {wordCount} words · {statusCopy[status]}
        </span>
      </span>
    </button>
  );
}
