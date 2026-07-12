export type GrammarLesson = {
  id: string;
  priority: 'highest' | 'high' | 'medium';
  title: string;
  subtitle: string;
  tcfUse: string;
  coreRules: string[];
  examples: {
    wrong?: string;
    correct: string;
    note: string;
  }[];
  chunks: string[];
  writingMove: string;
  drills: {
    prompt: string;
    answer: string;
    explanation: string;
  }[];
};

export const grammarLessons: GrammarLesson[] = [
  {
    id: 'verb-constructions-a-de',
    priority: 'highest',
    title: 'Verb Constructions: à / de / direct object',
    subtitle: 'Stop translating verb patterns from English. Learn the French verb chunk.',
    tcfUse: 'This is the highest-impact topic for TCF writing because one wrong preposition can make a B2 sentence sound unnatural or grammatically broken.',
    coreRules: [
      'Learn the verb + preposition as one unit: penser à, réussir à, commencer à, décider de, remercier de, sortir de.',
      'Some verbs connect directly to an object: aimer quelque chose, visiter un musée, chercher une solution.',
      'Some verbs need an indirect object: parler à quelqu’un, proposer à quelqu’un de faire quelque chose.',
      'When the same verb is followed by an infinitive, keep its required preposition: décider de partir, réussir à finir, commencer à travailler.',
    ],
    examples: [
      { wrong: 'Je pense de cette solution.', correct: 'Je pense à cette solution.', note: 'penser à + noun / person / idea.' },
      { wrong: 'J’ai décidé à participer.', correct: 'J’ai décidé de participer.', note: 'décider de + infinitif.' },
      { wrong: 'Il a proposé son ami de venir.', correct: 'Il a proposé à son ami de venir.', note: 'proposer à quelqu’un de + infinitif.' },
      { wrong: 'Elle a réussi de terminer.', correct: 'Elle a réussi à terminer.', note: 'réussir à + infinitif.' },
      { correct: 'Je remercie la municipalité de proposer cette activité.', note: 'remercier quelqu’un de + infinitif/noun.' },
    ],
    chunks: ['penser à', 'réussir à', 'commencer à', 'décider de', 'remercier de', 'sortir de', 'proposer à quelqu’un de + infinitif', 'chercher une solution', 'résoudre un problème'],
    writingMove: 'In Tâche 2 and 3, use these chunks to express action clearly: “J’ai décidé de limiter les écrans”, “Cette mesure permet de réussir à mieux organiser son temps”.',
    drills: [
      { prompt: 'Correct: Je commence de comprendre le problème.', answer: 'Je commence à comprendre le problème.', explanation: 'commencer à + infinitif.' },
      { prompt: 'Correct: Elle propose ses collègues participer.', answer: 'Elle propose à ses collègues de participer.', explanation: 'proposer à quelqu’un de + infinitif.' },
      { prompt: 'Complete: Les élèves réussissent ___ progresser grâce aux devoirs.', answer: 'à', explanation: 'réussir à + infinitif.' },
      { prompt: 'Complete: J’ai décidé ___ faire plus de sport.', answer: 'de', explanation: 'décider de + infinitif.' },
    ],
  },
  {
    id: 'infinitive-constructions',
    priority: 'highest',
    title: 'Infinitive Constructions',
    subtitle: 'After à/de/modal verbs, use the infinitive — not a conjugated verb.',
    tcfUse: 'This fixes a very common writing error: using “tu/je/il + conjugated verb” after de or à instead of a clean infinitive.',
    coreRules: [
      'Modal/desire verbs usually take an infinitive directly: vouloir faire, pouvoir faire, aimer faire, souhaiter faire.',
      'After prepositions à and de, use the infinitive: de venir, à faire, de participer.',
      'Do not write a subject pronoun after de/à unless you start a new clause with que.',
      'If you need a new subject, use que + conjugated verb: Je veux que tu viennes. Otherwise: Je veux venir.',
    ],
    examples: [
      { wrong: 'Je souhaite que participer.', correct: 'Je souhaite participer.', note: 'souhaiter + infinitif when the subject is the same.' },
      { wrong: 'Il est important de tu venir.', correct: 'Il est important de venir.', note: 'de + infinitif.' },
      { wrong: 'Ils peuvent participent.', correct: 'Ils peuvent participer.', note: 'pouvoir + infinitif.' },
      { correct: 'Je voudrais améliorer mon français.', note: 'vouloir/voudrais + infinitif.' },
      { correct: 'Je veux que tu viennes.', note: 'Use que + conjugated verb only when the subject changes.' },
    ],
    chunks: ['vouloir faire', 'aimer faire', 'souhaiter faire', 'pouvoir faire', 'essayer de faire', 'permettre de faire', 'aider à faire', 'apprendre à faire'],
    writingMove: 'Use infinitives to make B2 arguments compact: “Cette initiative permet de réduire le stress et d’améliorer la concentration.”',
    drills: [
      { prompt: 'Correct: Cette activité permet de les enfants apprennent.', answer: 'Cette activité permet aux enfants d’apprendre. / Cette activité permet d’apprendre.', explanation: 'permettre à quelqu’un de + infinitif; de + infinitif.' },
      { prompt: 'Correct: Je voudrais que participer à cet atelier.', answer: 'Je voudrais participer à cet atelier.', explanation: 'Same subject → infinitive.' },
      { prompt: 'Complete: Les parents peuvent ___ des règles claires.', answer: 'établir', explanation: 'pouvoir + infinitif.' },
      { prompt: 'Correct: Il faut de trouver un équilibre.', answer: 'Il faut trouver un équilibre.', explanation: 'falloir + infinitif directly.' },
    ],
  },
  {
    id: 'gender-agreement',
    priority: 'highest',
    title: 'Gender & Agreement',
    subtitle: 'Make nouns, adjectives, pronouns, and participles agree cleanly.',
    tcfUse: 'Agreement errors accumulate quickly in TCF writing. B2 does not require perfection, but your patterns must be mostly controlled.',
    coreRules: [
      'Every noun is masculine or feminine: un problème, une solution, un système, une entrée.',
      'Most adjectives agree in gender and number: intéressant/intéressante/intéressants/intéressantes.',
      'Some adjectives already end in -e and only change in plural: sympa/sympas, utile/utiles, pratique/pratiques.',
      'Pronouns must match the noun: la solution → elle; le système → il.',
      'Advanced: with avoir, the past participle agrees only when the direct object comes before the verb: les erreurs que j’ai corrigées.',
    ],
    examples: [
      { wrong: 'Cette activité est intéressant.', correct: 'Cette activité est intéressante.', note: 'activité is feminine.' },
      { wrong: 'Les participants étaient sympa.', correct: 'Les participants étaient sympas.', note: 'Plural adjective.' },
      { wrong: 'La système est efficace.', correct: 'Le système est efficace.', note: 'système is masculine.' },
      { wrong: 'La solution est simple. Il peut aider.', correct: 'La solution est simple. Elle peut aider.', note: 'Pronoun agrees with solution.' },
      { correct: 'Les fautes que j’ai corrigées étaient importantes.', note: 'Advanced avoir agreement: que = les fautes before the verb.' },
    ],
    chunks: ['une activité intéressante', 'un exemple concret', 'une solution efficace', 'un problème important', 'des idées utiles', 'des participants sympas'],
    writingMove: 'Before submitting, scan every adjective after “une/la/cette” and every plural noun after “les/des/plusieurs”.',
    drills: [
      { prompt: 'Correct: Une exemple concret.', answer: 'Un exemple concret.', explanation: 'exemple is masculine.' },
      { prompt: 'Correct: Cette solution est pratique et utile pour les familles occupé.', answer: 'Cette solution est pratique et utile pour les familles occupées.', explanation: 'familles is feminine plural.' },
      { prompt: 'Choose: un/une entrée', answer: 'une entrée', explanation: 'entrée is feminine.' },
      { prompt: 'Correct: Les activités sont intéressant.', answer: 'Les activités sont intéressantes.', explanation: 'feminine plural agreement.' },
    ],
  },
  {
    id: 'articles-determiners',
    priority: 'high',
    title: 'Articles & Determiners',
    subtitle: 'un/une/le/la/les, de/du/des, and quantity expressions.',
    tcfUse: 'Articles are small but constant. Good article control makes your writing sound much more French.',
    coreRules: [
      'Use indefinite articles for one non-specific thing: un problème, une solution, des activités.',
      'Use definite articles for general categories or known things: les enfants, la société, le stress.',
      'Use de after quantity expressions: beaucoup de temps, peu de personnes, plus de possibilités.',
      'Use du/de la/des for “some” before uncountable or plural nouns: du temps, de la patience, des idées.',
      'plusieurs + plural noun: plusieurs solutions. Special case: plusieurs des solutions = several of the solutions already mentioned.',
    ],
    examples: [
      { wrong: 'Beaucoup des personnes pensent que...', correct: 'Beaucoup de personnes pensent que...', note: 'beaucoup de + noun.' },
      { wrong: 'J’ai besoin de le temps.', correct: 'J’ai besoin de temps. / J’ai besoin du temps disponible.', note: 'de + uncountable; du = de + le when specific.' },
      { wrong: 'Plusieurs de solutions existent.', correct: 'Plusieurs solutions existent.', note: 'plusieurs + plural noun.' },
      { correct: 'Plusieurs des solutions proposées sont réalistes.', note: 'several of the already-mentioned solutions.' },
      { correct: 'Les devoirs peuvent aider les élèves.', note: 'General category → les.' },
    ],
    chunks: ['beaucoup de temps', 'peu de ressources', 'plusieurs solutions', 'plusieurs des exemples', 'la plupart des gens', 'un grand nombre de personnes'],
    writingMove: 'For Tâche 3, use general definite articles: “les élèves”, “les familles”, “la société”, “le gouvernement”.',
    drills: [
      { prompt: 'Correct: Il y a beaucoup des avantages.', answer: 'Il y a beaucoup d’avantages.', explanation: 'beaucoup de + noun; de → d’ before vowel.' },
      { prompt: 'Complete: ___ enfants ont besoin de repos.', answer: 'Les', explanation: 'General category.' },
      { prompt: 'Correct: Plusieurs des personnes aiment cette idée. (general meaning)', answer: 'Plusieurs personnes aiment cette idée.', explanation: 'No des unless referring to a known group.' },
      { prompt: 'Complete: Cela demande peu ___ organisation.', answer: 'd’', explanation: 'peu de + noun; de → d’ before vowel.' },
    ],
  },
  {
    id: 'prepositions',
    priority: 'highest',
    title: 'Prepositions',
    subtitle: 'à, dans, de, chez, sous, près de — small words, big errors.',
    tcfUse: 'Prepositions are essential for location, movement, timing, and fixed expressions in all three writing tasks.',
    coreRules: [
      'à often marks a city/place/activity target: à Toronto, à l’école, arriver à une conclusion.',
      'dans often means inside or after a duration: dans la salle, dans deux jours.',
      'de marks origin/source: sortir de la maison, venir de France, près de chez moi.',
      'chez means at someone’s home/place or within a professional group: chez moi, chez le médecin, chez les jeunes.',
      'Some verbs have fixed prepositions: arriver à un résultat, arriver dans une ville/un pays, sortir de.',
    ],
    examples: [
      { wrong: 'Je suis dans la salle de sport à trois heures. (destination)', correct: 'Je vais à la salle de sport à trois heures.', note: 'à for destination; dans for inside.' },
      { wrong: 'Le parc est proche chez moi.', correct: 'Le parc est près de chez moi.', note: 'Fixed expression: près de chez moi.' },
      { wrong: 'Je sors à la maison.', correct: 'Je sors de la maison.', note: 'sortir de + origin.' },
      { wrong: 'Nous sommes arrivés dans une solution.', correct: 'Nous sommes arrivés à une solution.', note: 'arriver à = reach an abstract result.' },
      { correct: 'Ils sont arrivés dans un nouveau pays.', note: 'arriver dans + country/large place.' },
    ],
    chunks: ['près de chez moi', 'à la salle de sport', 'dans la vie quotidienne', 'sous pression', 'chez les jeunes', 'sortir de la maison', 'arriver à une conclusion', 'arriver dans un pays'],
    writingMove: 'Use location chunks as memorized blocks: “dans notre société actuelle”, “près de chez moi”, “chez les élèves”.',
    drills: [
      { prompt: 'Correct: Le centre est près chez moi.', answer: 'Le centre est près de chez moi.', explanation: 'près de + place/person.' },
      { prompt: 'Complete: Les enfants passent beaucoup de temps ___ les écrans.', answer: 'devant / sur', explanation: 'devant les écrans is most natural; sur les écrans can refer to on screens.' },
      { prompt: 'Correct: Je suis arrivé à Canada.', answer: 'Je suis arrivé au Canada.', explanation: 'arriver au Canada; à + le = au.' },
      { prompt: 'Complete: Cette tendance est fréquente ___ les jeunes.', answer: 'chez', explanation: 'chez + group = among.' },
    ],
  },
  {
    id: 'verb-tenses',
    priority: 'high',
    title: 'Verb Tenses',
    subtitle: 'Present, passé composé, future, conditional, and imparfait for TCF writing.',
    tcfUse: 'Tense control helps you narrate Tâche 2 experiences and argue Tâche 3 opinions without sounding random.',
    coreRules: [
      'Present: facts, opinions, general truths — “Les devoirs aident les élèves.”',
      'Passé composé: completed past events — “J’ai participé à un atelier.”',
      'Use être with movement/reflexive verbs: je suis allé, je suis sorti, je me suis entraîné.',
      'Future simple: future certainty — “Je participerai.”',
      'Conditional: politeness, suggestions, hypothetical solutions — “Il serait utile de…”, “Pourrais-tu…?”',
      'Imparfait: background, habits, descriptions — “L’ambiance était chaleureuse.”',
    ],
    examples: [
      { wrong: 'Hier, je vais au musée.', correct: 'Hier, je suis allé au musée.', note: 'Completed past → passé composé.' },
      { wrong: 'L’ambiance a été chaleureuse pendant toute la soirée. (description)', correct: 'L’ambiance était chaleureuse pendant toute la soirée.', note: 'Description/background → imparfait.' },
      { wrong: 'Tu pourras m’aider ? (polite request)', correct: 'Pourrais-tu m’aider ?', note: 'Conditional is more polite.' },
      { correct: 'Il serait judicieux de proposer des solutions adaptées.', note: 'Conditional for cautious recommendation.' },
      { correct: 'Demain, je participerai à un atelier.', note: 'Future simple.' },
    ],
    chunks: ['j’ai participé à', 'je suis allé(e)', 'l’ambiance était', 'il serait utile de', 'il faudrait', 'nous pourrions', 'cela permettrait de', 'je participerai'],
    writingMove: 'Tâche 2 often needs passé composé for events + imparfait for atmosphere. Tâche 3 often uses present + conditional recommendations.',
    drills: [
      { prompt: 'Correct: Hier, je participe à un cours.', answer: 'Hier, j’ai participé à un cours.', explanation: 'Completed past.' },
      { prompt: 'Choose: pourrais / pourras for polite request: ___-tu expliquer ?', answer: 'Pourrais-tu expliquer ?', explanation: 'Conditional for politeness.' },
      { prompt: 'Complete: L’ambiance ___ conviviale.', answer: 'était', explanation: 'Imparfait for description.' },
      { prompt: 'Correct: Je suis décidé de partir.', answer: 'J’ai décidé de partir.', explanation: 'décider uses avoir in passé composé.' },
    ],
  },
  {
    id: 'pronouns',
    priority: 'highest',
    title: 'Pronouns',
    subtitle: 'le/la/les, lui/leur, me/te/nous/vous, y/en and placement.',
    tcfUse: 'Pronouns make B2 writing smoother, but only if you choose direct vs indirect correctly.',
    coreRules: [
      'Direct object pronouns replace direct objects: je vois le problème → je le vois.',
      'Indirect object pronouns replace à + person: je parle à Marie → je lui parle; je parle aux élèves → je leur parle.',
      'me, te, nous, vous can be direct or indirect depending on the verb.',
      'Pronouns usually go before the conjugated verb: je le comprends, je leur propose.',
      'With infinitives, place the pronoun before the infinitive: je veux le faire, je vais leur parler.',
      'y replaces à + thing/place; en replaces de + thing/quantity.',
    ],
    examples: [
      { wrong: 'Je parle le professeur.', correct: 'Je parle au professeur. / Je lui parle.', note: 'parler à quelqu’un → lui/leur.' },
      { wrong: 'Je lui vois.', correct: 'Je le vois.', note: 'voir quelqu’un is direct → le/la/les.' },
      { wrong: 'Je veux faire le.', correct: 'Je veux le faire.', note: 'Pronoun before infinitive.' },
      { wrong: 'Je pense à cette solution. Je la pense souvent.', correct: 'Je pense à cette solution. J’y pense souvent.', note: 'penser à + thing → y.' },
      { correct: 'J’ai beaucoup d’idées. J’en ai beaucoup.', note: 'en replaces de + quantity.' },
    ],
    chunks: ['je le/la/les comprends', 'je lui/leur propose', 'j’y pense', 'j’en parle', 'cela leur permet de', 'on peut y répondre', 'il faut en tenir compte'],
    writingMove: 'For Tâche 3, use “y” and “en” to avoid repetition: “Il faut en tenir compte”, “On peut y répondre par des règles claires.”',
    drills: [
      { prompt: 'Replace: Je parle aux parents.', answer: 'Je leur parle.', explanation: 'à + plural people → leur.' },
      { prompt: 'Replace: Je comprends le problème.', answer: 'Je le comprends.', explanation: 'Direct masculine singular → le.' },
      { prompt: 'Replace: Je pense à cette question.', answer: 'J’y pense.', explanation: 'à + thing → y.' },
      { prompt: 'Correct: Je vais parler leur.', answer: 'Je vais leur parler.', explanation: 'Pronoun before infinitive.' },
    ],
  },
  {
    id: 'sentence-linking',
    priority: 'medium',
    title: 'Sentence Linking',
    subtitle: 'Connectors for smoother TCF writing — and the et/est trap.',
    tcfUse: 'Connectors make your writing organized and B2-like. They also help you structure Tâche 1, 2, and 3 under time pressure.',
    coreRules: [
      'et = and; est = is. This is a spelling/meaning trap.',
      'Use parce que/car for cause: “car” is slightly more formal and concise.',
      'Use donc for consequence; mais/cependant/pourtant for contrast.',
      'Use sequence connectors: tout d’abord, puis, ensuite, enfin.',
      'Use en plus in informal writing; de plus is better for formal TCF arguments.',
    ],
    examples: [
      { wrong: 'Cette activité et utile.', correct: 'Cette activité est utile.', note: 'est = is.' },
      { wrong: 'Il est fatigué est stressé.', correct: 'Il est fatigué et stressé.', note: 'et = and.' },
      { correct: 'Tout d’abord, cette mesure réduit le stress. De plus, elle améliore la concentration.', note: 'Clean sequence + addition.' },
      { correct: 'Cependant, cette solution exige une bonne organisation.', note: 'Contrast/nuance.' },
      { correct: 'En conclusion, il faut trouver un équilibre.', note: 'Clear closing connector.' },
    ],
    chunks: ['tout d’abord', 'puis', 'ensuite', 'enfin', 'de plus', 'cependant', 'pourtant', 'donc', 'car', 'parce que', 'en conclusion'],
    writingMove: 'Use one connector per paragraph minimum. For Tâche 3: “D’un côté… En revanche… À mon avis… Cependant… En somme…”.',
    drills: [
      { prompt: 'Choose et/est: Cette solution ___ intéressante.', answer: 'est', explanation: 'Verb être.' },
      { prompt: 'Choose et/est: Les enfants ___ les parents participent.', answer: 'et', explanation: 'and.' },
      { prompt: 'Add contrast: Cette idée est utile. Elle coûte cher.', answer: 'Cette idée est utile. Cependant, elle coûte cher.', explanation: 'Cependant introduces contrast.' },
      { prompt: 'Formal replacement for “en plus”:', answer: 'de plus', explanation: 'Better for formal written TCF.' },
    ],
  },
  {
    id: 'vocabulary-precision',
    priority: 'medium',
    title: 'Vocabulary Precision',
    subtitle: 'Avoid literal English translations; choose the natural French word.',
    tcfUse: 'At B2, vocabulary is not only about knowing words — it is about choosing the precise word for the context.',
    coreRules: [
      's’entraîner = train/practice a skill or sport; pratiquer = practice an activity more generally.',
      'système is masculine: un système.',
      'salle de sport = gym; bureau = office/desk; travail = work/job.',
      'entrée can mean entrance or starter; be careful with context.',
      'Use résoudre for solving a problem, détecter for detecting, identifier for identifying.',
    ],
    examples: [
      { wrong: 'Je pratique pour l’examen.', correct: 'Je m’entraîne pour l’examen.', note: 'Training/preparing for exam → s’entraîner.' },
      { wrong: 'Je vais au gym.', correct: 'Je vais à la salle de sport.', note: 'Natural French expression.' },
      { wrong: 'Mon bureau est difficile.', correct: 'Mon travail est difficile.', note: 'bureau = office/desk; travail = work.' },
      { wrong: 'Il faut détecter une solution.', correct: 'Il faut identifier une solution / résoudre le problème.', note: 'detect a problem, identify a solution, solve a problem.' },
      { correct: 'Ce système permet de mieux organiser le travail.', note: 'système is masculine.' },
    ],
    chunks: ['s’entraîner pour un examen', 'pratiquer une activité', 'une salle de sport', 'un système efficace', 'résoudre un problème', 'détecter une erreur', 'identifier une solution', 'au travail'],
    writingMove: 'During revision, replace English-shaped phrases with French chunks: not “prendre une promenade”, but “faire une promenade”.',
    drills: [
      { prompt: 'Correct: Je prends une promenade.', answer: 'Je fais une promenade.', explanation: 'Fixed French expression.' },
      { prompt: 'Choose: résoudre / détecter / identifier une solution', answer: 'identifier une solution', explanation: 'We identify/find a solution; we solve a problem.' },
      { prompt: 'Correct: La système est efficace.', answer: 'Le système est efficace.', explanation: 'système is masculine.' },
      { prompt: 'Translate naturally: gym', answer: 'une salle de sport', explanation: 'Common French expression.' },
    ],
  },
  {
    id: 'fixed-expressions',
    priority: 'medium',
    title: 'Fixed French Expressions',
    subtitle: 'Learn these as chunks, not word-by-word translations.',
    tcfUse: 'Chunks reduce grammar load during the exam. You can reuse them safely in many prompts.',
    coreRules: [
      'Memorize the whole expression with its preposition/article.',
      'Do not translate English collocations word by word.',
      'Prefer reusable TCF chunks: tout d’abord, à titre d’illustration, en conclusion.',
      'Check whether the expression is formal or informal before using it in Tâche 1/2/3.',
    ],
    examples: [
      { wrong: 'prendre une promenade', correct: 'faire une promenade', note: 'Fixed expression.' },
      { wrong: 'proche de ma maison', correct: 'près de chez moi', note: 'Natural chunk.' },
      { correct: 'faire du sport', note: 'faire de + activity; de + le = du.' },
      { correct: 'à bientôt', note: 'Useful in messages, especially Tâche 1.' },
      { correct: 'à titre d’illustration', note: 'Formal example connector for Tâche 3.' },
    ],
    chunks: ['faire du sport', 'faire une promenade', 'près de chez moi', 'à bientôt', 'en commun', 'à titre d’illustration', 'tout d’abord', 'en conclusion', 'prendre en compte', 'mettre en place'],
    writingMove: 'Build a personal bank of 20 safe chunks and reuse them. In Tâche 3, “à titre d’illustration” and “prendre en compte” sound especially B2.',
    drills: [
      { prompt: 'Correct: prendre une promenade', answer: 'faire une promenade', explanation: 'Fixed chunk.' },
      { prompt: 'Complete: Je fais ___ sport.', answer: 'du', explanation: 'faire du sport.' },
      { prompt: 'Formal connector for “for example”:', answer: 'à titre d’illustration / par exemple', explanation: 'à titre d’illustration is more formal.' },
      { prompt: 'Correct: proche chez moi', answer: 'près de chez moi', explanation: 'Fixed location expression.' },
    ],
  },
];

export const lessonFocusOrder = [
  'Verb constructions à/de',
  'Infinitive structures',
  'Gender and adjective agreement',
  'Prepositions',
  'Object pronouns',
  'Verb tenses',
  'Sentence connectors',
  'Vocabulary precision',
  'Idiomatic expressions',
];
