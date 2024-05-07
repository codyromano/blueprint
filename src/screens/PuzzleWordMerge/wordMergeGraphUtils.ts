import getObjectValues from "../../utils/getObjectValues";
import puzzles, { WordMergeTerm } from "./wordMergePuzzles";

// The word that can be created through merging => mapped to the words that can be merged into said word
// E.g. Construction => [Hammer, Nail, Shovel]
export const getWordsWithoutIncomingEdges = (graph: typeof puzzles[number]['graph']): WordMergeTerm[] => {
  let wordsWithDependencies = new Set(Object.keys(graph));
  const result: Set<WordMergeTerm> = new Set();

  for (const incomingEdges of getObjectValues(graph)) {
    for (const word of incomingEdges) {
      if (!wordsWithDependencies.has(word)) {
        result.add(word);
      }
    }
  }

  return Array.from(result);
};

// The word that can be merged into something => mapped to the thing that it gets merged into
// Words are mergable if they share the same destination
// E.g. Seattle => City; Boston => City
export const invertGraph = (graph: typeof puzzles[number]['graph']) => {
  const newGraph: typeof puzzles[number]['graph'] = {};

  for (const _term in graph) {
    const term = _term as WordMergeTerm;
    const incomingEdges = graph[term];

    if (incomingEdges != null) {
      for (const incomingEdge of incomingEdges) {
        newGraph[incomingEdge] = newGraph[incomingEdge] ?? [];

        if (!newGraph[incomingEdge]?.includes(term)) {
          newGraph[incomingEdge]?.push(term);
        }
      }
    }
  }

  return newGraph;
}