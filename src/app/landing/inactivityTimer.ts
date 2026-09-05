export const IDLE_TIMEOUT_MS = 20_000;
export const RESTART_COUNTDOWN_MS = 10_000;

const activityEvents = ["pointerdown", "pointermove", "click", "keydown", "touchstart", "wheel", "input"] as const;

export function startInactivityTimer(
  onCountdown: (seconds: number | null) => void,
  onRestart: () => void,
) {
  let lastActivity = Date.now();
  let restarted = false;
  const reset = () => {
    if (restarted) return;
    lastActivity = Date.now();
    onCountdown(null);
  };
  const check = () => {
    if (restarted) return;
    const idleTime = Date.now() - lastActivity;
    if (idleTime >= IDLE_TIMEOUT_MS + RESTART_COUNTDOWN_MS) {
      restarted = true;
      onRestart();
    } else if (idleTime >= IDLE_TIMEOUT_MS) {
      onCountdown(Math.ceil((IDLE_TIMEOUT_MS + RESTART_COUNTDOWN_MS - idleTime) / 1000));
    }
  };

  activityEvents.forEach((event) => window.addEventListener(event, reset, { capture: true, passive: true }));
  // Use elapsed time so suspended/background tabs do not extend the countdown.
  const interval = window.setInterval(check, 250);
  document.addEventListener("visibilitychange", check);

  return () => {
    window.clearInterval(interval);
    activityEvents.forEach((event) => window.removeEventListener(event, reset, true));
    document.removeEventListener("visibilitychange", check);
  };
}
