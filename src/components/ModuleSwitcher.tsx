export type AppModule = 'simulation' | 'tache1-trainer' | 'tache2-trainer';

type ModuleSwitcherProps = {
  activeModule: AppModule;
  onChange: (module: AppModule) => void;
};

export function ModuleSwitcher({ activeModule, onChange }: ModuleSwitcherProps) {
  return (
    <div className="module-switcher" role="tablist" aria-label="Modules d’entraînement">
      <button
        type="button"
        role="tab"
        aria-selected={activeModule === 'simulation'}
        className={activeModule === 'simulation' ? 'module-tab module-tab-active' : 'module-tab'}
        onClick={() => onChange('simulation')}
      >
        Simulation complète
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeModule === 'tache1-trainer'}
        className={activeModule === 'tache1-trainer' ? 'module-tab module-tab-active' : 'module-tab'}
        onClick={() => onChange('tache1-trainer')}
      >
        Trainer Tâche 1
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeModule === 'tache2-trainer'}
        className={activeModule === 'tache2-trainer' ? 'module-tab module-tab-active' : 'module-tab'}
        onClick={() => onChange('tache2-trainer')}
      >
        Trainer Tâche 2
      </button>
    </div>
  );
}
