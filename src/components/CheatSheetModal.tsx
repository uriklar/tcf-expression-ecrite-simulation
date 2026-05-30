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
