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
  // Salutations et ouverture
  { id: 'opening-salut', category: 'opening', french: 'Salut [prénom],', english: 'Hi [name],', cloze: 'Salut ___,' },
  { id: 'opening-bonjour', category: 'opening', french: 'Bonjour [prénom],', english: 'Hello [name],', cloze: 'Bonjour ___,' },
  { id: 'opening-hope', category: 'opening', french: 'J’espère que tu vas bien.', english: 'I hope you are doing well.', cloze: 'J’espère que ___ vas bien.' },
  { id: 'opening-how-are-you', category: 'opening', french: 'Comment vas-tu ? J’ai pensé à toi récemment.', english: 'How are you? I thought of you recently.', cloze: 'Comment vas-tu ? J’ai ___ à toi récemment.' },
  { id: 'opening-reply', category: 'opening', french: 'Merci pour ton message.', english: 'Thanks for your message.', cloze: 'Merci pour ___ message.' },

  // Introduction générale
  { id: 'purpose-talk', category: 'purpose', french: 'Je t’écris pour te parler de...', english: 'I’m writing to tell you about...', cloze: 'Je t’écris pour te ___ de...' },
  { id: 'purpose-share', category: 'purpose', french: 'Je voulais partager une idée avec toi.', english: 'I wanted to share an idea with you.', cloze: 'Je voulais ___ une idée avec toi.' },
  { id: 'purpose-discover', category: 'purpose', french: 'Je viens de découvrir quelque chose qui pourrait te plaire.', english: 'I just discovered something you might like.', cloze: 'Je viens de ___ quelque chose qui pourrait te plaire.' },
  { id: 'purpose-interest', category: 'purpose', french: 'J’ai une proposition qui pourrait t’intéresser.', english: 'I have a proposal that might interest you.', cloze: 'J’ai une ___ qui pourrait t’intéresser.' },
  { id: 'purpose-opinion', category: 'purpose', french: 'Je voulais te demander ton avis sur...', english: 'I wanted to ask your opinion about...', cloze: 'Je voulais te demander ton ___ sur...' },
  { id: 'purpose-announce', category: 'purpose', french: 'Je t’écris pour t’annoncer une excellente nouvelle.', english: 'I’m writing to tell you some excellent news.', cloze: 'Je t’écris pour t’___ une excellente nouvelle.' },

  // Invitations / propositions
  { id: 'invite-would-you', category: 'invitation', french: 'Que dirais-tu de [activité] ce week-end ?', english: 'How about [activity] this weekend?', cloze: 'Que ___-tu de [activité] ce week-end ?' },
  { id: 'invite-organize', category: 'invitation', french: 'J’organise [activité] et je serais ravi(e) que tu viennes.', english: 'I’m organizing [activity] and I’d be delighted if you came.', cloze: 'J’organise [activité] et je serais ___ que tu viennes.' },
  { id: 'invite-propose-outing', category: 'invitation', french: 'Je te propose une sortie à [lieu].', english: 'I suggest an outing to [place].', cloze: 'Je te ___ une sortie à [lieu].' },
  { id: 'invite-available', category: 'invitation', french: 'Si tu es disponible, rejoins-moi à [lieu] à [heure].', english: 'If you are available, join me at [place] at [time].', cloze: 'Si tu es disponible, ___-moi à [lieu] à [heure].' },
  { id: 'invite-perfect', category: 'invitation', french: 'C’est l’occasion parfaite de passer un moment ensemble.', english: 'It is the perfect opportunity to spend time together.', cloze: 'C’est l’occasion ___ de passer un moment ensemble.' },
  { id: 'invite-super', category: 'invitation', french: 'Ce serait super de te voir là-bas.', english: 'It would be great to see you there.', cloze: 'Ce serait ___ de te voir là-bas.' },
  { id: 'invite-adore', category: 'invitation', french: 'Je suis sûr(e) que tu vas adorer.', english: 'I’m sure you will love it.', cloze: 'Je suis ___ que tu vas adorer.' },

  // Détails / activités
  { id: 'details-program', category: 'details', french: 'Au programme : [activités].', english: 'On the program: [activities].', cloze: 'Au ___ : [activités].' },
  { id: 'details-could-do', category: 'details', french: 'Nous pourrions faire [activité] et ensuite profiter de [lieu].', english: 'We could do [activity] and then enjoy [place].', cloze: 'Nous pourrions faire [activité] et ensuite ___ de [lieu].' },
  { id: 'details-day-filled', category: 'details', french: 'Ce serait une journée remplie de moments amusants et relaxants.', english: 'It would be a day full of fun and relaxing moments.', cloze: 'Ce serait une journée ___ de moments amusants et relaxants.' },
  { id: 'details-place-time', category: 'details', french: 'Le rendez-vous est prévu à [lieu] à [heure].', english: 'The meeting is planned at [place] at [time].', cloze: 'Le rendez-vous est ___ à [lieu] à [heure].' },

  // Conseils / recommandations
  { id: 'recommend-success', category: 'recommendation', french: 'Si tu veux réussir, je te recommande de...', english: 'If you want to succeed, I recommend that you...', cloze: 'Si tu veux réussir, je te ___ de...' },
  { id: 'recommend-strongly', category: 'recommendation', french: 'Je te conseille vivement de...', english: 'I strongly advise you to...', cloze: 'Je te ___ vivement de...' },
  { id: 'recommend-good-idea', category: 'recommendation', french: 'Une bonne idée serait de...', english: 'A good idea would be to...', cloze: 'Une bonne idée ___ de...' },
  { id: 'recommend-think', category: 'recommendation', french: 'Pense à [action] pour...', english: 'Remember to [action] in order to...', cloze: 'Pense à [action] ___...' },
  { id: 'recommend-dont-forget', category: 'recommendation', french: 'N’oublie pas de [action].', english: 'Don’t forget to [action].', cloze: 'N’___ pas de [action].' },
  { id: 'recommend-place', category: 'recommendation', french: 'Je te recommande [lieu/service] pour [activité].', english: 'I recommend [place/service] for [activity].', cloze: 'Je te ___ [lieu/service] pour [activité].' },
  { id: 'recommend-ideal', category: 'recommendation', french: 'C’est un endroit idéal pour [objectif].', english: 'It is an ideal place for [goal].', cloze: 'C’est un endroit ___ pour [objectif].' },
  { id: 'recommend-staff', category: 'recommendation', french: 'Le personnel est accueillant, et les tarifs sont raisonnables.', english: 'The staff is welcoming, and the prices are reasonable.', cloze: 'Le personnel est ___, et les tarifs sont raisonnables.' },
  { id: 'recommend-try', category: 'recommendation', french: 'Tu pourrais aussi essayer [autre option].', english: 'You could also try [another option].', cloze: 'Tu pourrais aussi ___ [autre option].' },

  // Description / expérience / ressenti
  { id: 'describe-experience', category: 'description', french: 'Je viens de vivre une expérience incroyable !', english: 'I just had an incredible experience!', cloze: 'Je viens de ___ une expérience incroyable !' },
  { id: 'describe-day', category: 'description', french: 'C’était une journée inoubliable à [lieu].', english: 'It was an unforgettable day at [place].', cloze: 'C’était une journée ___ à [lieu].' },
  { id: 'describe-tell', category: 'description', french: 'Je ne pouvais pas attendre pour te raconter ça !', english: 'I couldn’t wait to tell you about it!', cloze: 'Je ne pouvais pas attendre pour te ___ ça !' },
  { id: 'describe-impressive', category: 'description', french: 'Les [aspects spécifiques] étaient particulièrement impressionnants.', english: 'The [specific aspects] were particularly impressive.', cloze: 'Les [aspects spécifiques] étaient particulièrement ___.' },
  { id: 'describe-interesting', category: 'description', french: 'J’ai trouvé ça vraiment intéressant.', english: 'I found it really interesting.', cloze: 'J’ai trouvé ça vraiment ___.' },
  { id: 'describe-marked', category: 'description', french: 'Ce qui m’a le plus marqué, c’est...', english: 'What struck me the most was...', cloze: 'Ce qui m’a le plus ___, c’est...' },
  { id: 'describe-loved', category: 'description', french: 'J’ai adoré [élément], et je pense que tu aimerais aussi.', english: 'I loved [element], and I think you would like it too.', cloze: 'J’ai ___ [élément], et je pense que tu aimerais aussi.' },
  { id: 'describe-organized', category: 'description', french: 'C’était bien organisé et très enrichissant.', english: 'It was well organized and very enriching.', cloze: 'C’était bien ___ et très enrichissant.' },
  { id: 'describe-located', category: 'description', french: 'Il est situé près de [lieu].', english: 'It is located near [place].', cloze: 'Il est ___ près de [lieu].' },
  { id: 'describe-like-most', category: 'description', french: 'Ce qui me plaît le plus, c’est...', english: 'What I like the most is...', cloze: 'Ce qui me ___ le plus, c’est...' },

  // Demandes / questions
  { id: 'request-advice', category: 'request', french: 'Aurais-tu des conseils sur... ?', english: 'Would you have any advice about...?', cloze: 'Aurais-tu des ___ sur... ?' },
  { id: 'request-recommend', category: 'request', french: 'Pourrais-tu me recommander [quelque chose] ?', english: 'Could you recommend [something] to me?', cloze: 'Pourrais-tu me ___ [quelque chose] ?' },
  { id: 'request-opinion', category: 'request', french: 'J’aimerais avoir ton avis sur...', english: 'I would like to have your opinion about...', cloze: 'J’aimerais avoir ton ___ sur...' },
  { id: 'request-know', category: 'request', french: 'Est-ce que tu connais [lieu/service] ?', english: 'Do you know [place/service]?', cloze: 'Est-ce que tu ___ [lieu/service] ?' },
  { id: 'request-help-choice', category: 'request', french: 'Peux-tu m’aider à choisir entre [options] ?', english: 'Can you help me choose between [options]?', cloze: 'Peux-tu m’___ à choisir entre [options] ?' },
  { id: 'request-help', category: 'request', french: 'Peux-tu m’aider à trouver une solution ?', english: 'Can you help me find a solution?', cloze: 'Peux-tu m’___ à trouver une solution ?' },

  // Projet / idée
  { id: 'project-good-idea', category: 'details', french: 'J’ai pensé que ce serait une bonne idée de...', english: 'I thought it would be a good idea to...', cloze: 'J’ai pensé que ce serait une bonne ___ de...' },
  { id: 'project-organize', category: 'details', french: 'J’aimerais organiser [activité], et je voulais t’en parler.', english: 'I would like to organize [activity], and I wanted to tell you about it.', cloze: 'J’aimerais ___ [activité], et je voulais t’en parler.' },
  { id: 'project-what-if', category: 'details', french: 'Et si nous faisions [activité] ensemble ?', english: 'What if we did [activity] together?', cloze: 'Et si nous ___ [activité] ensemble ?' },
  { id: 'project-date', category: 'details', french: 'Nous pourrions faire cela à [lieu] à [date].', english: 'We could do this at [place] on [date].', cloze: 'Nous pourrions faire cela à [lieu] à [date].' },
  { id: 'project-ideas', category: 'details', french: 'J’ai déjà quelques idées pour [aspect du projet].', english: 'I already have some ideas for [project aspect].', cloze: 'J’ai déjà quelques ___ pour [aspect du projet].' },

  // Conclusion / réponse
  { id: 'reply-interested', category: 'reply', french: 'Fais-moi savoir si tu es intéressé(e).', english: 'Let me know if you are interested.', cloze: 'Fais-moi ___ si tu es intéressé(e).' },
  { id: 'reply-opinion', category: 'reply', french: 'Dis-moi ce que tu en penses.', english: 'Tell me what you think about it.', cloze: 'Dis-moi ce que tu en ___.' },
  { id: 'reply-wait', category: 'reply', french: 'J’attends ton retour avec impatience.', english: 'I look forward to your reply.', cloze: 'J’attends ton ___ avec impatience.' },
  { id: 'reply-questions', category: 'reply', french: 'N’hésite pas à m’écrire si tu as des questions.', english: 'Don’t hesitate to write to me if you have questions.', cloze: 'N’hésite pas à m’___ si tu as des questions.' },
  { id: 'reply-suggestions', category: 'reply', french: 'Dis-moi si ça te convient, ou si tu as d’autres suggestions.', english: 'Tell me if that works for you, or if you have other suggestions.', cloze: 'Dis-moi si ça te ___, ou si tu as d’autres suggestions.' },

  // Clôture
  { id: 'closing-soon', category: 'closing', french: 'À bientôt,', english: 'See you soon,', cloze: 'À ___,' },
  { id: 'closing-read', category: 'closing', french: 'Au plaisir de te lire bientôt,', english: 'Looking forward to reading you soon,', cloze: 'Au plaisir de te ___ bientôt,' },
  { id: 'closing-friendly', category: 'closing', french: 'Amicalement,', english: 'Best / friendly regards,', cloze: '___,' },
  { id: 'closing-day', category: 'closing', french: 'Bonne journée,', english: 'Have a good day,', cloze: 'Bonne ___,' },
]

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
