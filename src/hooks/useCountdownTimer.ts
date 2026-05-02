import { useEffect, useMemo, useState } from 'react';

const TOTAL_SECONDS = 60 * 60;
type TimerState = 'normal' | 'warning' | 'urgent';

export function useCountdownTimer() {
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_SECONDS);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted || timeRemaining <= 0) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setTimeRemaining((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [hasStarted, timeRemaining]);

  const isLocked = timeRemaining === 0;

  const timerState = useMemo<TimerState>(() => {
    if (timeRemaining <= 2 * 60) return 'urgent';
    if (timeRemaining <= 10 * 60) return 'warning';
    return 'normal';
  }, [timeRemaining]);

  return {
    timeRemaining,
    hasStarted,
    isLocked,
    timerState,
    start: () => setHasStarted(true),
    end: () => {
      setHasStarted(true);
      setTimeRemaining(0);
    },
  };
}
