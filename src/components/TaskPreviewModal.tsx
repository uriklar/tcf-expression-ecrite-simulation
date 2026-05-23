import { X } from 'lucide-react';
import type { TaskBankItem } from '../types';
import { getTaskSlotLabel } from '../data/tasks';

type TaskPreviewModalProps = {
  task: TaskBankItem;
  onClose: () => void;
};

export function TaskPreviewModal({ task, onClose }: TaskPreviewModalProps) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="task-preview-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-preview-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="task-preview-header">
          <div>
            <p className="eyebrow">{getTaskSlotLabel(task.taskId)}</p>
            <h2 id="task-preview-title">Consigne complète</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Fermer l’aperçu">
            <X size={17} />
          </button>
        </div>

        <div className="task-preview-body">
          <p className="task-preview-prompt">{task.prompt}</p>

          {task.documents?.length ? (
            <div className="document-grid">
              {task.documents.map((document) => (
                <article className="source-document" key={document.label}>
                  <h3>{document.label}</h3>
                  <p>{document.text}</p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
