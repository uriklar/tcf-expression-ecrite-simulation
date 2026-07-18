import january2026Source from './january2026Tasks.json';
import type { Tache1Category, Tache1TrainerTask } from './tache1Trainer';
import type { Tache2Category, Tache2TrainerTask } from './tache2Trainer';
import type { Tache3TrainerTask } from './tache3Trainer';

const frenchStopWords = new Set([
  'avec', 'cette', 'dans', 'des', 'donnez', 'écrivez', 'elle', 'elles', 'est', 'êtes', 'faire', 'fait', 'leur',
  'leurs', 'mais', 'nous', 'pour', 'pourquoi', 'quand', 'que', 'quel', 'quelle', 'qui', 'son', 'sont', 'sur',
  'tous', 'tout', 'une', 'vous', 'votre', 'vos', 'ainsi', 'afin', 'aux', 'comme', 'plus', 'moins', 'avez', 'votre',
]);

function words(value: string) {
  return value
    .toLocaleLowerCase('fr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .match(/[a-z]{4,}/g) ?? [];
}

function keywords(value: string, limit = 6) {
  const counts = new Map<string, number>();
  words(value).forEach((word) => {
    if (!frenchStopWords.has(word)) counts.set(word, (counts.get(word) ?? 0) + 1);
  });
  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'fr'))
    .slice(0, limit)
    .map(([word]) => word);
}

function shortTitle(prompt: string, combination: number) {
  const plain = prompt.replace(/[«»"\n]+/g, ' ').replace(/\s+/g, ' ').trim();
  const firstSentence = plain.split(/(?<=[.!?])\s+/)[0] || plain;
  const title = firstSentence.length > 72 ? `${firstSentence.slice(0, 69).trim()}…` : firstSentence;
  return `Sujet ${combination} · ${title}`;
}

function firstSentence(text: string) {
  return text.split(/(?<=[.!?])\s+/)[0] || text;
}

function task1Category(prompt: string): Tache1Category {
  const value = prompt.toLocaleLowerCase('fr');
  if (/mécontent|cassé|problème|plainte|signaler/.test(value)) return 'complaint';
  if (/invit|propos|anniversaire|fête/.test(value)) return 'invitation';
  if (/recommand|conseil|lieu.*découvrir/.test(value)) return 'recommendation';
  if (/demand|recherch|informations|aider|aide/.test(value)) return 'request';
  if (/organis|garder|plan|prépar|coordonn/.test(value)) return 'coordination';
  if (/annon|racon|nouveau|réussi/.test(value)) return 'announcement';
  return 'description';
}

function task2Category(prompt: string): Tache2Category {
  const value = prompt.toLocaleLowerCase('fr');
  if (/direction|responsable|compte rendu|courriel/.test(value)) return 'professional-report';
  if (/forum|site internet/.test(value) && /recommand|conseil|convain/.test(value)) return 'forum-recommendation';
  if (/amis|ami\(e\)|message/.test(value)) return 'message-friends';
  if (/opinion|avis|réflexion/.test(value)) return 'opinion-reflection';
  return 'blog-experience';
}

function requiredDetails(prompt: string) {
  const selected = keywords(prompt, 9);
  return [0, 1, 2]
    .map((index) => selected.slice(index * 3, index * 3 + 3))
    .filter((group) => group.length)
    .map((group, index) => ({ label: `Point clé ${index + 1}`, keywords: group }));
}

export const januaryTache1TrainerTasks: Tache1TrainerTask[] = january2026Source.combinations.map((item) => ({
  id: `jan-${item.combination}`,
  title: shortTitle(item.task1.prompt, item.combination),
  prompt: item.task1.prompt,
  category: task1Category(item.task1.prompt),
  recipient: 'destinataire indiqué dans la consigne',
  tone: /direction|supérieur|service|administration|agence|syndic/i.test(item.task1.prompt) ? 'formel' : 'amical',
  requiredDetails: requiredDetails(item.task1.prompt),
}));

export const januaryTache2TrainerTasks: Tache2TrainerTask[] = january2026Source.combinations.map((item) => {
  const value = item.task2.prompt.toLocaleLowerCase('fr');
  return {
    id: `jan-${item.combination}`,
    title: shortTitle(item.task2.prompt, item.combination),
    prompt: item.task2.prompt,
    category: task2Category(item.task2.prompt),
    format: value.includes('blog') ? 'blog' : value.includes('forum') ? 'forum' : value.includes('courriel') ? 'courriel' : 'article / message',
    audience: value.includes('amis') ? 'amis' : value.includes('forum') ? 'membres du forum' : 'lecteurs indiqués dans la consigne',
    goal: /recommand|convain/.test(value) ? 'recommander' : /opinion|avis/.test(value) ? 'convaincre' : 'informer',
    requiredDetails: requiredDetails(item.task2.prompt),
  };
});

export const januaryTache3TrainerTasks: Tache3TrainerTask[] = january2026Source.combinations.map((item) => ({
  id: `jan-${item.combination}`,
  title: item.task3.title,
  theme: item.task3.title,
  position: 'nuanced',
  prompt: `Présentez les deux points de vue avec vos propres mots, puis donnez votre opinion sur le thème « ${item.task3.title} ».` ,
  doc1View: firstSentence(item.task3.document1),
  doc2View: firstSentence(item.task3.document2),
  document1: item.task3.document1,
  document2: item.task3.document2,
  expectedIdeas: [
    { label: 'Idées du document 1', keywords: keywords(item.task3.document1) },
    { label: 'Idées du document 2', keywords: keywords(item.task3.document2) },
    { label: 'Position personnelle nuancée', keywords: ['avis', 'opinion', 'cependant', 'toutefois', 'équilibre'] },
  ],
}));
