import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import type { TaskSlotId } from '../types';

type CheatSheetModalProps = {
  taskId: TaskSlotId;
  onClose: () => void;
};

type CheatSheet = {
  title: string;
  intro: ReactNode;
  content: ReactNode;
};

const taskCheatSheets: Partial<Record<TaskSlotId, CheatSheet>> = {
  1: {
    title: 'TCF writing — Tâche 1 cheat sheet',
    intro: (
      <p>
        Tâche 1 is usually a <strong>short message/email</strong>. Goal:{' '}
        <strong>answer all required points clearly</strong> in <strong>60–120 words</strong>.
      </p>
    ),
    content: (
      <>
        <CheatSheetSection title="Basic structure">
          <pre>{`Salut / Bonjour [nom],
Je t’écris parce que [reason].
J’ai trouvé / Je propose / Je voudrais [main idea].
[Detail 1: place / reason / description]
[Detail 2: price / time / services / plan]
[Detail 3: next step]
Dis-moi ce que tu en penses.
À bientôt,
Uri`}</pre>
          <p>For formal messages:</p>
          <pre>{`Bonjour,
Je vous écris pour vous informer que [reason].
[main information]
[details]
Je vous remercie pour votre aide / compréhension.
Cordialement,
Uri`}</pre>
        </CheatSheetSection>

        <CheatSheetSection title="Most useful openings">
          <PhraseList
            phrases={[
              'Je t’écris parce que...',
              'Je vous écris pour vous informer que...',
              'Je voudrais te proposer...',
              'J’ai trouvé une bonne solution.',
              'J’espère que tu vas bien.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="If you need to describe a place">
          <PhraseList
            phrases={[
              'Il est situé près du centre-ville.',
              'L’endroit est facile d’accès en transport en commun.',
              'Le prix est de 30 dollars par mois.',
              'Le petit-déjeuner et le Wi-Fi sont inclus.',
              'Il y a aussi un parking disponible.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="If you need to propose an activity">
          <PhraseList
            phrases={[
              'Je vous propose qu’on organise quelque chose ensemble.',
              'J’ai pensé à une activité simple et agréable.',
              'On pourrait y aller ensemble.',
              'Si vous êtes d’accord, je peux m’en occuper.',
              'Répondez-moi si vous êtes intéressés.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="If you need to explain a problem">
          <PhraseList
            phrases={[
              'Malheureusement, je ne pourrai pas venir aujourd’hui.',
              'J’ai un problème de santé.',
              'Je pense être absent aujourd’hui seulement.',
              'Je ferai le nécessaire pour avancer mon travail à distance.',
              'Merci pour votre compréhension.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="If you write to a friend">
          <p>Use:</p>
          <PhraseList
            phrases={[
              'Salut [nom],',
              'J’espère que tu vas bien.',
              'Super nouvelle !',
              'Dis-moi ce que tu en penses.',
              'À très vite,',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="If you write to a formal person">
          <p>Use:</p>
          <PhraseList
            phrases={[
              'Bonjour,',
              'Je vous écris pour...',
              'Je vous remercie de bien vouloir...',
              'Merci pour votre compréhension.',
              'Cordialement,',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="High-value sentences">
          <PhraseList
            phrases={[
              'Je pense que c’est une bonne option parce que l’endroit est pratique et bien situé.',
              'Si tu veux, on peut y aller ensemble.',
              'Je peux m’occuper de la réservation.',
              'N’hésite pas à me dire ce que tu préfères.',
              'J’espère que ces informations t’aideront.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Common topics">
          <TopicBlock
            title="Hotel"
            phrases={[
              'J’ai trouvé un hôtel bien situé, proche des transports en commun.',
              'Le tarif est de 100 dollars par nuit.',
              'Le petit-déjeuner et le Wi-Fi sont inclus.',
            ]}
          />
          <TopicBlock
            title="Gym"
            phrases={[
              'Je connais une salle de sport près de chez nous.',
              'Elle propose des cours de cardio, yoga et musculation.',
              'Le tarif est raisonnable et la salle est ouverte tous les jours.',
            ]}
          />
          <TopicBlock
            title="Gift"
            phrases={[
              'Je vous propose qu’on fasse un cadeau en commun.',
              'Chacun pourrait participer avec une petite contribution.',
              'Si vous êtes d’accord, je peux acheter le cadeau.',
            ]}
          />
          <TopicBlock
            title="Weekend plan"
            phrases={[
              'Je voudrais organiser un week-end avec vous le mois prochain.',
              'On pourrait louer une maison près d’un lac.',
              'Nous pourrions y aller en voiture et faire des promenades.',
            ]}
          />
          <TopicBlock
            title="Lost item"
            phrases={[
              'Je vous écris car j’ai perdu ma valise.',
              'C’est une grande valise noire avec une étiquette à mon nom.',
              'Je vous remercie de bien vouloir m’aider à la retrouver.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Common fixes for you">
          <div className="cheat-sheet-table-wrapper">
            <table className="cheat-sheet-table">
              <thead>
                <tr>
                  <th>Avoid</th>
                  <th>Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>écouter une nouvelle</td>
                  <td>apprendre une nouvelle</td>
                </tr>
                <tr>
                  <td>arriver là</td>
                  <td>s’y rendre</td>
                </tr>
                <tr>
                  <td>repayer</td>
                  <td>rembourser</td>
                </tr>
                <tr>
                  <td>donner un meilleur prix</td>
                  <td>proposer un tarif réduit</td>
                </tr>
                <tr>
                  <td>bon balance</td>
                  <td>bon équilibre</td>
                </tr>
                <tr>
                  <td>dans cette période</td>
                  <td>à cette période</td>
                </tr>
                <tr>
                  <td>la journée de la fête</td>
                  <td>le jour de la fête</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CheatSheetSection>

        <CheatSheetSection title="Tiny version to memorize">
          <pre>{`Salut / Bonjour [nom],
Je t’écris parce que...
J’ai trouvé / Je propose...
Il est situé...
Le prix est de...
Il y a...
Je pense que c’est une bonne option.
Dis-moi ce que tu en penses.
À bientôt,
Uri`}</pre>
        </CheatSheetSection>
      </>
    ),
  },
  2: {
    title: 'TCF writing — Tâche 2 cheat sheet',
    intro: (
      <p>
        Tâche 2 is usually a <strong>blog post, article, opinion text, complaint, or experience story</strong>.
        Goal: <strong>tell what happened + give your opinion + finish clearly</strong> in{' '}
        <strong>120–150 words</strong>.
      </p>
    ),
    content: (
      <>
        <CheatSheetSection title="Basic structure">
          <pre>{`[Titre]
Récemment, j’ai eu l’occasion de [activity / event].
L’événement a eu lieu [place / time], dans une ambiance [adjective].
D’abord, [what happened first].
Ensuite, [what happened next].
Ce qui m’a le plus marqué, c’est [important detail], car [reason].
À mon avis, cette expérience était [opinion].
Elle m’a permis de [benefit / result].
Je recommande vivement [activity/place], car c’est une expérience [adjective] et [adjective].`}</pre>
        </CheatSheetSection>

        <CheatSheetSection title="Best openings">
          <PhraseList
            phrases={[
              'Récemment, j’ai eu l’occasion de participer à une activité très agréable.',
              'La semaine dernière, j’ai assisté à un spectacle avec des amis.',
              'Dans cet article, je voudrais partager une expérience qui m’a beaucoup marqué.',
              'Je voudrais raconter une expérience récente qui m’a laissé un excellent souvenir.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Describe the event/place">
          <PhraseList
            phrases={[
              'L’événement a eu lieu dans une ambiance chaleureuse et conviviale.',
              'L’endroit était bien organisé, agréable et facile d’accès.',
              'Il y avait beaucoup de monde, mais l’ambiance restait très agréable.',
              'Tout était bien préparé, ce qui a rendu l’expérience encore plus positive.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Tell what happened">
          <PhraseList
            phrases={[
              'D’abord, nous avons été accueillis par une équipe très sympathique.',
              'Ensuite, nous avons participé à plusieurs activités intéressantes.',
              'Pendant la soirée, nous avons profité de la musique, des discussions et d’un bon repas.',
              'Le moment le plus fort a été [moment].',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Say what impressed you">
          <PhraseList
            phrases={[
              'Ce qui m’a le plus marqué, c’est l’ambiance.',
              'J’ai particulièrement apprécié la qualité de l’organisation.',
              'J’ai été impressionné par l’énergie des participants.',
              'Ce moment m’a beaucoup touché, car il était simple mais très sincère.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Give your opinion">
          <PhraseList
            phrases={[
              'À mon avis, cette expérience était très réussie.',
              'J’ai trouvé cette activité à la fois agréable et enrichissante.',
              'Cette expérience m’a permis de découvrir quelque chose de nouveau.',
              'Je pense que ce type d’activité est important, car il permet de créer des liens.',
              'Pour moi, le plus important était de partager un bon moment avec les autres.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Recommendation endings">
          <PhraseList
            phrases={[
              'Je recommande vivement cette expérience.',
              'Je conseille à tout le monde d’essayer au moins une fois.',
              'C’est une expérience que je n’oublierai jamais.',
              'Je garderai un très bon souvenir de cette journée.',
              'Si vous en avez l’occasion, n’hésitez pas à participer.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="If the task is negative / complaint">
          <p>Use this structure:</p>
          <pre>{`Récemment, j’ai participé à [event], mais j’ai été déçu par l’organisation.
D’abord, [problem 1].
Ensuite, [problem 2].
De plus, [problem 3].
À mon avis, il faudrait améliorer [thing].
Il serait aussi utile de [suggestion].
J’espère que ces remarques aideront à améliorer les prochains événements.`}</pre>
          <p>Useful complaint sentences:</p>
          <PhraseList
            phrases={[
              'Malheureusement, l’organisation n’était pas à la hauteur.',
              'Il y avait trop de monde et peu d’informations.',
              'L’attente était trop longue.',
              'Le personnel n’était pas assez disponible.',
              'Il faudrait mieux informer les participants.',
              'Il serait préférable de prévoir plus de personnel.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Common topics">
          <TopicBlock
            title="Spectacle / concert"
            phrases={[
              'Une soirée inoubliable',
              'La semaine dernière, j’ai assisté à un spectacle avec des amis. L’événement a eu lieu dans une grande salle du centre-ville, dans une ambiance très chaleureuse.',
              'Dès le début, nous avons été impressionnés par la musique, les lumières et l’énergie des artistes. Ce qui m’a le plus marqué, c’est la qualité des costumes et de la mise en scène. Tout était bien préparé et très professionnel.',
              'À mon avis, cette soirée était une grande réussite. Elle m’a permis de passer un excellent moment avec mes amis et de découvrir un spectacle vraiment original.',
              'Je recommande vivement cette expérience à toutes les personnes qui aiment la musique, le théâtre ou les sorties culturelles.',
            ]}
          />
          <TopicBlock
            title="Association / volunteering"
            phrases={[
              'Une expérience humaine très enrichissante',
              'Depuis quelques mois, je fais partie d’une association qui soutient les personnes âgées. Dans cet article, je voudrais partager cette expérience qui m’a beaucoup marqué.',
              'D’abord, nous rendons visite à des personnes souvent seules. Nous discutons avec elles, nous les aidons pour certaines tâches simples et nous partageons parfois une promenade ou une lecture. Ce qui m’a le plus touché, c’est leur reconnaissance.',
              'À mon avis, cette expérience est très importante. Elle m’a appris à écouter, à être patient et à mieux comprendre les difficultés du vieillissement.',
              'Je recommande vivement cet engagement. Quelques heures suffisent pour faire une vraie différence dans la vie de quelqu’un.',
            ]}
          />
          <TopicBlock
            title="Sport class / gym"
            phrases={[
              'Une salle de sport à découvrir',
              'Récemment, j’ai assisté à un cours de sport dans une salle de ma ville. L’endroit est moderne, propre et facile d’accès.',
              'Le cours a commencé par un échauffement simple, puis nous avons fait plusieurs exercices de cardio et de musculation. Le coach était dynamique et expliquait bien les mouvements. Ce qui m’a le plus marqué, c’est l’ambiance positive : chacun pouvait avancer à son rythme.',
              'À mon avis, cette salle est une très bonne option pour les personnes qui veulent commencer le sport. Les cours sont variés et les tarifs restent raisonnables.',
              'Je recommande vivement cette salle, surtout aux débutants qui cherchent un endroit agréable et motivant.',
            ]}
          />
          <TopicBlock
            title="Party / celebration"
            phrases={[
              'Une fête inoubliable',
              'La semaine dernière, j’ai participé à une fête très agréable avec ma famille et mes amis. Elle a eu lieu dans un jardin décoré avec des lumières et de la musique.',
              'D’abord, nous avons partagé un bon repas. Ensuite, nous avons joué, discuté et pris beaucoup de photos. Le moment le plus fort a été le gâteau, car tout le monde a chanté ensemble dans une ambiance joyeuse.',
              'À mon avis, cette fête était très réussie. Elle m’a permis de passer du temps avec mes proches et de créer de beaux souvenirs.',
              'Je garderai un très bon souvenir de cette journée.',
            ]}
          />
          <TopicBlock
            title="Trip / weekend"
            phrases={[
              'Un week-end à la campagne',
              'Récemment, j’ai passé un week-end à la campagne avec des amis. L’endroit était calme, agréable et entouré de nature.',
              'D’abord, nous avons fait une longue promenade dans les champs. Ensuite, nous avons préparé un repas avec des produits locaux. Le soir, nous avons discuté près d’un feu de camp. Ce qui m’a le plus marqué, c’est le calme de l’endroit.',
              'À mon avis, cette expérience était très reposante. Elle m’a permis de me détendre et d’oublier le stress de la ville.',
              'Je recommande vivement ce type de week-end à toutes les personnes qui veulent se ressourcer.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Useful adjectives">
          <PhraseList
            phrases={[
              'agréable',
              'chaleureux',
              'convivial',
              'enrichissant',
              'inoubliable',
              'bien organisé',
              'facile d’accès',
              'impressionnant',
              'utile',
              'réussi',
              'reposant',
              'motivant',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Best connectors">
          <PhraseList
            phrases={[
              'Récemment,',
              'D’abord,',
              'Ensuite,',
              'De plus,',
              'Ce qui m’a le plus marqué, c’est...',
              'À mon avis,',
              'Pour conclure,',
              'Je recommande vivement...',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Things to avoid">
          <p>Avoid:</p>
          <PhraseList
            phrases={[
              'overly strange or personal stories',
              'fake statistics',
              'too many names',
              'complicated sentences',
              'jokes or surprise endings',
              'details that do not answer the prompt',
            ]}
          />
          <p>Prefer:</p>
          <PhraseList phrases={['simple event', 'clear chronology', 'clear opinion', 'recommendation', 'safe vocabulary']} />
        </CheatSheetSection>

        <CheatSheetSection title="Common fixes for you">
          <FixTable
            rows={[
              ['regarder un spectacle', 'assister à un spectacle'],
              ['un groupe en live', 'un groupe jouait en direct'],
              ['les vêtements des acteurs', 'les costumes des acteurs'],
              ['c’était super', 'c’était très réussi'],
              ['dans ce registre de mon blog', 'dans cet article'],
              ['j’ai passé une soirée agréable', 'j’ai passé une excellente soirée'],
              ['la partie que j’ai adoré', 'ce que j’ai le plus apprécié'],
              ['je recommande de voir', 'je recommande vivement de voir'],
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Tiny version to memorize">
          <pre>{`[Titre]
Récemment, j’ai eu l’occasion de...
L’événement a eu lieu...
D’abord,...
Ensuite,...
Ce qui m’a le plus marqué, c’est...
À mon avis,...
Je recommande vivement...`}</pre>
        </CheatSheetSection>
      </>
    ),
  },
  3: {
    title: 'TCF writing — Tâche 3 cheat sheet',
    intro: (
      <p>
        Tâche 3 is usually: <strong>present two documents + give your opinion</strong>. Goal:{' '}
        <strong>summarize both opinions clearly, then give a balanced opinion</strong> in{' '}
        <strong>120–180 words</strong>.
      </p>
    ),
    content: (
      <>
        <CheatSheetSection title="Basic structure">
          <pre>{`[Titre]
Les deux documents abordent la question de [thème], mais sous des angles différents.
Le document 1 met en avant [idée du document 1].
En revanche, le document 2 souligne [idée du document 2].
Ainsi, ces textes montrent que [thème] est un sujet complexe.
À mon avis, il est important de trouver un équilibre.
D’un côté, [argument 1] peut être bénéfique, car cela permet de [avantage].
D’un autre côté, il ne faut pas ignorer [limite/problème].
En effet, [explication simple].
Pour cette raison, je pense qu’il faut adopter une approche raisonnable.
En conclusion, [position finale].`}</pre>
        </CheatSheetSection>

        <CheatSheetSection title="Part 1 — present the documents">
          <p>Use 40–60 words.</p>
          <PhraseList
            phrases={[
              'Les deux documents abordent la question de..., mais sous des angles différents.',
              'Le document 1 met en avant...',
              'Le document 2 souligne...',
              'En revanche, le second document insiste sur...',
              'Ainsi, ces deux textes présentent deux visions différentes du même sujet.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Part 2 — give your opinion">
          <p>Use 80–120 words.</p>
          <PhraseList
            phrases={[
              'À mon avis, il est important de trouver un équilibre.',
              'D’un côté, ... peut être bénéfique, car cela permet de...',
              'D’un autre côté, il ne faut pas ignorer...',
              'En effet, ...',
              'Pour cette raison, je pense que...',
              'En conclusion, il faut adopter une approche raisonnable et adaptée à chaque situation.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Best opinion strategy">
          <p>Almost always choose a balanced opinion.</p>
          <pre>{`Je pense que la meilleure solution est de trouver un équilibre.`}</pre>
          <p>This works for topics like:</p>
          <PhraseList
            phrases={[
              'children and education',
              'work-life balance',
              'technology',
              'food delivery',
              'friendships at work',
              'reading',
              'hunting',
              'travel',
              'environment',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="High-value phrases">
          <PhraseList
            phrases={[
              'sous des angles différents',
              'met en avant',
              'souligne l’importance de',
              'à l’inverse',
              'en revanche',
              'il est essentiel de',
              'il ne faut pas oublier que',
              'une approche équilibrée',
              'adaptée à chaque situation',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Useful argument phrases">
          <TopicBlock
            title="Advantages"
            phrases={[
              'Cela permet de gagner du temps.',
              'Cela favorise la communication.',
              'Cela améliore la qualité de vie.',
              'Cela aide à créer des liens.',
              'Cela développe l’autonomie.',
              'Cela peut être bénéfique pour la santé.',
            ]}
          />
          <TopicBlock
            title="Limits / problems"
            phrases={[
              'Cela peut créer du stress.',
              'Cela peut poser des problèmes.',
              'Cela peut entraîner des conflits.',
              'Cela peut réduire les relations humaines.',
              'Cela peut devenir une mauvaise habitude.',
              'Cela peut nuire à l’équilibre personnel.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Topic-specific ready ideas">
          <TopicBlock
            title="Education / children"
            phrases={[
              'Les enfants ont besoin à la fois de liberté et de limites claires.',
              'Trop de contrôle peut créer de la frustration.',
              'L’absence de règles peut poser problème plus tard.',
              'Il faut accompagner les enfants vers l’autonomie.',
            ]}
          />
          <TopicBlock
            title="Reading / children"
            phrases={[
              'Il ne faut pas forcer les enfants à lire.',
              'Il vaut mieux transformer la lecture en moment agréable.',
              'Lire quelques minutes par jour peut développer le vocabulaire.',
              'Les parents peuvent proposer des livres adaptés à l’âge et aux goûts de l’enfant.',
            ]}
          />
          <TopicBlock
            title="Work"
            phrases={[
              'Le travail joue un rôle important dans la vie sociale.',
              'Cependant, il ne doit pas prendre toute la place.',
              'Il faut préserver un équilibre entre vie professionnelle et vie personnelle.',
            ]}
          />
          <TopicBlock
            title="Friendships at work"
            phrases={[
              'De bonnes relations entre collègues peuvent améliorer l’ambiance.',
              'Cependant, il faut garder une certaine distance professionnelle.',
              'L’amitié au travail est positive si elle ne nuit pas à la productivité.',
            ]}
          />
          <TopicBlock
            title="Food delivery at work"
            phrases={[
              'La livraison au bureau est pratique, car elle permet de gagner du temps.',
              'Cependant, elle peut empêcher de faire une vraie pause.',
              'Il vaut mieux l’utiliser de temps en temps, sans en faire une habitude quotidienne.',
            ]}
          />
          <TopicBlock
            title="Hunting / animals"
            phrases={[
              'Certains rejettent la chasse pour des raisons éthiques.',
              'D’autres la défendent pour des raisons culturelles ou pratiques.',
              'Il faut respecter la nature tout en tenant compte du contexte.',
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Example — food delivery at work">
          <pre>{`Repas livrés au bureau : avantages et limites
Les deux documents abordent la question des repas livrés au bureau, mais sous des angles différents. Le document 1 met en avant les avantages de ce service : il permet de gagner du temps, de choisir son repas et de rester concentré sur son travail. En revanche, le document 2 souligne ses limites, notamment les retards possibles et l’absence de vraie pause.
À mon avis, la livraison de repas au bureau peut être utile, mais elle ne doit pas devenir une habitude quotidienne. D’un côté, ce service est pratique quand on a beaucoup de travail ou peu de temps pour sortir. Il permet aussi à chacun de choisir un repas selon ses goûts. D’un autre côté, rester assis toute la journée peut augmenter la fatigue et le stress. La pause déjeuner est aussi un moment important pour se détendre. En conclusion, je pense qu’il faut utiliser la livraison avec modération et garder le temps de faire une vraie coupure.`}</pre>
        </CheatSheetSection>

        <CheatSheetSection title="Common fixes for you">
          <FixTable
            rows={[
              ['Dans cet article, je voudrais discuter de ces documents', 'Les deux documents abordent la question de…'],
              ['Quelle ce qu’ils ont en commun', 'Ce qu’ils ont en commun'],
              ['mon position', 'ma position'],
              ['dans le milieu', 'entre les deux'],
              ['bon balance', 'bon équilibre'],
              ['je suis plus d’accord avec document 2', 'je suis plutôt d’accord avec le document 2'],
              ['faire les enfants aimer la lecture', 'donner aux enfants le goût de la lecture'],
              ['les deux documents parlent de', 'les deux documents abordent la question de'],
            ]}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Things to avoid">
          <p>Avoid:</p>
          <PhraseList
            phrases={[
              'copying too much from the documents',
              'giving your opinion before presenting both documents',
              'using fake statistics',
              'choosing an extreme opinion unless it is very easy to defend',
              'writing too much about personal experience',
              'long complicated sentences',
            ]}
          />
          <p>Prefer:</p>
          <PhraseList
            phrases={['neutral summary', 'balanced opinion', 'simple examples', 'clear connectors', 'safe vocabulary']}
          />
        </CheatSheetSection>

        <CheatSheetSection title="Tiny version to memorize">
          <pre>{`Les deux documents abordent la question de [thème], mais sous des angles différents.
Le document 1 met en avant [idée 1].
En revanche, le document 2 souligne [idée 2].
À mon avis, il est important de trouver un équilibre.
D’un côté, [avantage].
D’un autre côté, [limite].
En conclusion, il faut adopter une approche raisonnable.`}</pre>
        </CheatSheetSection>
      </>
    ),
  },
};

export function CheatSheetModal({ taskId, onClose }: CheatSheetModalProps) {
  const cheatSheet = taskCheatSheets[taskId];
  const title = cheatSheet?.title ?? `Tâche ${taskId} cheat sheet`;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="task-preview-modal cheat-sheet-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cheat-sheet-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="task-preview-header">
          <div>
            <p className="eyebrow">Tâche {taskId}</p>
            <h2 id="cheat-sheet-title">{title}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close cheat sheet">
            <X size={17} />
          </button>
        </div>

        <div className="task-preview-body cheat-sheet-body">
          {cheatSheet ? (
            <>
              <div className="cheat-sheet-intro">{cheatSheet.intro}</div>
              {cheatSheet.content}
            </>
          ) : (
            <div className="cheat-sheet-empty">
              <h3>Cheat sheet coming soon</h3>
              <p>This task does not have a cheat sheet yet. Add the content when it is ready.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function CheatSheetSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="cheat-sheet-section">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function PhraseList({ phrases }: { phrases: string[] }) {
  return (
    <ul className="cheat-sheet-phrase-list">
      {phrases.map((phrase) => (
        <li key={phrase}>{phrase}</li>
      ))}
    </ul>
  );
}

function TopicBlock({ title, phrases }: { title: string; phrases: string[] }) {
  return (
    <article className="cheat-sheet-topic">
      <h4>{title}</h4>
      <PhraseList phrases={phrases} />
    </article>
  );
}

function FixTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="cheat-sheet-table-wrapper">
      <table className="cheat-sheet-table">
        <thead>
          <tr>
            <th>Avoid</th>
            <th>Use</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([avoid, use]) => (
            <tr key={avoid}>
              <td>{avoid}</td>
              <td>{use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
