import { Check, ChevronDown, ChevronUp, RefreshCw, RotateCcw } from 'lucide-react';
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
  opening: '1. Salutation / ouverture',
  purpose: '2. Pourquoi j’écris',
  details: '3. Détails obligatoires',
  reply: '4. Demander une réponse',
  closing: '5. Clôture',
};

type WritingSection = keyof typeof sectionLabels;
type WritingSections = Record<WritingSection, string>;
type VisibleTemplates = Record<WritingSection, boolean>;

const emptySections: WritingSections = {
  opening: '',
  purpose: '',
  details: '',
  reply: '',
  closing: '',
};

const hiddenTemplates: VisibleTemplates = {
  opening: false,
  purpose: false,
  details: false,
  reply: false,
  closing: false,
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

function getTaskSpecificCategories(task: Tache1TrainerTask): TemplatePhrase['category'][] {
  if (task.category === 'invitation') return ['invitation', 'details'];
  if (task.category === 'description' || task.category === 'announcement') return ['description', 'details'];
  if (task.category === 'recommendation') return ['recommendation', 'details'];
  if (task.category === 'request') return ['request', 'details'];
  if (task.category === 'coordination') return ['details', 'request'];
  if (task.category === 'complaint') return ['request', 'details'];
  return ['details'];
}

function getSectionTemplatePhrases(task: Tache1TrainerTask, section: WritingSection) {
  const sectionCategories: Record<WritingSection, TemplatePhrase['category'][]> = {
    opening: ['opening'],
    purpose: ['purpose', ...(task.category === 'invitation' ? ['invitation' as const] : [])],
    details: getTaskSpecificCategories(task),
    reply: ['reply'],
    closing: ['closing'],
  };

  const allowedCategories = new Set(sectionCategories[section]);
  return tache1TemplatePhrases.filter((phrase) => allowedCategories.has(phrase.category));
}

function getAllRelevantPhrases(task: Tache1TrainerTask) {
  const sections = Object.keys(sectionLabels) as WritingSection[];
  const phraseMap = new Map<string, TemplatePhrase>();

  sections.forEach((section) => {
    getSectionTemplatePhrases(task, section).forEach((phrase) => phraseMap.set(phrase.id, phrase));
  });

  return [...phraseMap.values()];
}

export function Tache1Trainer() {
  const [task, setTask] = useState<Tache1TrainerTask>(() => pickRandomTask());
  const [selectedCategory, setSelectedCategory] = useState<Tache1Category | ''>('');
  const [checkedDetails, setCheckedDetails] = useState<string[]>([]);
  const [visibleTemplates, setVisibleTemplates] = useState<VisibleTemplates>(hiddenTemplates);
  const [sections, setSections] = useState<WritingSections>(emptySections);
  const [showReview, setShowReview] = useState(false);

  const relevantPhrases = useMemo(() => getAllRelevantPhrases(task), [task]);
  const fullAnswer = Object.values(sections).filter(Boolean).join('\n');
  const wordCount = countWords(fullAnswer);
  const normalizedAnswer = normalizeText(fullAnswer);
  const includedDetails = task.requiredDetails.filter((detail) =>
    detail.keywords.some((keyword) => normalizedAnswer.includes(normalizeText(keyword))),
  );
  const usedPhrases = relevantPhrases.filter((phrase) => normalizedAnswer.includes(normalizeText(phrase.french)));
  const completedSections = Object.values(sections).filter((value) => value.trim().length > 0).length;
  const isWordCountOk = wordCount >= 60 && wordCount <= 120;

  function resetForTask(nextTask: Tache1TrainerTask) {
    setTask(nextTask);
    setSelectedCategory('');
    setCheckedDetails([]);
    setVisibleTemplates(hiddenTemplates);
    setSections(emptySections);
    setShowReview(false);
  }

  function toggleDetail(label: string) {
    setCheckedDetails((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
  }

  function toggleSectionTemplates(section: WritingSection) {
    setVisibleTemplates((current) => ({ ...current, [section]: !current[section] }));
  }

  function updateSection(section: WritingSection, value: string) {
    setSections((current) => ({ ...current, [section]: value }));
  }

  function addPhraseToSection(section: WritingSection, phrase: string) {
    setSections((current) => {
      const currentText = current[section].trimEnd();
      return {
        ...current,
        [section]: currentText ? `${currentText}\n${phrase}` : phrase,
      };
    });
  }

  return (
    <main className="trainer-screen">
      <section className="trainer-hero">
        <div>
          <p className="eyebrow">Tâche 1 Trainer</p>
          <h1>Template builder</h1>
          <p>
            Decode the prompt, open the sentence bank for each paragraph, and assemble a clean 60–120 word answer.
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
                ? 'Correct — the builder will show templates for this message type.'
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

        <article className="trainer-card trainer-writing-card">
          <div className="trainer-card-header">
            <div>
              <p className="eyebrow">Étape 2 · Template builder</p>
              <h2>Guided answer builder</h2>
            </div>
            <span className={isWordCountOk ? 'trainer-pill ok' : 'trainer-pill'}>{wordCount} mots</span>
          </div>

          <div className="trainer-section-list">
            {(Object.keys(sectionLabels) as WritingSection[]).map((section) => {
              const phrases = getSectionTemplatePhrases(task, section);
              return (
                <div key={section} className="trainer-section-block">
                  <div className="trainer-section-topline">
                    <label className="trainer-section" htmlFor={`trainer-section-${section}`}>
                      <span>{sectionLabels[section]}</span>
                    </label>
                    <button
                      className="trainer-template-toggle"
                      type="button"
                      onClick={() => toggleSectionTemplates(section)}
                    >
                      {visibleTemplates[section] ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      {visibleTemplates[section] ? 'Masquer les modèles' : 'Voir les modèles'}
                    </button>
                  </div>

                  {visibleTemplates[section] ? (
                    <div className="trainer-phrase-bank section-bank">
                      {phrases.map((phrase) => (
                        <button key={phrase.id} type="button" onClick={() => addPhraseToSection(section, phrase.french)}>
                          <strong>{phrase.french}</strong>
                          <small>{phrase.english}</small>
                        </button>
                      ))}
                    </div>
                  ) : null}

                  <textarea
                    id={`trainer-section-${section}`}
                    value={sections[section]}
                    rows={section === 'details' ? 6 : 2}
                    onChange={(event) => updateSection(section, event.target.value)}
                  />
                </div>
              );
            })}
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
          <p className="eyebrow">Étape 3 · Checklist</p>
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
