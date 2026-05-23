import { Eye, ListChecks, Plus, Settings2, Shuffle } from 'lucide-react';
import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { getTaskSlotLabel, taskIds } from '../data/tasks';
import type { TaskBankItem, TaskDocument, TaskSlotId } from '../types';
import { TaskPreviewModal } from './TaskPreviewModal';

type TaskSelection = Record<TaskSlotId, string>;

type TaskAdminPanelProps = {
  taskBankItems: TaskBankItem[];
  selectedTaskItemIds: TaskSelection;
  onSelectTaskItem: (taskId: TaskSlotId, taskItemId: string) => void;
  onRandomizeSelection: () => void;
  onAddTask: (task: { taskId: TaskSlotId; prompt: string; documents?: TaskDocument[] }) => TaskBankItem;
};

function summarizePrompt(prompt: string) {
  const firstLine = prompt.split('\n').find(Boolean) ?? prompt;
  return firstLine.length > 110 ? `${firstLine.slice(0, 107)}...` : firstLine;
}

function toTaskSlotId(value: string): TaskSlotId {
  const numericValue = Number(value);
  return numericValue === 2 || numericValue === 3 ? numericValue : 1;
}

export function TaskAdminPanel({
  taskBankItems,
  selectedTaskItemIds,
  onSelectTaskItem,
  onRandomizeSelection,
  onAddTask,
}: TaskAdminPanelProps) {
  const [taskId, setTaskId] = useState<TaskSlotId>(1);
  const [prompt, setPrompt] = useState('');
  const [documentOne, setDocumentOne] = useState('');
  const [documentTwo, setDocumentTwo] = useState('');
  const [error, setError] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [previewTask, setPreviewTask] = useState<TaskBankItem | undefined>();

  const taskItemsBySlot = useMemo(
    () =>
      taskIds.reduce<Record<TaskSlotId, TaskBankItem[]>>(
        (groups, currentTaskId) => ({
          ...groups,
          [currentTaskId]: taskBankItems.filter((item) => item.taskId === currentTaskId),
        }),
        { 1: [], 2: [], 3: [] },
      ),
    [taskBankItems],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!prompt.trim()) {
      setError('Ajoutez une consigne avant de créer la tâche.');
      return;
    }

    const documents =
      taskId === 3
        ? [
            { label: 'Document 1', text: documentOne },
            { label: 'Document 2', text: documentTwo },
          ].filter((document) => document.text.trim())
        : [];

    const createdTask = onAddTask({
      taskId,
      prompt,
      documents: documents.length ? documents : undefined,
    });

    onSelectTaskItem(createdTask.taskId, createdTask.id);
    setPrompt('');
    setDocumentOne('');
    setDocumentTwo('');
    setError('');
  }

  return (
    <section className="task-admin-panel" aria-labelledby="task-admin-title">
      <div className="task-admin-header">
        <div>
          <p className="eyebrow">Simulation</p>
          <h2 id="task-admin-title">Choisir les tâches</h2>
        </div>
        <div className="task-admin-actions">
          <button className="secondary-action" type="button" onClick={onRandomizeSelection}>
            <Shuffle size={15} />
            Aléatoire
          </button>
          <button
            className="secondary-action"
            type="button"
            onClick={() => setIsAdminOpen((isOpen) => !isOpen)}
            aria-expanded={isAdminOpen}
            aria-controls="task-admin-tools"
          >
            <Settings2 size={15} />
            {isAdminOpen ? 'Masquer admin' : 'Admin'}
          </button>
        </div>
      </div>

      <div className="task-picker-grid">
        {taskIds.map((currentTaskId) => {
          const taskItems = taskItemsBySlot[currentTaskId];
          const selectedTask = taskItems.find((item) => item.id === selectedTaskItemIds[currentTaskId]) ?? taskItems[0];

          return (
            <div className="task-picker" key={currentTaskId}>
              <div className="task-picker-heading">
                <span>{getTaskSlotLabel(currentTaskId)}</span>
                {selectedTask ? (
                  <button className="task-preview-button" type="button" onClick={() => setPreviewTask(selectedTask)}>
                    <Eye size={14} />
                    Lire
                  </button>
                ) : null}
              </div>
              <select
                aria-label={`Choisir ${getTaskSlotLabel(currentTaskId)}`}
                value={selectedTask?.id ?? ''}
                onChange={(event) => onSelectTaskItem(currentTaskId, event.target.value)}
              >
                {taskItems.map((item, index) => (
                  <option value={item.id} key={item.id}>
                    {index + 1}. {summarizePrompt(item.prompt)}
                  </option>
                ))}
              </select>
              {selectedTask ? <p className="task-picker-summary">{summarizePrompt(selectedTask.prompt)}</p> : null}
            </div>
          );
        })}
      </div>

      {isAdminOpen ? (
        <div className="task-admin-grid" id="task-admin-tools">
          <form className="task-add-form" onSubmit={handleSubmit}>
            <div className="task-admin-section-title">
              <Plus size={16} />
              <h3>Ajouter une tâche</h3>
            </div>

            <label>
              Type
              <select
                value={taskId}
                onChange={(event) => {
                  const nextTaskId = toTaskSlotId(event.target.value);
                  setTaskId(nextTaskId);

                  if (nextTaskId !== 3) {
                    setDocumentOne('');
                    setDocumentTwo('');
                  }
                }}
              >
                {taskIds.map((currentTaskId) => (
                  <option value={currentTaskId} key={currentTaskId}>
                    {getTaskSlotLabel(currentTaskId)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Consigne
              <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={6} />
            </label>

            {taskId === 3 ? (
              <>
                <label>
                  Document 1
                  <textarea value={documentOne} onChange={(event) => setDocumentOne(event.target.value)} rows={4} />
                </label>

                <label>
                  Document 2
                  <textarea value={documentTwo} onChange={(event) => setDocumentTwo(event.target.value)} rows={4} />
                </label>
              </>
            ) : null}

            {error ? <p className="form-error">{error}</p> : null}

            <button className="primary-action" type="submit">
              <Plus size={16} />
              Ajouter
            </button>
          </form>

          <div className="task-bank-list">
            <div className="task-admin-section-title">
              <ListChecks size={16} />
              <h3>Banque des tâches</h3>
            </div>

            {taskIds.map((currentTaskId) => (
              <section className="task-bank-group" key={currentTaskId}>
                <h4>{getTaskSlotLabel(currentTaskId)}</h4>
                <div className="task-bank-items">
                  {taskItemsBySlot[currentTaskId].map((item, index) => (
                    <article className="task-bank-item" key={item.id}>
                      <div>
                        <strong>{index + 1}</strong>
                        {item.id.startsWith('custom-') ? <span>Ajoutée</span> : null}
                        <button className="task-preview-button" type="button" onClick={() => setPreviewTask(item)}>
                          <Eye size={14} />
                          Lire
                        </button>
                      </div>
                      <p>{summarizePrompt(item.prompt)}</p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      ) : null}

      {previewTask ? <TaskPreviewModal task={previewTask} onClose={() => setPreviewTask(undefined)} /> : null}
    </section>
  );
}
