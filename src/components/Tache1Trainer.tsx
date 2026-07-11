import { Check, RefreshCw, RotateCcw, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  tache1CategoryLabels,
  tache1TemplatePhrases,
  tache1TrainerTasks,
  type Tache1Category,
  type Tache1TrainerTask,
  type TemplatePhrase,
} from '../data/tache1Trainer';
import { countWords } from '../utils/wordCount';

const sectionLabels = {
  opening: '1. Salutation',
  purpose: '2. Pourquoi j’écris',
  details: '3. Détails obligatoires',
  reply: '4. Demander une réponse',
  closing: '5. Clôture',
};

type WritingSections = Record<keyof typeof sectionLabels, string>;

const emptySections: WritingSections = {
  opening: '',
  purpose: '',
  details: '',
  reply: '',
  closing: '',
};

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function pickRandomTask(currentTaskId?: string) {
  const options = tache1TrainerTasks.filter((task) => task.id !== currentTaskId);
  return options[Math.floor(Math.random() * options.length)] ?? tache1TrainerTasks[0];
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getRecallPhrases(task: Tache1TrainerTask) {
  const categoryMap: Partial<Record<Tache1Category, TemplatePhrase['category'][]>> = {
    invitation: ['invitation', 'details', 'reply'],
    description: ['description', 'details', 'reply'],
    recommendation: ['recommendation', 'details', 'reply'],
    request: ['request', 'details', 'reply'],
    coordination: ['details', 'request', 'reply'],
    announcement: ['purpose', 'description', 'reply'],
    complaint: ['purpose', 'details', 'request'],
  };

  const targetCategories = ['opening', ...(categoryMap[task.category] ?? []), 'closing'];
  const phrases = targetCategories
    .map((category) => tache1TemplatePhrases.find((phrase) => phrase.category === category))
    .filter((phrase): phrase is TemplatePhrase => Boolean(phrase));

  return phrases.slice(0, 5);
}

function getPhraseSuggestions(task: Tache1TrainerTask) {
  const recallPhraseIds = new Set(getRecallPhrases(task).map((phrase) => phrase.id));
  const relevantCategories = new Set<TemplatePhrase['category']>([
    'opening',
    'purpose',
    'details',
    'reply',
    'closing',
  ]);

  if (task.category === 'invitation') relevantCategories.add('invitation');
  if (task.category === 'description' || task.category === 'announcement') relevantCategories.add('description');
  if (task.category === 'recommendation') relevantCategories.add('recommendation');
  if (task.category === 'request' || task.category === 'coordination' || task.category === 'complaint') {
    relevantCategories.add('request');
  }

  return tache1TemplatePhrases.filter(
    (phrase) => recallPhraseIds.has(phrase.id) || relevantCategories.has(phrase.category),
  );
}

export function Tache1Trainer() {
  const [task, setTask] = useState<Tache1TrainerTask>(() => pickRandomTask());
  const [selectedCategory, setSelectedCategory] = useState<Tache1Category | ''>('');
  const [checkedDetails, setCheckedDetails] = useState<string[]>([]);
  const [recallAnswers, setRecallAnswers] = useState<Record<string, string>>({});
  const [showPhraseBank, setShowPhraseBank] = useState(false);
  const [sections, setSections] = useState<WritingSections>(emptySections);
  const [showReview, setShowReview] = useState(false);

  const recallPhrases = useMemo(() => getRecallPhrases(task), [task]);
  const phraseSuggestions = useMemo(() => getPhraseSuggestions(task), [task]);
  const fullAnswer = Object.values(sections).filter(Boolean).join('\n');
  const wordCount = countWords(fullAnswer);
  const normalizedAnswer = normalizeText(fullAnswer);
  const includedDetails = task.requiredDetails.filter((detail) =>
    detail.keywords.some((keyword) => normalizedAnswer.includes(normalizeText(keyword))),
  );
  const usedPhrases = phraseSuggestions.filter((phrase) => normalizedAnswer.includes(normalizeText(phrase.french)));
  const completedSections = Object.values(sections).filter((value) => value.trim().length > 0).length;
  const isWordCountOk = wordCount >= 60 && wordCount <= 120;

  function resetForTask(nextTask: Tache1TrainerTask) {
    setTask(nextTask);
    setSelectedCategory('');
    setCheckedDetails([]);
    setRecallAnswers({});
    setShowPhraseBank(false);
    setSections(emptySections);
    setShowReview(false);
  }

  function toggleDetail(label: string) {
    setCheckedDetails((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
  }

  function updateSection(section: keyof WritingSections, value: string) {
    setSections((current) => ({ ...current, [section]: value }));
  }

  return (
    <main className="trainer-screen">
      <section className="trainer-hero">
        <div>
          <p className="eyebrow">Tâche 1 Trainer</p>
          <h1>Build the message, memorize the template</h1>
          <p>
            Decode the prompt, recall sentence starters, then assemble a clean 60–120 word answer with the exam
            structure.
          </p>
        </div>
        <button className="secondary-action" type="button" onClick={() => resetForTask(pickRandomTask(task.id))}>
          <RefreshCw size={16} />
          Nouvelle tâche
        </button>
      </section>

      <section className="trainer-grid">
        <article className="trainer-card trainer-prompt-card">
          <div className="trainer-card-header">
            <div>
              <p className="eyebrow">Prompt aléatoire</p>
              <h2>{task.title}</h2>
            </div>
            <span className="trainer-pill">60–120 mots</span>
          </div>
          <p className="trainer-prompt">{task.prompt}</p>
          <dl className="trainer-facts">
            <div>
              <dt>Destinataire</dt>
              <dd>{task.recipient}</dd>
            </div>
            <div>
              <dt>Ton</dt>
              <dd>{task.tone}</dd>
            </div>
          </dl>
        </article>

        <article className="trainer-card">
          <p className="eyebrow">Étape 1 · Decode the task</p>
          <h2>Quel type de message ?</h2>
          <div className="trainer-choice-grid">
            {(Object.keys(tache1CategoryLabels) as Tache1Category[]).map((category) => (
              <button
                key={category}
                type="button"
                className={selectedCategory === category ? 'trainer-choice selected' : 'trainer-choice'}
                onClick={() => setSelectedCategory(category)}
              >
                {tache1CategoryLabels[category]}
              </button>
            ))}
          </div>
          {selectedCategory ? (
            <p className={selectedCategory === task.category ? 'trainer-feedback ok' : 'trainer-feedback warn'}>
              {selectedCategory === task.category
                ? 'Correct — now use phrases that fit this function.'
                : `Close, but this one is mainly: ${tache1CategoryLabels[task.category]}.`}
            </p>
          ) : null}

          <h3>Détails à ne pas oublier</h3>
          <div className="trainer-detail-list">
            {task.requiredDetails.map((detail) => (
              <label key={detail.label} className="trainer-detail-item">
                <input
                  type="checkbox"
                  checked={checkedDetails.includes(detail.label)}
                  onChange={() => toggleDetail(detail.label)}
                />
                {detail.label}
              </label>
            ))}
          </div>
        </article>

        <article className="trainer-card">
          <p className="eyebrow">Étape 2 · Recall</p>
          <h2>Complete the template phrases</h2>
          <div className="trainer-recall-list">
            {recallPhrases.map((phrase) => {
              const answer = recallAnswers[phrase.id] ?? '';
              const isCorrect = normalizeText(answer.trim()) === normalizeText(phrase.french);

              return (
                <label key={phrase.id} className="trainer-recall-item">
                  <span>{phrase.cloze}</span>
                  <input
                    value={answer}
                    placeholder="Type the full phrase from memory"
                    onChange={(event) =>
                      setRecallAnswers((current) => ({ ...current, [phrase.id]: event.target.value }))
                    }
                  />
                  {answer ? (
                    <small className={isCorrect ? 'trainer-feedback ok' : 'trainer-feedback muted'}>
                      {isCorrect ? 'Exact ✅' : `Target: ${phrase.french}`}
                    </small>
                  ) : null}
                </label>
              );
            })}
          </div>
        </article>

        <article className="trainer-card trainer-writing-card">
          <div className="trainer-card-header">
            <div>
              <p className="eyebrow">Étape 3 · Write</p>
              <h2>Guided answer builder</h2>
            </div>
            <span className={isWordCountOk ? 'trainer-pill ok' : 'trainer-pill'}>{wordCount} mots</span>
          </div>

          <button className="secondary-action trainer-bank-toggle" type="button" onClick={() => setShowPhraseBank((v) => !v)}>
            <Sparkles size={16} />
            {showPhraseBank ? 'Masquer les phrases' : 'Afficher les phrases utiles'}
          </button>

          {showPhraseBank ? (
            <div className="trainer-phrase-bank">
              {phraseSuggestions.map((phrase) => (
                <button
                  key={phrase.id}
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(phrase.french)}
                  title="Copy phrase"
                >
                  {phrase.french}
                </button>
              ))}
            </div>
          ) : null}

          <div className="trainer-section-list">
            {(Object.keys(sectionLabels) as (keyof WritingSections)[]).map((section) => (
              <label key={section} className="trainer-section">
                <span>{sectionLabels[section]}</span>
                <textarea
                  value={sections[section]}
                  rows={section === 'details' ? 5 : 2}
                  onChange={(event) => updateSection(section, event.target.value)}
                />
              </label>
            ))}
          </div>

          <div className="trainer-actions">
            <button className="primary-action" type="button" onClick={() => setShowReview(true)}>
              <Check size={16} />
              Review my structure
            </button>
            <button className="secondary-action" type="button" onClick={() => setSections(emptySections)}>
              <RotateCcw size={16} />
              Clear answer
            </button>
          </div>
        </article>

        <article className="trainer-card">
          <p className="eyebrow">Étape 4 · Checklist</p>
          <h2>Exam-ready check</h2>
          <ul className="trainer-checklist">
            <li className={completedSections === 5 ? 'done' : ''}>5/5 message sections completed</li>
            <li className={isWordCountOk ? 'done' : ''}>60–120 words</li>
            <li className={includedDetails.length === task.requiredDetails.length ? 'done' : ''}>
              Required details included: {includedDetails.length}/{task.requiredDetails.length}
            </li>
            <li className={usedPhrases.length >= 3 ? 'done' : ''}>Template phrases used: {usedPhrases.length}/3</li>
          </ul>

          {showReview ? (
            <div className="trainer-review-box">
              <h3>Quick feedback</h3>
              <p>
                {completedSections === 5 && isWordCountOk && includedDetails.length === task.requiredDetails.length
                  ? 'Good structure. Now try the same prompt again with fewer hints, or switch to a new task.'
                  : 'Not exam-ready yet. Fix the unchecked items first, then review again.'}
              </p>
              {usedPhrases.length ? (
                <p>
                  <strong>Phrases detected:</strong> {usedPhrases.map((phrase) => phrase.french).join(' · ')}
                </p>
              ) : null}
            </div>
          ) : null}
        </article>
      </section>
    </main>
  );
}
