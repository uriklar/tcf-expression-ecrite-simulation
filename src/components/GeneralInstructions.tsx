import { Play } from 'lucide-react';

type GeneralInstructionsProps = {
  onStart: () => void;
};

export function GeneralInstructions({ onStart }: GeneralInstructionsProps) {
  return (
    <main className="instructions-screen">
      <section className="instructions-content" aria-labelledby="instructions-title">
        <div className="instructions-header">
          <p className="eyebrow">TCF Canada</p>
          <h1 id="instructions-title">Expression écrite</h1>
        </div>

        <div className="instructions-body">
          <p>Cette épreuve teste les capacités à s’exprimer en français à l’écrit et est composée de 3 tâches :</p>

          <ul>
            <li>
              <strong>Tâche 1 :</strong> rédaction d’un message pour décrire, raconter et/ou expliquer, adressé à un
              ou plusieurs destinataires, dont le statut a été précisé dans la consigne.{' '}
              <strong>Nombre de mots attendu :</strong> minimum 60 mots/maximum 120 mots.
            </li>
            <li>
              <strong>Tâche 2 :</strong> rédaction d’un article, d’un courrier, d’une note, ... à l’intention de
              plusieurs destinataires pour faire un compte rendu d’expérience ou un récit. Comptes rendus et récits
              seront accompagnés de commentaires, d’opinions ou d’arguments, en fonction d’un objectif (ex :
              revendiquer, se réconcilier, ...). <strong>Nombre de mots attendu :</strong> minimum 120 mots/maximum
              150 mots.
            </li>
            <li>
              <strong>Tâche 3 :</strong> rédaction d’un texte (pour un journal, un site Internet, un collègue, un
              supérieur hiérarchique, ...) qui compare deux points de vue portant sur un fait de société, exprimés dans
              deux documents. Le candidat donne son avis sur le thème traité dans les deux documents.{' '}
              <strong>Nombre de mots attendu :</strong> minimum 120 mots/maximum 180 mots.
            </li>
          </ul>
        </div>

        <button className="primary-action instructions-start" type="button" onClick={onStart}>
          <Play size={18} />
          Commencer
        </button>
      </section>
    </main>
  );
}
