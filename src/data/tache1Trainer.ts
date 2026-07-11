export type Tache1Category =
  | 'invitation'
  | 'description'
  | 'recommendation'
  | 'request'
  | 'coordination'
  | 'announcement'
  | 'complaint';

export type TemplatePhrase = {
  id: string;
  category: 'opening' | 'purpose' | 'invitation' | 'description' | 'recommendation' | 'request' | 'details' | 'reply' | 'closing';
  french: string;
  english: string;
  cloze: string;
};

export type Tache1TrainerTask = {
  id: string;
  title: string;
  prompt: string;
  category: Tache1Category;
  recipient: string;
  tone: 'amical' | 'formel' | 'annonce' | 'service client';
  requiredDetails: {
    label: string;
    keywords: string[];
  }[];
};

export const tache1CategoryLabels: Record<Tache1Category, string> = {
  invitation: 'Inviter / proposer',
  description: 'Décrire',
  recommendation: 'Recommander / conseiller',
  request: 'Demander de l’aide',
  coordination: 'Organiser / coordonner',
  announcement: 'Annoncer / raconter',
  complaint: 'Signaler un problème',
};

export const tache1TemplatePhrases: TemplatePhrase[] = [
  {
    id: 'opening-hope',
    category: 'opening',
    french: 'J’espère que tu vas bien.',
    english: 'I hope you are doing well.',
    cloze: 'J’espère que ___ vas bien.',
  },
  {
    id: 'opening-reply',
    category: 'opening',
    french: 'Merci pour ton message.',
    english: 'Thanks for your message.',
    cloze: 'Merci pour ___ message.',
  },
  {
    id: 'purpose-talk',
    category: 'purpose',
    french: 'Je t’écris pour te parler de...',
    english: 'I’m writing to tell you about...',
    cloze: 'Je t’écris pour te ___ de...',
  },
  {
    id: 'purpose-announce',
    category: 'purpose',
    french: 'Je t’écris pour t’annoncer une excellente nouvelle.',
    english: 'I’m writing to tell you some excellent news.',
    cloze: 'Je t’écris pour t’___ une excellente nouvelle.',
  },
  {
    id: 'invite-would-you',
    category: 'invitation',
    french: 'Que dirais-tu de venir avec moi ?',
    english: 'How about coming with me?',
    cloze: 'Que ___-tu de venir avec moi ?',
  },
  {
    id: 'invite-propose',
    category: 'invitation',
    french: 'Je te propose de nous retrouver à...',
    english: 'I suggest we meet at...',
    cloze: 'Je te ___ de nous retrouver à...',
  },
  {
    id: 'details-program',
    category: 'details',
    french: 'Au programme : musique, jeux et repas convivial.',
    english: 'On the program: music, games and a friendly meal.',
    cloze: 'Au ___ : musique, jeux et repas convivial.',
  },
  {
    id: 'details-place-time',
    category: 'details',
    french: 'Le rendez-vous est prévu samedi à 14 h.',
    english: 'The meeting is planned for Saturday at 2 p.m.',
    cloze: 'Le rendez-vous est ___ samedi à 14 h.',
  },
  {
    id: 'describe-like-most',
    category: 'description',
    french: 'Ce qui me plaît le plus, c’est...',
    english: 'What I like the most is...',
    cloze: 'Ce qui me ___ le plus, c’est...',
  },
  {
    id: 'describe-located',
    category: 'description',
    french: 'Il est situé près du centre-ville.',
    english: 'It is located near downtown.',
    cloze: 'Il est ___ près du centre-ville.',
  },
  {
    id: 'recommend-strongly',
    category: 'recommendation',
    french: 'Je te conseille vivement de...',
    english: 'I strongly advise you to...',
    cloze: 'Je te ___ vivement de...',
  },
  {
    id: 'recommend-ideal',
    category: 'recommendation',
    french: 'C’est un endroit idéal pour...',
    english: 'It is an ideal place for...',
    cloze: 'C’est un endroit ___ pour...',
  },
  {
    id: 'request-help',
    category: 'request',
    french: 'Peux-tu m’aider à trouver une solution ?',
    english: 'Can you help me find a solution?',
    cloze: 'Peux-tu m’___ à trouver une solution ?',
  },
  {
    id: 'request-advice',
    category: 'request',
    french: 'Aurais-tu des conseils à me donner ?',
    english: 'Would you have any advice to give me?',
    cloze: 'Aurais-tu des ___ à me donner ?',
  },
  {
    id: 'reply-let-me-know',
    category: 'reply',
    french: 'Fais-moi savoir si tu es disponible.',
    english: 'Let me know if you are available.',
    cloze: 'Fais-moi ___ si tu es disponible.',
  },
  {
    id: 'reply-opinion',
    category: 'reply',
    french: 'Dis-moi ce que tu en penses.',
    english: 'Tell me what you think about it.',
    cloze: 'Dis-moi ce que tu en ___.',
  },
  {
    id: 'closing-soon',
    category: 'closing',
    french: 'À très bientôt,',
    english: 'See you very soon,',
    cloze: 'À très ___,',
  },
  {
    id: 'closing-read',
    category: 'closing',
    french: 'Au plaisir de te lire bientôt,',
    english: 'Looking forward to reading you soon,',
    cloze: 'Au plaisir de te ___ bientôt,',
  },
];

export const tache1TrainerTasks: Tache1TrainerTask[] = [
  {
    id: 'jan-1-university',
    title: 'Nouvelle université',
    category: 'description',
    recipient: 'Alex, un ami',
    tone: 'amical',
    prompt:
      'Alex vous demande comment est votre nouvelle université. Répondez-lui en décrivant les professeurs, les étudiants, les activités et votre impression générale.',
    requiredDetails: [
      { label: 'Professeurs', keywords: ['professeur', 'prof', 'cours', 'enseignant'] },
      { label: 'Étudiants', keywords: ['étudiant', 'camarade', 'classe', 'groupe'] },
      { label: 'Activités / campus', keywords: ['activité', 'campus', 'bibliothèque', 'sport', 'club'] },
    ],
  },
  {
    id: 'jan-2-new-job',
    title: 'Nouveau travail',
    category: 'announcement',
    recipient: 'un ami francophone',
    tone: 'amical',
    prompt:
      'Vous avez trouvé un nouveau travail. Écrivez à votre ami(e) francophone pour annoncer la nouvelle et décrire votre poste, vos collègues et votre lieu de travail.',
    requiredDetails: [
      { label: 'Poste', keywords: ['poste', 'travail', 'emploi', 'assistant', 'responsable'] },
      { label: 'Collègues', keywords: ['collègue', 'équipe', 'sympa', 'accueillant'] },
      { label: 'Lieu de travail', keywords: ['bureau', 'entreprise', 'centre-ville', 'lieu', 'locaux'] },
    ],
  },
  {
    id: 'jan-3-day-out',
    title: 'Journée ensemble',
    category: 'invitation',
    recipient: 'un ami',
    tone: 'amical',
    prompt:
      'Écrivez un courriel à votre ami pour l’inviter à passer une journée avec vous. Donnez le lieu, la date et les activités prévues.',
    requiredDetails: [
      { label: 'Lieu', keywords: ['lieu', 'parc', 'ville', 'centre', 'musée'] },
      { label: 'Date / heure', keywords: ['samedi', 'dimanche', 'heure', 'h', 'date'] },
      { label: 'Activités', keywords: ['activité', 'promenade', 'déjeuner', 'visiter', 'café'] },
    ],
  },
  {
    id: 'jan-4-house-care',
    title: 'Garder la maison',
    category: 'coordination',
    recipient: 'Cédric, un ami',
    tone: 'amical',
    prompt:
      'Votre ami Cédric a accepté de garder votre maison et votre jardin pendant vos vacances. Écrivez-lui un message pour lui dire ce qu’il doit faire.',
    requiredDetails: [
      { label: 'Maison', keywords: ['maison', 'porte', 'fenêtre', 'courrier'] },
      { label: 'Jardin', keywords: ['jardin', 'plante', 'arroser', 'pelouse'] },
      { label: 'Consignes pratiques', keywords: ['clé', 'jour', 'merci', 'appeler'] },
    ],
  },
  {
    id: 'jan-5-sport-together',
    title: 'Faire du sport',
    category: 'invitation',
    recipient: 'un ami',
    tone: 'amical',
    prompt:
      'Vous souhaitez faire du sport et vous voulez que votre ami vous accompagne. Écrivez-lui un message pour lui proposer de pratiquer ensemble.',
    requiredDetails: [
      { label: 'Sport proposé', keywords: ['sport', 'courir', 'salle', 'natation', 'football'] },
      { label: 'Moment', keywords: ['samedi', 'dimanche', 'soir', 'matin', 'semaine'] },
      { label: 'Motivation', keywords: ['ensemble', 'motivant', 'forme', 'santé'] },
    ],
  },
  {
    id: 'jan-6-hotel',
    title: 'Hôtel pour les vacances',
    category: 'recommendation',
    recipient: 'vos amis',
    tone: 'amical',
    prompt:
      'Vous partez en vacances avec vos amis et vous avez trouvé un hôtel. Décrivez cet hôtel : localisation, prix, équipements, puis proposez de le réserver.',
    requiredDetails: [
      { label: 'Localisation', keywords: ['situé', 'près', 'centre', 'plage', 'gare'] },
      { label: 'Prix', keywords: ['prix', 'tarif', 'coûte', 'dollars', 'euros'] },
      { label: 'Équipements', keywords: ['wifi', 'piscine', 'chambre', 'petit-déjeuner', 'service'] },
    ],
  },
  {
    id: 'jan-9-end-year-party',
    title: 'Fête de fin d’année',
    category: 'invitation',
    recipient: 'vos amis',
    tone: 'amical',
    prompt: 'Écrivez un message pour inviter vos amis à une fête de fin d’année. Précisez le lieu, la date, le programme et ce que chacun peut apporter.',
    requiredDetails: [
      { label: 'Lieu / date', keywords: ['chez', 'samedi', 'dimanche', 'date', 'heure'] },
      { label: 'Programme', keywords: ['musique', 'jeux', 'repas', 'danser', 'soirée'] },
      { label: 'À apporter', keywords: ['apporter', 'plat', 'boisson', 'dessert'] },
    ],
  },
  {
    id: 'jan-18-housing-help',
    title: 'Aide pour logement',
    category: 'request',
    recipient: 'un ami francophone',
    tone: 'amical',
    prompt:
      'Envoyez un courriel à votre ami francophone afin de lui demander de l’aide pour la recherche d’un logement. Donnez le type de logement, le budget et la date.',
    requiredDetails: [
      { label: 'Type de logement', keywords: ['studio', 'appartement', 'chambre', 'logement'] },
      { label: 'Budget', keywords: ['budget', 'loyer', 'prix', 'dollars', 'euros'] },
      { label: 'Date', keywords: ['date', 'mois', 'septembre', 'bientôt', 'arriver'] },
    ],
  },
  {
    id: 'jan-25-bike-sale',
    title: 'Vélo à vendre',
    category: 'description',
    recipient: 'Mathieu, acheteur potentiel',
    tone: 'amical',
    prompt:
      'Mathieu cherche un vélo en bon état et bon marché. Vous avez un vélo à vendre. Écrivez-lui pour décrire le vélo, proposer un prix et fixer un rendez-vous pour l’essayer.',
    requiredDetails: [
      { label: 'Description du vélo', keywords: ['vélo', 'état', 'neuf', 'freins', 'taille'] },
      { label: 'Prix', keywords: ['prix', 'coûte', 'dollars', 'euros'] },
      { label: 'Rendez-vous', keywords: ['rendez-vous', 'essayer', 'samedi', 'heure'] },
    ],
  },
  {
    id: 'jan-37-broken-order',
    title: 'Objet cassé',
    category: 'complaint',
    recipient: 'service clientèle',
    tone: 'service client',
    prompt:
      'Vous avez commandé un objet sur Internet et il est arrivé cassé. Écrivez au service clientèle pour signaler le problème, décrire le dommage et préciser la solution attendue.',
    requiredDetails: [
      { label: 'Problème', keywords: ['cassé', 'endommagé', 'problème', 'colis'] },
      { label: 'Description du dommage', keywords: ['écran', 'pièce', 'fissure', 'ne fonctionne pas'] },
      { label: 'Solution attendue', keywords: ['remboursement', 'échange', 'remplacer', 'solution'] },
    ],
  },
];
