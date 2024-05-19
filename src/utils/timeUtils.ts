export function formatCountdown(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes > 0 ? `${minutes}m` : '';
  const formattedSeconds = `${remainingSeconds}s`;

  return [formattedMinutes, formattedSeconds].join(' ');
}

export function getSecondsUntilTenantRent(moneyCollectedTime: number | null): number {
  const currentTime = Date.now();
  const timeMoneyIsReady =
    moneyCollectedTime == null
      ? currentTime
      : 
        moneyCollectedTime + 1000 * 60 * 2;
  const secondsUntilMoneyReady = Math.max(
    0,
    Math.round((timeMoneyIsReady - currentTime) / 1000)
  );

  return secondsUntilMoneyReady;
}