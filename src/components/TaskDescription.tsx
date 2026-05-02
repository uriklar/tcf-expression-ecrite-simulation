import type { WritingTask } from '../types';

type TaskDescriptionProps = {
  task: WritingTask;
};

export function TaskDescription({ task }: TaskDescriptionProps) {
  return (
    <section className="task-description" aria-labelledby="task-heading">
      <div className="panel-header">
        <div>
          <p className="eyebrow">{task.type}</p>
          <h1 id="task-heading">{task.title}</h1>
        </div>
        <div className="task-requirements">
          <span>{task.minWords}-{task.maxWords} words</span>
          <span>{task.suggestedMinutes} min suggested</span>
        </div>
      </div>

      <p className="prompt">{task.prompt}</p>

      {task.documents ? (
        <div className="document-grid">
          {task.documents.map((document) => (
            <article className="source-document" key={document.label}>
              <h2>{document.label}</h2>
              <p>{document.text}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
