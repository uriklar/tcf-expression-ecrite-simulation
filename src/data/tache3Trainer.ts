import { januaryTache3TrainerTasks } from './januaryTrainerTasks';

export type Tache3Position = 'balanced-positive' | 'balanced-negative' | 'support' | 'oppose' | 'nuanced';

export type Tache3Section = 'title' | 'synthesis' | 'position';

export type Tache3TemplatePhrase = {
  id: string;
  section: Tache3Section;
  category: 'theme' | 'doc1' | 'doc2' | 'contrast' | 'opinion' | 'argument' | 'example' | 'nuance' | 'solution' | 'conclusion';
  french: string;
  english: string;
};

export type Tache3TrainerTask = {
  id: string;
  title: string;
  prompt: string;
  theme: string;
  position: Tache3Position;
  document1: string;
  document2: string;
  doc1View: string;
  doc2View: string;
  expectedIdeas: {
    label: string;
    keywords: string[];
  }[];
};

export const tache3PositionLabels: Record<Tache3Position, string> = {
  'balanced-positive': 'Opinion favorable mais encadrée',
  'balanced-negative': 'Opinion prudente / réservée',
  support: 'Opinion favorable',
  oppose: 'Opinion opposée',
  nuanced: 'Opinion nuancée',
};

export const tache3StructureGuidance = {
  title: 'Titre pertinent et impactant',
  synthesis: 'Synthèse neutre : 40–60 mots — résumer les deux documents sans opinion',
  position: 'Prise de position : 80–120 mots — opinion claire, arguments, nuance, conclusion',
  total: 'Longueur totale : 120–180 mots',
};

export const tache3TemplatePhrases: Tache3TemplatePhrase[] = [
  // Title
  { id: 'title-debate', section: 'title', category: 'theme', french: '[Thème] : avantage ou source de difficultés ?', english: '[Theme]: advantage or source of difficulties?' },
  { id: 'title-between', section: 'title', category: 'theme', french: '[Thème] : entre opportunités et limites', english: '[Theme]: between opportunities and limits' },
  { id: 'title-issue', section: 'title', category: 'theme', french: '[Thème] : un enjeu majeur pour notre société', english: '[Theme]: a major issue for our society' },
  { id: 'title-balance', section: 'title', category: 'theme', french: '[Thème] : trouver le bon équilibre', english: '[Theme]: finding the right balance' },

  // Neutral synthesis
  { id: 'syn-theme-debate', section: 'synthesis', category: 'theme', french: 'La question de [thème] suscite un vif débat.', english: 'The question of [theme] sparks lively debate.' },
  { id: 'syn-opinions-shared', section: 'synthesis', category: 'theme', french: 'Les avis concernant [thème] sont partagés.', english: 'Opinions about [theme] are divided.' },
  { id: 'syn-current-society', section: 'synthesis', category: 'theme', french: 'Dans notre société actuelle, [thème] représente un enjeu important.', english: 'In today’s society, [theme] is an important issue.' },
  { id: 'syn-doc1', section: 'synthesis', category: 'doc1', french: 'D’un côté, le premier document insiste sur [avantage/idée principale].', english: 'On one hand, the first document emphasizes [benefit/main idea].' },
  { id: 'syn-doc1-alt', section: 'synthesis', category: 'doc1', french: 'Le premier texte met en avant [idée du document 1].', english: 'The first text highlights [idea from document 1].' },
  { id: 'syn-doc2', section: 'synthesis', category: 'doc2', french: 'En revanche, le second document souligne [limite/risque].', english: 'In contrast, the second document underlines [limit/risk].' },
  { id: 'syn-doc2-alt', section: 'synthesis', category: 'doc2', french: 'À l’inverse, le second texte attire l’attention sur [problème].', english: 'Conversely, the second text draws attention to [problem].' },
  { id: 'syn-whereas', section: 'synthesis', category: 'contrast', french: 'Alors que le premier texte défend [idée], le second met en garde contre [risque].', english: 'While the first text supports [idea], the second warns against [risk].' },
  { id: 'syn-neutral-link', section: 'synthesis', category: 'contrast', french: 'Ces deux points de vue montrent la nécessité de trouver un équilibre.', english: 'These two viewpoints show the need to find a balance.' },

  // Position
  { id: 'pos-my-view', section: 'position', category: 'opinion', french: 'À mon avis, [thème] peut être bénéfique à condition d’être bien encadré.', english: 'In my opinion, [theme] can be beneficial if it is well supervised.' },
  { id: 'pos-convinced', section: 'position', category: 'opinion', french: 'Je suis convaincu(e) que cette pratique mérite d’être encouragée avec prudence.', english: 'I am convinced this practice deserves to be encouraged carefully.' },
  { id: 'pos-nuanced', section: 'position', category: 'opinion', french: 'Pour ma part, j’adopte une position nuancée.', english: 'For my part, I take a nuanced position.' },
  { id: 'arg-first', section: 'position', category: 'argument', french: 'Tout d’abord, cette solution permet de [avantage concret].', english: 'First, this solution makes it possible to [concrete benefit].' },
  { id: 'arg-moreover', section: 'position', category: 'argument', french: 'De plus, elle favorise [deuxième avantage], ce qui est essentiel aujourd’hui.', english: 'Moreover, it promotes [second benefit], which is essential today.' },
  { id: 'arg-example', section: 'position', category: 'example', french: 'Par exemple, [exemple concret] illustre bien cet avantage.', english: 'For example, [concrete example] clearly illustrates this advantage.' },
  { id: 'arg-limit', section: 'position', category: 'nuance', french: 'Cependant, il ne faut pas ignorer les risques liés à [limite].', english: 'However, we must not ignore the risks linked to [limit].' },
  { id: 'arg-true-but', section: 'position', category: 'nuance', french: 'Il est vrai que [contre-argument], mais ces difficultés peuvent être réduites par [solution].', english: 'It is true that [counterargument], but these difficulties can be reduced through [solution].' },
  { id: 'arg-solution', section: 'position', category: 'solution', french: 'Pour limiter ces effets négatifs, il serait judicieux de [solution concrète].', english: 'To limit these negative effects, it would be wise to [concrete solution].' },
  { id: 'arg-balance', section: 'position', category: 'solution', french: 'La clé réside donc dans un usage raisonnable et adapté aux besoins de chacun.', english: 'The key therefore lies in reasonable use adapted to each person’s needs.' },
  { id: 'concl-sum', section: 'position', category: 'conclusion', french: 'En somme, [thème] peut devenir une option positive si l’on respecte certaines limites.', english: 'All in all, [theme] can become a positive option if certain limits are respected.' },
  { id: 'concl-final', section: 'position', category: 'conclusion', french: 'En définitive, cette réflexion montre qu’un équilibre entre avantages et contraintes est indispensable.', english: 'Ultimately, this reflection shows that a balance between benefits and constraints is essential.' },
];

const legacyTache3TrainerTasks: Tache3TrainerTask[] = [
  {
    id: 'pdf-pets-family',
    title: 'La présence d’un animal domestique en famille',
    theme: 'la présence d’un animal domestique en famille',
    position: 'balanced-positive',
    prompt: 'Résumez les deux points de vue, puis donnez votre opinion sur la présence d’un animal domestique dans une famille.',
    doc1View: 'L’animal renforce l’affection, la responsabilité des enfants, l’empathie et la cohésion familiale.',
    doc2View: 'L’adoption exige du temps, de l’argent, de l’espace et une bonne répartition des tâches.',
    document1: 'Accueillir un animal domestique crée une atmosphère chaleureuse. Il offre du réconfort, responsabilise les enfants et renforce les liens familiaux grâce aux jeux, aux soins et aux moments d’affection partagés.',
    document2: 'Intégrer un animal dans une famille demande réflexion. Les coûts, les soins vétérinaires, l’espace, les allergies et la répartition des responsabilités peuvent créer des contraintes ou des tensions.',
    expectedIdeas: [
      { label: 'Bénéfices familiaux', keywords: ['responsabilité', 'empathie', 'cohésion', 'réconfort', 'famille'] },
      { label: 'Contraintes pratiques', keywords: ['coût', 'temps', 'allergies', 'espace', 'organisation'] },
      { label: 'Opinion encadrée', keywords: ['condition', 'réflexion', 'organisation', 'équilibre', 'limites'] },
    ],
  },
  {
    id: 'pdf-homework',
    title: 'L’importance des devoirs scolaires',
    theme: 'les devoirs scolaires',
    position: 'nuanced',
    prompt: 'Résumez les deux textes, puis expliquez si les devoirs scolaires sont utiles selon vous.',
    doc1View: 'Les devoirs consolident les apprentissages, développent l’autonomie et impliquent les parents.',
    doc2View: 'Les devoirs peuvent réduire le temps libre, créer des inégalités et décourager certains élèves.',
    document1: 'Les devoirs aident les élèves à revoir les leçons, consolider les connaissances et développer l’autonomie, la persévérance et l’organisation. Ils permettent aussi aux parents de suivre le travail scolaire.',
    document2: 'Après une longue journée, les devoirs peuvent peser sur les enfants. Ils réduisent les loisirs, accentuent les inégalités familiales et peuvent transformer l’école en contrainte.',
    expectedIdeas: [
      { label: 'Consolidation / autonomie', keywords: ['consolider', 'autonomie', 'organisation', 'mémorisation', 'progresser'] },
      { label: 'Temps libre / inégalités', keywords: ['loisirs', 'repos', 'inégalités', 'famille', 'décourager'] },
      { label: 'Équilibre / dosage', keywords: ['équilibre', 'dosé', 'adapté', 'pertinent', 'surcharge'] },
    ],
  },
  {
    id: 'pdf-micro-nap',
    title: 'La micro-sieste en entreprise',
    theme: 'la micro-sieste en entreprise',
    position: 'balanced-positive',
    prompt: 'Résumez les avis présentés, puis donnez votre opinion sur la micro-sieste au travail.',
    doc1View: 'La micro-sieste améliore le bien-être, l’énergie, la concentration et parfois la créativité.',
    doc2View: 'Elle pose des problèmes d’organisation, d’espace, d’image professionnelle et d’équité.',
    document1: 'Une courte pause de sommeil peut régénérer l’énergie, clarifier l’esprit, diminuer la fatigue et réduire les erreurs. Cette pratique peut aussi améliorer le climat de travail et stimuler la créativité.',
    document2: 'Installer une micro-sieste au travail demande un espace adapté et une organisation précise. Certains métiers ne s’y prêtent pas, et des réticences culturelles peuvent l’associer à un manque de sérieux.',
    expectedIdeas: [
      { label: 'Bien-être / productivité', keywords: ['bien-être', 'énergie', 'concentration', 'productivité', 'créativité'] },
      { label: 'Organisation / image', keywords: ['organisation', 'espace', 'sérieux', 'métier', 'équité'] },
      { label: 'Encadrement', keywords: ['encadré', 'règles', 'durée', 'adapté', 'conditions'] },
    ],
  },
  {
    id: 'pdf-video-games',
    title: 'Les jeux vidéo dans le quotidien des enfants',
    theme: 'les jeux vidéo chez les enfants',
    position: 'balanced-positive',
    prompt: 'Résumez les deux documents, puis dites si les jeux vidéo peuvent avoir une place dans le quotidien des enfants.',
    doc1View: 'Les jeux vidéo peuvent développer la logique, la mémoire, la coordination et la coopération.',
    doc2View: 'Un usage excessif peut nuire au sommeil, à l’activité physique, à la concentration et aux relations directes.',
    document1: 'Avec discernement, les jeux vidéo peuvent développer la logique, la mémoire, la coordination et la coopération. Certains jeux éducatifs stimulent la curiosité et offrent des moments de détente.',
    document2: 'Une utilisation trop fréquente inquiète les parents. Elle peut réduire l’activité physique, perturber le sommeil, exposer à des contenus violents et augmenter le risque d’isolement ou d’addiction.',
    expectedIdeas: [
      { label: 'Compétences / détente', keywords: ['logique', 'coordination', 'coopération', 'éducatif', 'détente'] },
      { label: 'Risques d’excès', keywords: ['excès', 'sommeil', 'isolement', 'addiction', 'écran'] },
      { label: 'Règles / modération', keywords: ['règles', 'modération', 'encadré', 'limites', 'équilibre'] },
    ],
  },
  {
    id: 'pdf-online-shopping',
    title: 'Les achats en ligne',
    theme: 'les achats en ligne',
    position: 'nuanced',
    prompt: 'Résumez les deux points de vue, puis présentez votre opinion sur les achats en ligne.',
    doc1View: 'Le commerce en ligne est pratique, rapide, accessible et permet de comparer une grande variété de produits.',
    doc2View: 'Le magasin physique offre le contact humain, la possibilité d’essayer et une relation de confiance.',
    document1: 'Acheter en ligne simplifie la vie : comparaison des prix, avis, promotions, livraison rapide et accès à des produits variés, parfois introuvables localement.',
    document2: 'Le magasin reste important car il permet de voir, toucher et essayer les articles. Les conseils d’un vendeur, la sécurité et l’expérience humaine rassurent les clients.',
    expectedIdeas: [
      { label: 'Praticité / choix', keywords: ['pratique', 'rapide', 'comparer', 'livraison', 'choix'] },
      { label: 'Contact / sécurité', keywords: ['contact', 'essayer', 'vendeur', 'sécurité', 'confiance'] },
      { label: 'Consommation responsable', keywords: ['responsable', 'impulsif', 'besoin', 'écologique', 'équilibre'] },
    ],
  },
  {
    id: 'pdf-roommates',
    title: 'La vie en colocation',
    theme: 'la colocation',
    position: 'balanced-negative',
    prompt: 'Résumez les documents, puis donnez votre avis sur la vie en colocation.',
    doc1View: 'La colocation réduit les coûts, favorise l’entraide, la convivialité et l’apprentissage de la coopération.',
    doc2View: 'Elle peut provoquer des tensions liées au bruit, aux habitudes, aux responsabilités et au manque d’intimité.',
    document1: 'La colocation attire les étudiants et jeunes actifs car elle permet de partager les frais et les responsabilités. Elle favorise la convivialité, la solidarité et parfois des amitiés durables.',
    document2: 'Vivre avec d’autres personnes exige des compromis. Les différences d’habitudes, le bruit, le manque d’intimité ou une mauvaise répartition des tâches peuvent créer des conflits.',
    expectedIdeas: [
      { label: 'Économie / convivialité', keywords: ['économique', 'frais', 'convivialité', 'entraide', 'solidarité'] },
      { label: 'Tensions / intimité', keywords: ['tensions', 'bruit', 'intimité', 'responsabilités', 'conflits'] },
      { label: 'Règles communes', keywords: ['règles', 'communication', 'respect', 'organisation', 'compromis'] },
    ],
  },
  {
    id: 'pdf-countryside',
    title: 'Le cadre de vie à la campagne',
    theme: 'la vie à la campagne',
    position: 'nuanced',
    prompt: 'Résumez les avantages et limites présentés, puis donnez votre opinion sur la vie à la campagne.',
    doc1View: 'La campagne offre calme, air pur, nature, relations de voisinage et simplicité.',
    doc2View: 'Elle implique moins de services, des transports difficiles, moins d’emplois et parfois de l’isolement.',
    document1: 'Vivre à la campagne permet de profiter d’un environnement naturel, d’un rythme plus calme, d’aliments locaux et de relations de voisinage plus chaleureuses.',
    document2: 'La campagne demande une adaptation : services éloignés, transports rares, emploi limité, loisirs moins nombreux et entretien plus exigeant d’une maison isolée.',
    expectedIdeas: [
      { label: 'Nature / calme', keywords: ['nature', 'calme', 'air', 'voisinage', 'simplicité'] },
      { label: 'Services / transport', keywords: ['services', 'transport', 'emploi', 'loisirs', 'éloigné'] },
      { label: 'Choix personnel', keywords: ['besoins', 'adaptation', 'organisation', 'équilibre', 'priorités'] },
    ],
  },
  {
    id: 'pdf-green-spaces',
    title: 'Les espaces verts en ville',
    theme: 'les espaces verts en ville',
    position: 'support',
    prompt: 'Résumez les deux points de vue, puis expliquez si les villes devraient développer davantage les espaces verts.',
    doc1View: 'Les espaces verts améliorent le bien-être, la biodiversité, les activités physiques et la convivialité.',
    doc2View: 'Ils se heurtent à la pression immobilière, aux coûts d’entretien et aux inégalités d’accès.',
    document1: 'Les parcs et jardins publics offrent détente, activités physiques, biodiversité et lien avec la nature. Ils réduisent le stress et favorisent les rencontres entre habitants.',
    document2: 'Les espaces verts se raréfient sous la pression immobilière. Leur création et leur entretien coûtent cher, et tous les quartiers n’y ont pas accès de manière égale.',
    expectedIdeas: [
      { label: 'Bien-être / biodiversité', keywords: ['bien-être', 'biodiversité', 'nature', 'stress', 'convivialité'] },
      { label: 'Pression immobilière / coût', keywords: ['immobilier', 'coût', 'entretien', 'inégalités', 'quartiers'] },
      { label: 'Priorité urbaine', keywords: ['priorité', 'ville', 'politique', 'équilibre', 'qualité'] },
    ],
  },
];

export const tache3TrainerTasks: Tache3TrainerTask[] = januaryTache3TrainerTasks;
