import { BookOpen, CheckCircle2, ClipboardCopy, RefreshCw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { grammarLessons, lessonFocusOrder, type GrammarLesson } from '../data/grammarLessons';

const priorityLabels: Record<GrammarLesson['priority'], string> = {
  highest: 'Highest priority',
  high: 'High priority',
  medium: 'Medium priority',
};

function getPriorityClass(priority: GrammarLesson['priority']) {
  return priority === 'highest' ? 'lesson-priority highest' : priority === 'high' ? 'lesson-priority high' : 'lesson-priority';
}

function buildLessonExport(lesson: GrammarLesson) {
  return [
    `${lesson.title}`,
    lesson.subtitle,
    '',
    `TCF use: ${lesson.tcfUse}`,
    '',
    'Core rules:',
    ...lesson.coreRules.map((rule) => `- ${rule}`),
    '',
    'Examples:',
    ...lesson.examples.map((example) => `${example.wrong ? `❌ ${example.wrong}\n` : ''}✅ ${example.correct}\nNote: ${example.note}`),
    '',
    'Chunks:',
    lesson.chunks.join(' · '),
    '',
    `Writing move: ${lesson.writingMove}`,
    '',
    'Drills:',
    ...lesson.drills.map((drill, index) => `${index + 1}. ${drill.prompt}\nAnswer: ${drill.answer}\nWhy: ${drill.explanation}`),
  ].join('\n');
}

export function GrammarLessons() {
  const [activeLessonId, setActiveLessonId] = useState(grammarLessons[0]?.id ?? '');
  const [revealedDrills, setRevealedDrills] = useState<Record<string, boolean>>({});
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const activeLesson = useMemo(
    () => grammarLessons.find((lesson) => lesson.id === activeLessonId) ?? grammarLessons[0],
    [activeLessonId],
  );

  function revealDrill(drillKey: string) {
    setRevealedDrills((current) => ({ ...current, [drillKey]: !current[drillKey] }));
  }

  function resetDrills() {
    setRevealedDrills({});
  }

  async function copyLesson() {
    if (!activeLesson) {
      return;
    }

    try {
      await navigator.clipboard.writeText(buildLessonExport(activeLesson));
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 1800);
    } catch {
      setCopyStatus('error');
      window.setTimeout(() => setCopyStatus('idle'), 2400);
    }
  }

  if (!activeLesson) {
    return null;
  }

  return (
    <main className="lessons-screen">
      <section className="lessons-hero">
        <div>
          <p className="eyebrow">TCF B2 Lessons</p>
          <h1>Grammar & writing precision syllabus</h1>
          <p>
            A focused lesson module for the exact grammar patterns that most affect your TCF expression écrite score:
            verb constructions, infinitives, agreement, prepositions, pronouns, tense control, connectors, and idioms.
          </p>
        </div>
        <div className="lessons-focus-card" aria-label="Focus order">
          <strong>Master in this order</strong>
          <ol>
            {lessonFocusOrder.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="lessons-layout">
        <aside className="lessons-nav" aria-label="Lesson list">
          {grammarLessons.map((lesson, index) => (
            <button
              key={lesson.id}
              type="button"
              className={lesson.id === activeLesson.id ? 'lesson-nav-item active' : 'lesson-nav-item'}
              onClick={() => setActiveLessonId(lesson.id)}
            >
              <span>{index + 1}</span>
              <strong>{lesson.title}</strong>
              <small>{priorityLabels[lesson.priority]}</small>
            </button>
          ))}
        </aside>

        <article className="lesson-panel">
          <header className="lesson-panel-header">
            <div>
              <span className={getPriorityClass(activeLesson.priority)}>{priorityLabels[activeLesson.priority]}</span>
              <h2>{activeLesson.title}</h2>
              <p>{activeLesson.subtitle}</p>
            </div>
            <button className="secondary-action" type="button" onClick={copyLesson}>
              <ClipboardCopy size={16} />
              {copyStatus === 'copied' ? 'Copied!' : 'Copy lesson'}
            </button>
          </header>

          {copyStatus === 'error' ? <p className="trainer-feedback warn">Could not copy this lesson.</p> : null}

          <section className="lesson-callout">
            <BookOpen size={18} />
            <div>
              <strong>Why this matters for TCF</strong>
              <p>{activeLesson.tcfUse}</p>
            </div>
          </section>

          <section className="lesson-section">
            <h3>Core rules</h3>
            <ul className="lesson-rule-list">
              {activeLesson.coreRules.map((rule) => (
                <li key={rule}>
                  <CheckCircle2 size={16} />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="lesson-section">
            <h3>Examples to memorize</h3>
            <div className="lesson-example-grid">
              {activeLesson.examples.map((example, index) => (
                <div className="lesson-example-card" key={`${example.correct}-${index}`}>
                  {example.wrong ? <p className="wrong-example">❌ {example.wrong}</p> : null}
                  <p className="correct-example">✅ {example.correct}</p>
                  <small>{example.note}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="lesson-section">
            <h3>Chunks bank</h3>
            <div className="lesson-chip-list">
              {activeLesson.chunks.map((chunk) => (
                <span key={chunk}>{chunk}</span>
              ))}
            </div>
          </section>

          <section className="lesson-callout writing-move">
            <BookOpen size={18} />
            <div>
              <strong>TCF writing move</strong>
              <p>{activeLesson.writingMove}</p>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-title-row">
              <h3>Practice drills</h3>
              <button className="secondary-action" type="button" onClick={resetDrills}>
                <RefreshCw size={15} />
                Hide answers
              </button>
            </div>
            <div className="lesson-drill-list">
              {activeLesson.drills.map((drill, index) => {
                const drillKey = `${activeLesson.id}-${index}`;
                const isRevealed = Boolean(revealedDrills[drillKey]);

                return (
                  <div className="lesson-drill-card" key={drillKey}>
                    <p>
                      <strong>{index + 1}.</strong> {drill.prompt}
                    </p>
                    <button className="trainer-template-toggle" type="button" onClick={() => revealDrill(drillKey)}>
                      {isRevealed ? 'Hide answer' : 'Show answer'}
                    </button>
                    {isRevealed ? (
                      <div className="lesson-answer-box">
                        <strong>{drill.answer}</strong>
                        <small>{drill.explanation}</small>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        </article>
      </section>
    </main>
  );
}
