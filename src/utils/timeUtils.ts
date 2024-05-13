export function formatCountdown(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes > 0 ? `${minutes}m` : '';
  const formattedSeconds = `${remainingSeconds}s`;

  return [formattedMinutes, formattedSeconds].join(' ');
}