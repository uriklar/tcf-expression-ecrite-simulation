import { Keyboard, CaseSensitive } from 'lucide-react';

type VirtualKeyboardProps = {
  isUppercase: boolean;
  disabled: boolean;
  onToggleCase: () => void;
  onInsert: (character: string) => void;
};

const lowercaseKeys = ['à', 'â', 'ä', 'é', 'è', 'ê', 'ë', 'î', 'ï', 'ô', 'ö', 'ù', 'û', 'ü', 'ç', 'œ', 'æ', '«', '»', '’'];
const uppercaseKeys = ['À', 'Â', 'Ä', 'É', 'È', 'Ê', 'Ë', 'Î', 'Ï', 'Ô', 'Ö', 'Ù', 'Û', 'Ü', 'Ç', 'Œ', 'Æ', '«', '»', '’'];

export function VirtualKeyboard({ isUppercase, disabled, onToggleCase, onInsert }: VirtualKeyboardProps) {
  const keys = isUppercase ? uppercaseKeys : lowercaseKeys;

  return (
    <aside className="keyboard-panel">
      <div className="keyboard-header">
        <div>
          <p className="eyebrow">Saisie</p>
          <h2>
            <Keyboard size={18} />
            Accents français
          </h2>
        </div>
        <button
          className={`case-toggle ${isUppercase ? 'active' : ''}`}
          type="button"
          onClick={onToggleCase}
          aria-pressed={isUppercase}
          title="Basculer les accents en majuscules"
        >
          <CaseSensitive size={17} />
        </button>
      </div>

      <div className="accent-grid" aria-label="Caractères spéciaux français">
        {keys.map((key) => (
          <button
            key={key}
            className="accent-key"
            type="button"
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onInsert(key)}
          >
            {key}
          </button>
        ))}
      </div>
    </aside>
  );
}
