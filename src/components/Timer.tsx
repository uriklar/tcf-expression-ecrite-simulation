type TimerProps = {
  seconds: number;
  state: 'normal' | 'warning' | 'urgent';
};

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function Timer({ seconds, state }: TimerProps) {
  return (
    <div className={`timer timer-${state}`} aria-live="polite">
      <span className="timer-label">Time remaining</span>
      <span className="timer-value">{formatTime(seconds)}</span>
    </div>
  );
}
