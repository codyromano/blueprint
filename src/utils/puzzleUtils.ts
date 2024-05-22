export function findNextPuzzle<T extends {id: string}>(
  completedPuzzleIds: Record<string, true>,
  puzzles: Array<T>
): T {
  const firstNonCompletedPuzzle = puzzles.find(item => !completedPuzzleIds[item.id]);
  return firstNonCompletedPuzzle ?? puzzles[
    Math.floor(Math.random() * puzzles.length)
  ];
}

export function rand(sources: string[]): string {
  const i = Math.floor(Math.random() * sources.length);
  return sources[i];
}