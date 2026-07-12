import { Check, ChevronDown, ChevronUp, ClipboardCopy, RefreshCw, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  tache3PositionLabels,
  tache3StructureGuidance,
  tache3TemplatePhrases,
  tache3TrainerTasks,
  type Tache3Position,
  type Tache3Section,
  type Tache3TemplatePhrase,
  type Tache3TrainerTask,
} from '../data/tache3Trainer';
import { countWords } from '../utils/wordCount';

const sectionLabels: Record<Tache3Section, string> = {
  title: '1. Titre pertinent et impactant',
  synthesis: '2. Synthèse neutre (40–60 mots)',
  position: '3. Opinion argumentée (80–120 mots)',
};

type WritingSections = Record<Tache3Section, string>;
type VisibleTemplates = Record<Tache3Section, boolean>;

const emptySections: WritingSections = {
  title: '',
  synthesis: '',
  position: '',
};

const hiddenTemplates: VisibleTemplates = {
  title: false,
  synthesis: false,
  position: false,
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

function matchesTemplatePhrase(answer: string, phrase: Tache3TemplatePhrase) {
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
  const options = tache3TrainerTasks.filter((task) => task.id !== currentTaskId);
  return options[Math.floor(Math.random() * options.length)] ?? tache3TrainerTasks[0];
}

function getSectionTemplatePhrases(section: Tache3Section) {
  return tache3TemplatePhrases.filter((phrase) => phrase.section === section);
}

function hasOpinionMarkers(value: string) {
  const normalizedValue = normalizeText(value);
  const markers = ['a mon avis', 'je pense', 'pour ma part', 'selon moi', 'je suis convaincu', 'de mon point de vue'];
  return markers.some((marker) => normalizedValue.includes(marker));
}

function hasDocReferences(value: string) {
  const normalizedValue = normalizeText(value);
  return (
    (normalizedValue.includes('premier document') || normalizedValue.includes('premier texte') || normalizedValue.includes('d’un cote') || normalizedValue.includes("d'un cote")) &&
    (normalizedValue.includes('second document') || normalizedValue.includes('deuxieme document') || normalizedValue.includes('second texte') || normalizedValue.includes('en revanche'))
  );
}

function hasNuance(value: string) {
  const normalizedValue = normalizeText(value);
  const markers = ['cependant', 'toutefois', 'neanmoins', 'bien que', 'il est vrai', 'mais', 'en revanche'];
  return markers.some((marker) => normalizedValue.includes(marker));
}

export function Tache3Trainer() {
  const [task, setTask] = useState<Tache3TrainerTask>(() => pickRandomTask());
  const [selectedPosition, setSelectedPosition] = useState<Tache3Position | ''>('');
  const [checkedIdeas, setCheckedIdeas] = useState<string[]>([]);
  const [visibleTemplates, setVisibleTemplates] = useState<VisibleTemplates>(hiddenTemplates);
  const [sections, setSections] = useState<WritingSections>(emptySections);
  const [showReview, setShowReview] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const relevantPhrases = useMemo(() => tache3TemplatePhrases, []);
  const answerBody = [sections.synthesis, sections.position].filter(Boolean).join('\n');
  const fullAnswer = [sections.title, answerBody].filter(Boolean).join('\n\n');
  const synthesisWords = countWords(sections.synthesis);
  const positionWords = countWords(sections.position);
  const totalWords = countWords(answerBody);
  const normalizedAnswer = normalizeText(fullAnswer);
  const includedIdeas = task.expectedIdeas.filter((idea) =>
    idea.keywords.some((keyword) => normalizedAnswer.includes(normalizeText(keyword))),
  );
  const missingIdeas = task.expectedIdeas.filter((idea) => !includedIdeas.includes(idea));
  const usedPhrases = relevantPhrases.filter((phrase) => matchesTemplatePhrase(fullAnswer, phrase));
  const completedSections = (Object.keys(sectionLabels) as Tache3Section[]).filter((section) => sections[section].trim()).length;
  const hasTitle = sections.title.trim().length > 0;
  const isSynthesisOk = synthesisWords >= 40 && synthesisWords <= 60;
  const isPositionOk = positionWords >= 80 && positionWords <= 120;
  const isTotalOk = totalWords >= 120 && totalWords <= 180;
  const synthesisHasDocReferences = hasDocReferences(sections.synthesis);
  const synthesisHasOpinion = hasOpinionMarkers(sections.synthesis);
  const positionHasOpinion = hasOpinionMarkers(sections.position);
  const positionHasNuance = hasNuance(sections.position);

  function resetForTask(nextTask: Tache3TrainerTask) {
    setTask(nextTask);
    setSelectedPosition('');
    setCheckedIdeas([]);
    setVisibleTemplates(hiddenTemplates);
    setSections(emptySections);
    setShowReview(false);
  }

  function toggleIdea(label: string) {
    setCheckedIdeas((current) => (current.includes(label) ? current.filter((item) => item !== label) : [...current, label]));
  }

  function toggleSectionTemplates(section: Tache3Section) {
    setVisibleTemplates((current) => ({ ...current, [section]: !current[section] }));
  }

  function updateSection(section: Tache3Section, value: string) {
    setSections((current) => ({ ...current, [section]: value }));
  }

  function addPhraseToSection(section: Tache3Section, phrase: string) {
    setSections((current) => {
      const currentText = current[section].trimEnd();
      return {
        ...current,
        [section]: currentText ? `${currentText}\n${phrase}` : phrase,
      };
    });
  }

  function getExportText() {
    const answer = (Object.keys(sectionLabels) as Tache3Section[])
      .map((section) => sections[section].trim())
      .filter(Boolean)
      .join('\n\n');

    return `Tâche 3 — ${task.title}\n\nQuestion:\n${task.prompt}\n\nDocument 1:\n${task.document1}\n\nDocument 2:\n${task.document2}\n\nRéponse:\n${answer || '[Réponse vide]'}`;
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
          <p className="eyebrow">Tâche 3 Trainer</p>
          <h1>Synthèse + opinion builder</h1>
          <p>
            Build the PDF-style Tâche 3 response: a neutral 40–60 word synthesis of both documents, then an
            80–120 word argued personal position with nuance and a conclusion.
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
            <span className="trainer-pill">120–180 mots</span>
          </div>
          <p className="trainer-prompt">{task.prompt}</p>
          <dl className="trainer-facts">
            <div>
              <dt>Thème</dt>
              <dd>{task.theme}</dd>
            </div>
            <div>
              <dt>Position modèle</dt>
              <dd>{tache3PositionLabels[task.position]}</dd>
            </div>
          </dl>
          <div className="document-grid">
            <section className="source-document">
              <h3>Document 1</h3>
              <p>{task.document1}</p>
            </section>
            <section className="source-document">
              <h3>Document 2</h3>
              <p>{task.document2}</p>
            </section>
          </div>
        </article>

        <article className="trainer-card">
          <p className="eyebrow">Étape 1 · Decode the documents</p>
          <h2>Les deux points de vue</h2>
          <div className="trainer-doc-view-grid">
            <div>
              <strong>Doc 1</strong>
              <p>{task.doc1View}</p>
            </div>
            <div>
              <strong>Doc 2</strong>
              <p>{task.doc2View}</p>
            </div>
          </div>

          <h3>Quelle position vas-tu défendre ?</h3>
          <div className="trainer-choice-grid">
            {(Object.keys(tache3PositionLabels) as Tache3Position[]).map((position) => (
              <button
                key={position}
                type="button"
                className={selectedPosition === position ? 'trainer-choice selected' : 'trainer-choice'}
                onClick={() => setSelectedPosition(position)}
              >
                {tache3PositionLabels[position]}
              </button>
            ))}
          </div>
          {selectedPosition ? (
            <p className={selectedPosition === task.position ? 'trainer-feedback ok' : 'trainer-feedback muted'}>
              {selectedPosition === task.position
                ? 'Good choice for this model. You can still defend another position if it is well argued.'
                : 'That can work too — Tâche 3 accepts any clear, coherent position with evidence and nuance.'}
            </p>
          ) : null}
        </article>

        <article className="trainer-card">
          <p className="eyebrow">Étape 2 · PDF method</p>
          <h2>Structure cible</h2>
          <ul className="trainer-checklist">
            <li className={hasTitle ? 'done' : ''}>
              <strong>{tache3StructureGuidance.title}</strong>
              <small>Summarize the debate in one catchy line.</small>
            </li>
            <li className={isSynthesisOk && synthesisHasDocReferences && !synthesisHasOpinion ? 'done' : ''}>
              <strong>{tache3StructureGuidance.synthesis}</strong>
              <small>
                Current: {synthesisWords} words. Mention both documents objectively. No “je pense” here.
              </small>
            </li>
            <li className={isPositionOk && positionHasOpinion && positionHasNuance ? 'done' : ''}>
              <strong>{tache3StructureGuidance.position}</strong>
              <small>
                Current: {positionWords} words. State your view, argue, recognize a limit, and conclude.
              </small>
            </li>
            <li className={isTotalOk ? 'done' : ''}>
              <strong>{tache3StructureGuidance.total}</strong>
              <small>Current total without title: {totalWords} words.</small>
            </li>
          </ul>
        </article>

        <article className="trainer-card trainer-writing-card">
          <div className="trainer-card-header">
            <div>
              <p className="eyebrow">Étape 3 · Template builder</p>
              <h2>Guided answer builder</h2>
            </div>
            <span className={isTotalOk ? 'trainer-pill ok' : 'trainer-pill'}>{totalWords} mots</span>
          </div>

          <div className="trainer-section-list">
            {(Object.keys(sectionLabels) as Tache3Section[]).map((section) => {
              const phrases = getSectionTemplatePhrases(section);
              return (
                <div key={section} className="trainer-section-block">
                  <div className="trainer-section-topline">
                    <label className="trainer-section" htmlFor={`tache3-section-${section}`}>
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
                    id={`tache3-section-${section}`}
                    value={sections[section]}
                    rows={section === 'position' ? 8 : section === 'synthesis' ? 4 : 1}
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
          <div className="trainer-detail-list">
            {task.expectedIdeas.map((idea) => (
              <label key={idea.label} className="trainer-detail-item">
                <input type="checkbox" checked={checkedIdeas.includes(idea.label)} onChange={() => toggleIdea(idea.label)} />
                {idea.label}
              </label>
            ))}
          </div>

          <ul className="trainer-checklist">
            <li className={completedSections === 3 ? 'done' : ''}>
              <strong>Sections:</strong> {completedSections}/3 completed
              {completedSections < 3 ? <small>Add a title, neutral synthesis, and opinion paragraph.</small> : null}
            </li>
            <li className={isSynthesisOk ? 'done' : ''}>
              <strong>Synthèse:</strong> {synthesisWords}/40–60 words
              {!isSynthesisOk ? <small>{synthesisWords < 40 ? 'Add both perspectives clearly.' : 'Shorten the neutral summary.'}</small> : null}
            </li>
            <li className={!synthesisHasOpinion && synthesisHasDocReferences ? 'done' : ''}>
              <strong>Neutrality:</strong> {synthesisHasOpinion ? 'opinion detected in synthesis' : 'no obvious opinion marker'}
              <small>{synthesisHasDocReferences ? 'Both document viewpoints detected.' : 'Mention both documents/perspectives explicitly.'}</small>
            </li>
            <li className={isPositionOk && positionHasOpinion && positionHasNuance ? 'done' : ''}>
              <strong>Opinion:</strong> {positionWords}/80–120 words
              <small>
                {positionHasOpinion ? 'Opinion marker detected.' : 'Add “À mon avis...” or similar.'}{' '}
                {positionHasNuance ? 'Nuance detected.' : 'Add cependant/toutefois/bien que + a limit.'}
              </small>
            </li>
            <li className={missingIdeas.length === 0 ? 'done' : ''}>
              <strong>Key ideas:</strong> {includedIdeas.length}/{task.expectedIdeas.length} included
              {missingIdeas.length ? <small>Missing: {missingIdeas.map((idea) => idea.label).join(', ')}</small> : null}
            </li>
            <li className={usedPhrases.length >= 4 ? 'done' : ''}>
              <strong>PDF connectors:</strong> {usedPhrases.length}/4 recognized
              <small>Use contrast + opinion + nuance + conclusion connectors.</small>
            </li>
          </ul>

          {showReview ? (
            <div className="trainer-review-box">
              <h3>Quick feedback</h3>
              <p>
                {completedSections === 3 && isSynthesisOk && isPositionOk && isTotalOk && !synthesisHasOpinion && positionHasOpinion && positionHasNuance
                  ? 'Good Tâche 3 structure. Now rewrite the same topic without opening the phrase banks.'
                  : 'Not exam-ready yet. Fix the split first: neutral synthesis 40–60 words, then personal opinion 80–120 words with a clear nuance.'}
              </p>
              <p>
                <strong>Critical rule:</strong> do not give your opinion in the synthesis. Save “À mon avis...” for the second paragraph.
              </p>
            </div>
          ) : null}
        </article>
      </section>
    </main>
  );
}
