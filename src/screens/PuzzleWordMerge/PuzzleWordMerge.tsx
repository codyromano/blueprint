import React, { useEffect, useMemo, useState } from "react";
import Puzzle from "../../models/Puzzle";
import useDebugCommand from "../../state/useDebugCommand";
import puzzles, { WordMergeTerm } from './wordMergePuzzles';
import getObjectValues from "../../utils/getObjectValues";
import { getWordsWithoutIncomingEdges, invertGraph } from "./wordMergeGraphUtils";

export default function PuzzleWordMerge({
  instructions,
  onPuzzleSolved,
  onPuzzleFailed,
  difficulty,
}: Puzzle) {
  // TODO: Determine correct puzzle id
  const puzzleId = '1';
  const puzzle = puzzles.find(p => p.id === puzzleId);

  if (puzzle == null) {
    throw new Error(`No wordMergePuzzle with id ${puzzleId}`);
  }

  const [wordMergeTerms, setWordMergeTerms] = useState(getWordsWithoutIncomingEdges(puzzle.graph));
  const [selectedWords, setSelectedWords] = useState<Set<WordMergeTerm>>(new Set());
  const invertedGraph = useMemo(() => invertGraph(puzzle.graph), []);

  const {setCommandCallback} = useDebugCommand();

  useEffect(() => {
    setCommandCallback('FINISH_PUZZLE_THREE_STARS', () => {
      onPuzzleSolved(3);
    });
  }, []);

  useEffect(() => {
    selectedWords.forEach(word => {

    });
  }, [selectedWords])




  return <div>
    <p>{instructions}</p>

    {wordMergeTerms.map(term => (
      <button key={term} onClick={() => {
        setSelectedWords(allWords => allWords.add(term))
      }} className="form-button">{term}</button>
    ))}

    <footer>
      <button disabled={true} className="form-button">Reset</button>
      <button disabled={true} className="form-button">Merge</button>
    </footer>
  </div>;
}
