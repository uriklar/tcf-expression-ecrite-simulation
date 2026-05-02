import type { WritingTask } from '../types';

type QuestionBankEntry = {
  prompt: string;
  documents?: WritingTask['documents'];
};

const taskIds: WritingTask['id'][] = [1, 2, 3];

const taskMetadata: Record<
  WritingTask['id'],
  Pick<WritingTask, 'title' | 'type' | 'minWords' | 'maxWords' | 'suggestedMinutes'>
> = {
  1: {
    title: 'Tâche 1',
    type: 'Message court',
    minWords: 60,
    maxWords: 120,
    suggestedMinutes: 10,
  },
  2: {
    title: 'Tâche 2',
    type: 'Récit, compte rendu ou courrier',
    minWords: 120,
    maxWords: 150,
    suggestedMinutes: 15,
  },
  3: {
    title: 'Tâche 3',
    type: 'Comparaison de points de vue',
    minWords: 120,
    maxWords: 180,
    suggestedMinutes: 35,
  },
};

export const questionBank: Record<WritingTask['id'], QuestionBankEntry[]> = {
  1: [
    {
      prompt: `Vous ne pouvez pas aller au travail aujourd'hui à cause d'un problème de santé. Vous écrivez un message à votre supérieur hiérarchique pour expliquer la situation, préciser combien de temps vous pensez être absent(e), et dire ce que vous allez faire pour que votre travail avance malgré tout.

Votre message doit contenir :
la raison de votre absence
la durée probable de votre absence
les conséquences sur votre travail
une formule de politesse adaptée`,
    },
    {
      prompt: `« Bonjour, bonne nouvelle !
J'ai enfin obtenu mon visa pour le Canada. Mon arrivée est prévue pour le 3 mars. Pourrais-tu m'aider à trouver un hôtel pour ma première semaine sur place ?
Merci beaucoup pour ton aide ! »
Matthias.

Vous avez réservé un hôtel pour Matthias et lui envoyez un courriel contenant une description détaillée de l'établissement ainsi que toutes les informations essentielles, telles que son emplacement, le prix et les services proposés.`,
    },
    {
      prompt: `« Bonjour,
Je souhaite commencer le sport dans une salle. Est-ce que tu pourrais me donner des informations sur les salles de sport près de chez nous ?
Merci d'avance.
Bisous, Laura. »

Vous écrivez une réponse à Laura dans laquelle vous décrivez une salle de sport que vous connaissez et vous précisez les renseignements utiles : lieu, types de cours, prix, etc.`,
    },
    {
      prompt:
        'Vous souhaitez organiser un week-end avec vos proches le mois prochain. Vous envoyez un message pour leur expliquer votre plan, en décrivant le lieu, le moyen de transport et les activités prévues.',
    },
    {
      prompt:
        "Écrivez un message à un(e) ami(e) pour raconter votre week-end à la campagne en détaillant les événements qui se sont déroulés.",
    },
  ],
  2: [
    {
      prompt: `Vous avez participé récemment à une activité organisée dans votre ville : festival, événement sportif, activité culturelle, etc. Vous avez été très déçu(e) par l'organisation. Vous écrivez un courriel aux responsables de l'événement pour raconter votre expérience, expliquer les problèmes rencontrés et donner votre opinion sur ce qui devrait être amélioré.

Votre texte doit contenir :
une brève présentation de l'événement
le récit de votre expérience
les problèmes rencontrés
votre opinion et vos suggestions`,
    },
    {
      prompt:
        "Vous avez passé une soirée agréable avec des amis en assistant à un spectacle : film, pièce de théâtre, concert, etc. Vous avez adoré ce spectacle. Vous en parlez sur votre blog en expliquant ce qui vous a particulièrement marqué.",
    },
    {
      prompt:
        "Un concours en ligne invite les participants à raconter leur plus belle fête. Vous participez à ce concours. Dans votre texte, vous racontez comment cette fête s'est déroulée : anniversaire, fête culturelle, etc. Vous précisez aussi ce que vous en retenez.",
    },
    {
      prompt: `COURRIER DES LECTEURS
Partir un an à l'étranger et tout quitter : est-ce une bonne ou une mauvaise idée ?

Exprimez votre opinion sur le site voyage.internaute.fr avec des exemples tirés de votre expérience personnelle.`,
    },
    {
      prompt:
        "Rédigez un message à la direction pour informer qu'un lieu a été trouvé pour la fête de fin d'année. Vous précisez le lieu, les tarifs, les services et les autres informations pertinentes.",
    },
  ],
  3: [
    {
      prompt: `Vous écrivez un court article que vous voulez faire paraître dans le journal de votre association francophone. Votre article comprend deux parties :
- dans la première partie, vous présentez les deux opinions avec vos propres mots ;
- dans la deuxième partie, vous donnez votre position sur le thème général, commun à ces deux opinions.

Les relations amicales au travail : pour ou contre ?`,
      documents: [
        {
          label: 'Document 1',
          text: "Les amitiés entre collègues au travail peuvent être très avantageuses. Elles contribuent à instaurer un environnement de travail agréable et une atmosphère positive au sein de l'équipe. Avoir des amis parmi ses collègues permet de solidifier les relations professionnelles et d'instaurer un esprit de camaraderie. Cela peut améliorer la communication, favoriser une collaboration plus étroite et faciliter la résolution des problèmes. En outre, partager des moments conviviaux en dehors du bureau, comme des déjeuners ou des sorties, permet de renforcer les liens et de créer une dynamique de groupe forte.",
        },
        {
          label: 'Document 2',
          text: "Il est essentiel de trouver un juste équilibre entre amitié et professionnalisme au travail. Des amitiés trop proches peuvent parfois engendrer des tensions ou des conflits, surtout lorsqu'il s'agit de prendre des décisions professionnelles. Par ailleurs, des amitiés exclusives entre certains collègues peuvent marginaliser les autres, ce qui peut affecter la cohésion et la collaboration au sein de l'équipe. Il est donc crucial de poser des limites claires et de s'assurer que les amitiés ne compromettent pas le professionnalisme, la hiérarchie ou la productivité dans l'organisation.",
        },
      ],
    },
    {
      prompt: `Vous écrivez un court article que vous voulez faire paraître dans le journal de votre association francophone. Votre article comprend deux parties :
- dans la première partie, vous présentez les deux opinions avec vos propres mots ;
- dans la deuxième partie, vous donnez votre position sur le thème général, commun à ces deux opinions.

Lecture et enfants : encourager sans forcer`,
      documents: [
        {
          label: 'Document 1',
          text: "Obliger les enfants à lire n'est pas une bonne solution. Lire est une pratique particulière. Quand un enfant aime le sport, on ne le contraint pas, on essaie de le motiver. Il en va de même pour la lecture, selon Laurence T., pédopsychiatre et experte de l'enfance. Elle affirme que « l'amour de la lecture ne peut pas être imposé ».",
        },
        {
          label: 'Document 2',
          text: "Lire avec ses enfants est une activité agréable et bénéfique. Elle contribue au développement des enfants, car une lecture régulière leur permet d'apprendre de nouveaux mots. Elle les aide également à mieux écouter et à se familiariser avec les mots écrits. Ce moment est idéal pour partager du plaisir en famille, de manière détendue et ludique. Les parents doivent essayer de lire des histoires à leurs enfants dès leur jeune âge, même après une journée fatigante. Cinq à dix minutes par jour sont suffisantes pour leur donner le goût de la lecture durablement.",
        },
      ],
    },
    {
      prompt: `Vous écrivez un court article pour comparer les deux points de vue ci-dessous et donner votre opinion sur le thème commun.

Le rôle du travail`,
      documents: [
        {
          label: 'Document 1',
          text: "Le travail occupe une place importante dans notre vie : dès l'enfance, on nous demande : « Que veux-tu devenir plus tard ? ». Même s'il peut apporter de la satisfaction, il est souvent source de fatigue et peut donner l'impression d'être coincé dans une routine. Aujourd'hui, beaucoup de personnes constatent un déséquilibre entre leur vie professionnelle et leur vie personnelle. Il devient nécessaire de réfléchir à la place du travail dans notre société. Certains pensent qu'en travaillant moins, on pourrait profiter de davantage de temps libre, être plus heureux et mieux vivre.",
        },
        {
          label: 'Document 2',
          text: "Le travail fait partie de notre identité sociale. Lorsqu'on rencontre quelqu'un pour la première fois, on demande souvent : « Que faites-vous dans la vie ? », ce qui montre l'importance du travail dans la perception de soi. Selon le spécialiste Jean-Daniel Remond, la vie professionnelle contribue à se construire : elle permet de rencontrer des gens, de créer des réseaux personnels et professionnels, de se sentir utile et même de se faire des amis. Même si certains décident de quitter leur emploi, pour la plupart, travailler est essentiel pour exister. Le travail reste donc crucial pour l'équilibre personnel et collectif.",
        },
      ],
    },
    {
      prompt: `Vous écrivez un court article pour comparer les deux points de vue ci-dessous et donner votre opinion sur le thème commun.

Chasse aux animaux : une pratique à soutenir ou à rejeter ?`,
      documents: [
        {
          label: 'Document 1',
          text: "Sophie, 28 ans : « Je fais partie de ceux qui ne parviennent pas à comprendre comment on peut prendre plaisir à tuer des animaux. Je fais aussi partie de ceux qui ne saisissent pas comment on peut prétendre aimer la nature tout en contribuant à sa destruction. »",
        },
        {
          label: 'Document 2',
          text: "Bernard, journaliste de la FRM : « La chasse est pratiquée pour diverses raisons : qu'il s'agisse de se nourrir, de commercer, de gérer la faune, de protéger la propriété, de faire de l'exercice, de se divertir ou de chercher du prestige. »",
        },
      ],
    },
  ],
};

function selectQuestionForTask(taskId: WritingTask['id']) {
  const questions = questionBank[taskId];
  const questionIndex = Math.floor(Math.random() * questions.length);

  return questions[questionIndex] ?? questions[0];
}

export function createInitialTasks(): WritingTask[] {
  return taskIds.map((taskId) => ({
    id: taskId,
    ...taskMetadata[taskId],
    ...selectQuestionForTask(taskId),
    answer: '',
  }));
}

export const initialTasks = createInitialTasks();
