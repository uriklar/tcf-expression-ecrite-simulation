export type Tache2Category =
  | 'blog-experience'
  | 'forum-recommendation'
  | 'message-friends'
  | 'professional-report'
  | 'opinion-reflection';

export type Tache2Section = 'title' | 'introduction' | 'development' | 'conclusion';

export type Tache2TemplatePhrase = {
  id: string;
  section: Tache2Section;
  category: 'context' | 'sequence' | 'highlight' | 'emotion' | 'description' | 'learning' | 'recommendation' | 'closing';
  french: string;
  english: string;
};

export type Tache2TrainerTask = {
  id: string;
  title: string;
  prompt: string;
  category: Tache2Category;
  format: string;
  audience: string;
  goal: 'attirer' | 'plaire' | 'informer' | 'convaincre' | 'recommander';
  requiredDetails: {
    label: string;
    keywords: string[];
  }[];
};

export const tache2CategoryLabels: Record<Tache2Category, string> = {
  'blog-experience': 'Article de blog / expérience',
  'forum-recommendation': 'Forum / recommandation',
  'message-friends': 'Message à des amis',
  'professional-report': 'Compte rendu professionnel',
  'opinion-reflection': 'Récit + opinion / réflexion',
};

export const tache2StructureGuidance = {
  title: 'Titre accrocheur',
  introduction: 'Introduction : 30–40 mots — contexte + intérêt',
  development: 'Développement : 60–80 mots — récit, détails, émotions',
  conclusion: 'Conclusion : 30–40 mots — bilan + recommandation/réflexion',
};

export const tache2TemplatePhrases: Tache2TemplatePhrase[] = [
  // Title models
  { id: 'title-memorable', section: 'title', category: 'context', french: 'Une expérience mémorable à [lieu]', english: 'A memorable experience at [place]' },
  { id: 'title-discovery', section: 'title', category: 'context', french: 'Une découverte qui vaut le détour', english: 'A discovery worth the trip' },
  { id: 'title-transform', section: 'title', category: 'context', french: '[Activité] : une expérience enrichissante', english: '[Activity]: an enriching experience' },
  { id: 'title-revelation', section: 'title', category: 'context', french: '[Sujet] : une vraie révélation', english: '[Topic]: a real revelation' },
  { id: 'title-invite', section: 'title', category: 'context', french: 'Pourquoi je vous recommande [activité]', english: 'Why I recommend [activity]' },

  // Introduction: PDF method = present event/activity + why interesting/important
  { id: 'intro-recently', section: 'introduction', category: 'context', french: 'Récemment, j’ai eu l’occasion de participer à [activité], et cette expérience m’a beaucoup marqué(e).', english: 'Recently, I had the chance to participate in [activity], and this experience really struck me.' },
  { id: 'intro-days', section: 'introduction', category: 'context', french: 'Il y a quelques jours, j’ai découvert [lieu/activité], une expérience à la fois intéressante et agréable.', english: 'A few days ago, I discovered [place/activity], an experience that was both interesting and pleasant.' },
  { id: 'intro-blog', section: 'introduction', category: 'context', french: 'Je souhaite partager avec vous une expérience unique que j’ai vécue récemment.', english: 'I would like to share with you a unique experience I recently had.' },
  { id: 'intro-message', section: 'introduction', category: 'context', french: 'Salut à tous, je voulais vous raconter une expérience récente qui m’a fait réfléchir.', english: 'Hi everyone, I wanted to tell you about a recent experience that made me think.' },
  { id: 'intro-importance', section: 'introduction', category: 'context', french: 'Cette activité était importante pour moi, car elle m’a permis de découvrir [aspect].', english: 'This activity was important to me because it allowed me to discover [aspect].' },
  { id: 'intro-professional', section: 'introduction', category: 'context', french: 'Dans le cadre de [événement/projet], j’ai participé à [activité] et j’en ai retenu plusieurs points utiles.', english: 'As part of [event/project], I took part in [activity] and took away several useful points.' },

  // Development: sequence, details, striking elements, impressions
  { id: 'dev-start', section: 'development', category: 'sequence', french: 'Tout d’abord, l’activité a commencé par [première étape], ce qui a immédiatement créé une ambiance [adjectif].', english: 'First, the activity began with [first step], which immediately created a [adjective] atmosphere.' },
  { id: 'dev-then', section: 'development', category: 'sequence', french: 'Ensuite, nous avons [action], et cela m’a permis de mieux comprendre [idée/apprentissage].', english: 'Then, we [action], and that allowed me to better understand [idea/learning].' },
  { id: 'dev-finally', section: 'development', category: 'sequence', french: 'Enfin, le moment le plus marquant a été [moment], parce que [raison].', english: 'Finally, the most striking moment was [moment], because [reason].' },
  { id: 'dev-highlight', section: 'development', category: 'highlight', french: 'Ce qui m’a particulièrement marqué, c’est [élément précis].', english: 'What particularly struck me was [specific element].' },
  { id: 'dev-memorable', section: 'development', category: 'highlight', french: 'L’un des moments les plus mémorables a été [moment important].', english: 'One of the most memorable moments was [important moment].' },
  { id: 'dev-emotion-positive', section: 'development', category: 'emotion', french: 'J’ai été impressionné(e) par [élément], et je me suis senti(e) [émotion].', english: 'I was impressed by [element], and I felt [emotion].' },
  { id: 'dev-ambiance', section: 'development', category: 'description', french: 'L’ambiance était à la fois conviviale et chaleureuse, ce qui rendait l’expérience encore plus agréable.', english: 'The atmosphere was both friendly and warm, which made the experience even more pleasant.' },
  { id: 'dev-place', section: 'development', category: 'description', french: 'Le lieu offrait un cadre parfait pour [activité], avec [détail visuel/ambiance].', english: 'The place provided a perfect setting for [activity], with [visual/detail atmosphere].' },
  { id: 'dev-people', section: 'development', category: 'description', french: 'Les échanges avec les autres participants étaient enrichissants et stimulants.', english: 'The exchanges with the other participants were enriching and stimulating.' },
  { id: 'dev-challenge', section: 'development', category: 'highlight', french: 'Ce n’était pas sans défis, notamment [difficulté], mais cela m’a permis de dépasser mes limites.', english: 'It was not without challenges, especially [difficulty], but it allowed me to go beyond my limits.' },
  { id: 'dev-surprise', section: 'development', category: 'highlight', french: 'À ma grande surprise, j’ai découvert que [apprentissage/surprise].', english: 'To my great surprise, I discovered that [learning/surprise].' },
  { id: 'dev-example', section: 'development', category: 'sequence', french: 'Par exemple, [exemple concret] montre bien l’intérêt de cette expérience.', english: 'For example, [concrete example] clearly shows the value of this experience.' },

  // Conclusion: summarize impressions + recommendation/reflection/opening
  { id: 'concl-summary', section: 'conclusion', category: 'closing', french: 'En somme, cette expérience m’a appris que [leçon personnelle].', english: 'All in all, this experience taught me that [personal lesson].' },
  { id: 'concl-recommend', section: 'conclusion', category: 'recommendation', french: 'Je recommande vivement cette activité à tous ceux qui souhaitent [objectif].', english: 'I strongly recommend this activity to anyone who wants to [goal].' },
  { id: 'concl-try', section: 'conclusion', category: 'recommendation', french: 'Si vous cherchez une expérience similaire, n’hésitez pas à essayer [activité].', english: 'If you are looking for a similar experience, do not hesitate to try [activity].' },
  { id: 'concl-future', section: 'conclusion', category: 'closing', french: 'Je serais ravi(e) de renouveler cette expérience à l’avenir.', english: 'I would be delighted to repeat this experience in the future.' },
  { id: 'concl-inspire', section: 'conclusion', category: 'closing', french: 'J’espère que cela inspirera d’autres personnes à [action].', english: 'I hope this will inspire other people to [action].' },
  { id: 'concl-impact', section: 'conclusion', category: 'learning', french: 'Cette expérience a changé ma façon de voir [sujet] et m’a donné envie de [action].', english: 'This experience changed the way I see [topic] and made me want to [action].' },
];

export const tache2TrainerTasks: Tache2TrainerTask[] = [
  {
    id: 'pdf-hike-banff',
    title: 'Randonnée guidée',
    category: 'blog-experience',
    format: 'blog',
    audience: 'lecteurs du blog',
    goal: 'plaire',
    prompt: 'Vous venez de participer à une randonnée guidée dans un parc national canadien. Sur votre blog, racontez cette expérience : le parcours, la faune, la flore, l’ambiance, et expliquez pourquoi vous l’avez appréciée.',
    requiredDetails: [
      { label: 'Parcours / lieu', keywords: ['parcours', 'parc', 'montagne', 'sentier', 'lac', 'forêt'] },
      { label: 'Faune / flore', keywords: ['faune', 'flore', 'animal', 'cerf', 'plante', 'arbres'] },
      { label: 'Appréciation personnelle', keywords: ['apprécié', 'aimé', 'marqué', 'émerveillé', 'recommande'] },
    ],
  },
  {
    id: 'pdf-dance-course',
    title: 'Cours de danse gratuit',
    category: 'forum-recommendation',
    format: 'forum',
    audience: 'membres du forum',
    goal: 'recommander',
    prompt: 'Vous avez découvert un cours de danse offert gratuitement par votre municipalité. Sur un forum, partagez vos impressions sur ce cours : le style de danse, le professeur, l’ambiance du groupe, et indiquez si vous le recommandez.',
    requiredDetails: [
      { label: 'Style de danse', keywords: ['danse', 'style', 'contemporaine', 'rythme'] },
      { label: 'Professeur / groupe', keywords: ['professeur', 'enseignant', 'groupe', 'participants', 'ambiance'] },
      { label: 'Recommandation', keywords: ['recommande', 'conseille', 'essayer', 'accessible'] },
    ],
  },
  {
    id: 'pdf-tech-weekend',
    title: 'Week-end sans technologie',
    category: 'message-friends',
    format: 'message',
    audience: 'amis',
    goal: 'convaincre',
    prompt: 'Vous avez récemment décidé de limiter votre consommation de produits technologiques pendant le week-end. Rédigez un message à vos amis pour leur expliquer les raisons de ce choix et votre ressenti après une première semaine.',
    requiredDetails: [
      { label: 'Raison du choix', keywords: ['raison', 'stress', 'écran', 'déconnecter', 'technologie'] },
      { label: 'Ressenti / effets', keywords: ['ressenti', 'sérénité', 'calme', 'temps', 'concentrer'] },
      { label: 'Invitation / conseil', keywords: ['essayer', 'encourage', 'rejoindre', 'conseille'] },
    ],
  },
  {
    id: 'pdf-independent-film',
    title: 'Film indépendant',
    category: 'blog-experience',
    format: 'blog',
    audience: 'lecteurs du blog',
    goal: 'informer',
    prompt: 'Vous avez assisté à la projection d’un film indépendant dans un petit cinéma de quartier. Sur votre blog, décrivez l’atmosphère de la salle, la qualité du film, et ce qui vous a particulièrement plu ou déplu.',
    requiredDetails: [
      { label: 'Atmosphère de la salle', keywords: ['salle', 'atmosphère', 'ambiance', 'cinéma', 'fauteuil'] },
      { label: 'Qualité du film', keywords: ['film', 'scénario', 'acteur', 'personnage', 'qualité'] },
      { label: 'Avis personnel', keywords: ['plu', 'déplu', 'touché', 'recommande', 'avis'] },
    ],
  },
  {
    id: 'pdf-bio-market',
    title: 'Nouveau marché bio',
    category: 'forum-recommendation',
    format: 'forum culinaire',
    audience: 'membres du forum',
    goal: 'recommander',
    prompt: 'Un nouveau marché bio vient d’ouvrir près de chez vous. Vous écrivez un message sur un forum culinaire pour raconter votre visite, les produits découverts et pourquoi vous trouvez cette initiative intéressante.',
    requiredDetails: [
      { label: 'Visite / ambiance', keywords: ['marché', 'ambiance', 'étal', 'visite', 'quartier'] },
      { label: 'Produits découverts', keywords: ['produit', 'fruit', 'légume', 'fromage', 'local', 'bio'] },
      { label: 'Intérêt de l’initiative', keywords: ['initiative', 'responsable', 'producteur', 'local', 'intéressant'] },
    ],
  },
  {
    id: 'pdf-stress-workshop',
    title: 'Atelier gestion du stress',
    category: 'professional-report',
    format: 'forum interne',
    audience: 'collègues',
    goal: 'informer',
    prompt: 'Suite à un atelier sur la gestion du stress organisé par votre entreprise, vous décidez de partager votre expérience sur un forum interne. Décrivez ce que vous avez appris et comment vous allez appliquer ces conseils dans votre vie professionnelle.',
    requiredDetails: [
      { label: 'Ce que vous avez appris', keywords: ['appris', 'stress', 'respiration', 'temps', 'priorité'] },
      { label: 'Application au travail', keywords: ['appliquer', 'travail', 'professionnel', 'routine', 'pause'] },
      { label: 'Avis / utilité', keywords: ['utile', 'recommande', 'efficace', 'sereinement'] },
    ],
  },
  {
    id: 'pdf-art-workshop',
    title: 'Atelier artistique',
    category: 'blog-experience',
    format: 'blog',
    audience: 'lecteurs du blog',
    goal: 'plaire',
    prompt: 'Vous avez passé un week-end à participer à un atelier artistique : peinture, sculpture ou photographie. Sur votre blog, racontez comment cette expérience a élargi votre créativité et mentionnez les aspects que vous avez particulièrement appréciés.',
    requiredDetails: [
      { label: 'Activité artistique', keywords: ['atelier', 'peinture', 'sculpture', 'photographie', 'art'] },
      { label: 'Créativité / apprentissage', keywords: ['créativité', 'technique', 'appris', 'imagination', 'exprimer'] },
      { label: 'Aspects appréciés', keywords: ['apprécié', 'ambiance', 'guidé', 'libérateur', 'inspirant'] },
    ],
  },
  {
    id: 'pdf-food-bank',
    title: 'Bénévolat alimentaire',
    category: 'forum-recommendation',
    format: 'forum citoyen',
    audience: 'citoyens',
    goal: 'convaincre',
    prompt: 'Vous avez participé à une séance de bénévolat dans une banque alimentaire. Sur un forum citoyen, racontez cette expérience : l’organisation, les tâches effectuées, les personnes rencontrées, et dites ce que vous en retenez.',
    requiredDetails: [
      { label: 'Organisation / tâches', keywords: ['organisation', 'tâche', 'tri', 'paniers', 'distribution'] },
      { label: 'Rencontres', keywords: ['rencontre', 'bénévole', 'personne', 'bénéficiaire', 'échange'] },
      { label: 'Leçon personnelle', keywords: ['retenu', 'solidarité', 'entraide', 'appris', 'important'] },
    ],
  },
  {
    id: 'pdf-plastic-reduction',
    title: 'Réduire le plastique',
    category: 'opinion-reflection',
    format: 'forum écoresponsable',
    audience: 'lecteurs écoresponsables',
    goal: 'convaincre',
    prompt: 'Vous avez décidé de limiter votre consommation de plastique dans votre vie quotidienne. Sur un forum écoresponsable, expliquez les démarches entreprises, les alternatives trouvées, et les difficultés rencontrées.',
    requiredDetails: [
      { label: 'Démarches', keywords: ['limiter', 'réduire', 'plastique', 'démarche', 'consommation'] },
      { label: 'Alternatives', keywords: ['sac', 'réutilisable', 'inox', 'verre', 'vrac', 'savon'] },
      { label: 'Difficultés / bilan', keywords: ['difficile', 'défi', 'emballage', 'obstacle', 'impact'] },
    ],
  },
  {
    id: 'pdf-pottery',
    title: 'Atelier de poterie',
    category: 'forum-recommendation',
    format: 'forum artistique',
    audience: 'artistes amateurs',
    goal: 'recommander',
    prompt: 'Vous avez participé à un atelier de poterie. Sur un forum artistique, partagez les étapes de la création d’un objet, les difficultés rencontrées, et le sentiment de fierté ressenti.',
    requiredDetails: [
      { label: 'Étapes de création', keywords: ['argile', 'façonnage', 'tour', 'cuisson', 'émail', 'étape'] },
      { label: 'Difficultés', keywords: ['difficile', 'défi', 'pression', 'symétrie', 'patience'] },
      { label: 'Fierté / recommandation', keywords: ['fierté', 'résultat', 'fier', 'recommande', 'plaisir'] },
    ],
  },
];
