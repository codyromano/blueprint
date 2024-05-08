import puzzles, { NO_DEPENDENCIES, WordMergeTerm } from "./wordMergePuzzles";

// Words can only be merged if they share a common target
export const getIsCommonTargetForWords = (
  graph: typeof puzzles[number]['graph'],
  selectedWords: Set<WordMergeTerm>,
): boolean => {
  const targetCount: Partial<Record<WordMergeTerm, number>> = {};
  for (const [target, origin] of graph) {
    targetCount[target] = (targetCount[target] ?? 0) + (selectedWords.has(origin) ? 1 : 0);

    if (targetCount[target] === selectedWords.size) {
      return true;
    }
  }
  return false;
};


// The word that can be created through merging => mapped to the words that can be merged into said word
// E.g. Construction => [Hammer, Nail, Shovel]
export const getWordsWithoutDependencies = (
  graph: typeof puzzles[number]['graph'],
  resolved: Set<WordMergeTerm>
): WordMergeTerm[] => {
  const countIncomingEdges: Partial<Record<WordMergeTerm, number>> = {};

  for (const [target, origin] of graph) {
    let count = countIncomingEdges[target] ?? 0;
    count += (origin === NO_DEPENDENCIES || resolved.has(origin)) ? 0 : 1;
    countIncomingEdges[target] = count;
  }

  return Object.entries(countIncomingEdges)
    .filter(([_, edgeCount]) => edgeCount === 0)
    .map(([term]) => term) as WordMergeTerm[];
};

