export type AppModule = 'simulation' | 'trainer';

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
        aria-selected={activeModule === 'trainer'}
        className={activeModule === 'trainer' ? 'module-tab module-tab-active' : 'module-tab'}
        onClick={() => onChange('trainer')}
      >
        Trainer Tâche 1
      </button>
    </div>
  );
}
