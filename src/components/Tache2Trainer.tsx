import { Check, ChevronDown, ChevronUp, ClipboardCopy, RefreshCw, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  tache2CategoryLabels,
  tache2StructureGuidance,
  tache2TemplatePhrases,
  tache2TrainerTasks,
  type Tache2Category,
  type Tache2Section,
  type Tache2TemplatePhrase,
  type Tache2TrainerTask,
} from '../data/tache2Trainer';
import { countWords } from '../utils/wordCount';

const sectionLabels: Record<Tache2Section, string> = {
  title: '1. Titre accrocheur',
  introduction: '2. Introduction (30–40 mots)',
  development: '3. Développement (60–80 mots)',
  conclusion: '4. Conclusion (30–40 mots)',
};

type WritingSections = Record<Tache2Section, string>;
type VisibleTemplates = Record<Tache2Section, boolean>;

const emptySections: WritingSections = {
  title: '',
  introduction: '',
  development: '',
  conclusion: '',
};

const hiddenTemplates: VisibleTemplates = {
  title: false,
  introduction: false,
  development: false,
  conclusion: false,
};

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘`´]/g, "'")
    .toLowerCase();
}

function normalizeForMatching(value: string) {
  return normalizeText(value)
    .replace(/\([a-z]+\)/g, '')
    .replace(/\[[^\]]+\]/g, ' ')
    .replace(/[^a-z0-9' ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasNearTokenMatch(answer: string, phrase: string) {
  const answerTokens = normalizeForMatching(answer).split(' ').filter(Boolean);
  const phraseTokens = normalizeForMatching(phrase).split(' ').filter(Boolean);

  if (phraseTokens.length < 5 || answerTokens.length < phraseTokens.length) {
    return false;
  }

  const allowedMismatches = phraseTokens.length >= 7 ? 2 : 1;

  for (let start = 0; start <= answerTokens.length - phraseTokens.length; start += 1) {
    const mismatches = phraseTokens.reduce((count, token, index) => {
      return count + (answerTokens[start + index] === token ? 0 : 1);
    }, 0);

    if (mismatches <= allowedMismatches) {
      return true;
    }
  }

  return false;
}

function matchesTemplatePhrase(answer: string, phrase: Tache2TemplatePhrase) {
  const normalizedAnswer = normalizeForMatching(answer);
  const normalizedPhrase = normalizeForMatching(phrase.french);

  if (normalizedPhrase && normalizedAnswer.includes(normalizedPhrase)) {
    return true;
  }

  if (!phrase.french.includes('[') && hasNearTokenMatch(answer, phrase.french)) {
    return true;
  }

  const concreteParts = phrase.french
    .split(/\[[^\]]+\]|\([a-zA-Z]+\)/)
    .map(normalizeForMatching)
    .filter((part) => part.length >= 6);

  return concreteParts.length > 0 && concreteParts.every((part) => normalizedAnswer.includes(part));
}

function pickRandomTask(currentTaskId?: string) {
  const options = tache2TrainerTasks.filter((task) => task.id !== currentTaskId);
  return options[Math.floor(Math.random() * options.length)] ?? tache2TrainerTasks[0];
}

function getSectionTemplatePhrases(section: Tache2Section) {
  return tache2TemplatePhrases.filter((phrase) => phrase.section === section);
}

function getAllRelevantPhrases() {
  return tache2TemplatePhrases;
}

function getSectionWordCount(sections: WritingSections, section: Exclude<Tache2Section, 'title'>) {
  return countWords(sections[section]);
}

export function Tache2Trainer() {
  const [task, setTask] = useState<Tache2TrainerTask>(() => pickRandomTask());
  const [selectedCategory, setSelectedCategory] = useState<Tache2Category | ''>('');
  const [checkedDetails, setCheckedDetails] = useState<string[]>([]);
  const [visibleTemplates, setVisibleTemplates] = useState<VisibleTemplates>(hiddenTemplates);
  const [sections, setSections] = useState<WritingSections>(emptySections);
  const [showReview, setShowReview] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const relevantPhrases = useMemo(() => getAllRelevantPhrases(), []);
  const answerBody = [sections.introduction, sections.development, sections.conclusion].filter(Boolean).join('\n');
  const fullAnswer = [sections.title, answerBody].filter(Boolean).join('\n\n');
  const wordCount = countWords(answerBody);
  const normalizedAnswer = normalizeText(fullAnswer);
  const includedDetails = task.requiredDetails.filter((detail) =>
    detail.keywords.some((keyword) => normalizedAnswer.includes(normalizeText(keyword))),
  );
  const missingDetails = task.requiredDetails.filter((detail) => !includedDetails.includes(detail));
  const usedPhrases = relevantPhrases.filter((phrase) => matchesTemplatePhrase(fullAnswer, phrase));
  const completedSections = (Object.keys(sectionLabels) as Tache2Section[]).filter((section) =>
    sections[section].trim(),
  ).length;
  const isWordCountOk = wordCount >= 120 && wordCount <= 150;
  const introWords = getSectionWordCount(sections, 'introduction');
  const developmentWords = getSectionWordCount(sections, 'development');
  const conclusionWords = getSectionWordCount(sections, 'conclusion');
  const isIntroOk = introWords >= 20 && introWords <= 45;
  const isDevelopmentOk = developmentWords >= 50 && developmentWords <= 90;
  const isConclusionOk = conclusionWords >= 20 && conclusionWords <= 45;
  const hasTitle = sections.title.trim().length > 0;

  function resetForTask(nextTask: Tache2TrainerTask) {
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

  function toggleSectionTemplates(section: Tache2Section) {
    setVisibleTemplates((current) => ({ ...current, [section]: !current[section] }));
  }

  function updateSection(section: Tache2Section, value: string) {
    setSections((current) => ({ ...current, [section]: value }));
  }

  function addPhraseToSection(section: Tache2Section, phrase: string) {
    setSections((current) => {
      const currentText = current[section].trimEnd();
      return {
        ...current,
        [section]: currentText ? `${currentText}\n${phrase}` : phrase,
      };
    });
  }

  function getExportText() {
    const answer = (Object.keys(sectionLabels) as Tache2Section[])
      .map((section) => sections[section].trim())
      .filter(Boolean)
      .join('\n\n');

    return `Tâche 2 — ${task.title}\n\nQuestion:\n${task.prompt}\n\nRéponse:\n${answer || '[Réponse vide]'}`;
  }

  async function handleCopyExport() {
    const exportText = getExportText();

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(exportText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = exportText;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setExportStatus('copied');
      window.setTimeout(() => setExportStatus('idle'), 1800);
    } catch {
      setExportStatus('error');
      window.setTimeout(() => setExportStatus('idle'), 2500);
    }
  }

  return (
    <main className="trainer-screen">
      <section className="trainer-hero">
        <div>
          <p className="eyebrow">Tâche 2 Trainer</p>
          <h1>Récit + opinion builder</h1>
          <p>
            Build a 120–150 word Tâche 2 response from the PDF method: catchy title, short context,
            detailed experience, and a clear final recommendation or reflection.
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
            <span className="trainer-pill">120–150 mots</span>
          </div>
          <p className="trainer-prompt">{task.prompt}</p>
          <dl className="trainer-facts">
            <div>
              <dt>Format</dt>
              <dd>{task.format}</dd>
            </div>
            <div>
              <dt>Destinataires</dt>
              <dd>{task.audience}</dd>
            </div>
            <div>
              <dt>Objectif</dt>
              <dd>{task.goal}</dd>
            </div>
            <div>
              <dt>Méthode PDF</dt>
              <dd>Titre · intro · développement · conclusion</dd>
            </div>
          </dl>
        </article>

        <article className="trainer-card">
          <p className="eyebrow">Étape 1 · Decode the task</p>
          <h2>Quel type de Tâche 2 ?</h2>
          <div className="trainer-choice-grid">
            {(Object.keys(tache2CategoryLabels) as Tache2Category[]).map((category) => (
              <button
                key={category}
                type="button"
                className={selectedCategory === category ? 'trainer-choice selected' : 'trainer-choice'}
                onClick={() => setSelectedCategory(category)}
              >
                {tache2CategoryLabels[category]}
              </button>
            ))}
          </div>
          {selectedCategory ? (
            <p className={selectedCategory === task.category ? 'trainer-feedback ok' : 'trainer-feedback warn'}>
              {selectedCategory === task.category
                ? 'Correct — now write it as a structured récit with your impressions.'
                : `Close, but this prompt is mainly: ${tache2CategoryLabels[task.category]}.`}
            </p>
          ) : null}

          <h3>Détails à intégrer</h3>
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
          <p className="eyebrow">Étape 2 · PDF method</p>
          <h2>Structure cible</h2>
          <ul className="trainer-checklist">
            <li className={hasTitle ? 'done' : ''}>
              <strong>{tache2StructureGuidance.title}</strong>
              <small>Capture attention and summarize the experience.</small>
            </li>
            <li className={isIntroOk ? 'done' : ''}>
              <strong>{tache2StructureGuidance.introduction}</strong>
              <small>Current: {introWords} words. Present the event and why it matters.</small>
            </li>
            <li className={isDevelopmentOk ? 'done' : ''}>
              <strong>{tache2StructureGuidance.development}</strong>
              <small>Current: {developmentWords} words. Tell what happened, what stood out, and how you felt.</small>
            </li>
            <li className={isConclusionOk ? 'done' : ''}>
              <strong>{tache2StructureGuidance.conclusion}</strong>
              <small>Current: {conclusionWords} words. Summarize + recommend, convince, or reflect.</small>
            </li>
          </ul>
        </article>

        <article className="trainer-card trainer-writing-card">
          <div className="trainer-card-header">
            <div>
              <p className="eyebrow">Étape 3 · Template builder</p>
              <h2>Guided answer builder</h2>
            </div>
            <span className={isWordCountOk ? 'trainer-pill ok' : 'trainer-pill'}>{wordCount} mots</span>
          </div>

          <div className="trainer-section-list">
            {(Object.keys(sectionLabels) as Tache2Section[]).map((section) => {
              const phrases = getSectionTemplatePhrases(section);
              return (
                <div key={section} className="trainer-section-block">
                  <div className="trainer-section-topline">
                    <label className="trainer-section" htmlFor={`tache2-section-${section}`}>
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
                    id={`tache2-section-${section}`}
                    value={sections[section]}
                    rows={section === 'development' ? 7 : section === 'title' ? 1 : 3}
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
            <button className="secondary-action" type="button" onClick={handleCopyExport}>
              <ClipboardCopy size={16} />
              {exportStatus === 'copied' ? 'Copied!' : 'Copy question + answer'}
            </button>
            <button className="secondary-action" type="button" onClick={() => setSections(emptySections)}>
              <RotateCcw size={16} />
              Clear answer
            </button>
            {exportStatus === 'error' ? <p className="trainer-feedback warn">Could not copy to clipboard.</p> : null}
          </div>
        </article>

        <article className="trainer-card">
          <p className="eyebrow">Étape 4 · Checklist</p>
          <h2>Exam-ready check</h2>
          <ul className="trainer-checklist">
            <li className={completedSections === 4 ? 'done' : ''}>
              <strong>Sections:</strong> {completedSections}/4 completed
              {completedSections < 4 ? <small>Add a title, introduction, development, and conclusion.</small> : null}
            </li>
            <li className={isWordCountOk ? 'done' : ''}>
              <strong>Word count:</strong> {wordCount}/120–150 words
              {!isWordCountOk ? <small>{wordCount < 120 ? 'Add detail to the story.' : 'Shorten repeated ideas.'}</small> : null}
            </li>
            <li className={missingDetails.length === 0 ? 'done' : ''}>
              <strong>Required details:</strong> {includedDetails.length}/{task.requiredDetails.length} included
              {missingDetails.length ? (
                <small>Missing: {missingDetails.map((detail) => detail.label).join(', ')}</small>
              ) : null}
            </li>
            <li className={usedPhrases.length >= 4 ? 'done' : ''}>
              <strong>PDF phrases/connectors:</strong> {usedPhrases.length}/4 recognized
              {usedPhrases.length ? (
                <small>Recognized: {usedPhrases.map((phrase) => phrase.french).join(' · ')}</small>
              ) : (
                <small>Use/adapt phrases from the model banks: récemment, tout d’abord, ce qui m’a marqué, en somme...</small>
              )}
            </li>
          </ul>

          {showReview ? (
            <div className="trainer-review-box">
              <h3>Quick feedback</h3>
              <p>
                {completedSections === 4 && isWordCountOk && missingDetails.length === 0 && usedPhrases.length >= 4
                  ? 'Good Tâche 2 structure. The next step is to rewrite it once without opening the phrase banks.'
                  : 'Not exam-ready yet. Fix the checklist notes above, especially the 120–150 word range and required prompt details.'}
              </p>
              <p>
                <strong>Remember:</strong> Tâche 2 is not just description. Add your impressions, opinion, or argument so the text has a clear objective.
              </p>
            </div>
          ) : null}
        </article>
      </section>
    </main>
  );
}
