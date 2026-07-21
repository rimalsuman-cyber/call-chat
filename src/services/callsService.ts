export function formatDuration(seconds: number) {
  if (!seconds) return 'No answer';
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}m ${rest}s`;
}
