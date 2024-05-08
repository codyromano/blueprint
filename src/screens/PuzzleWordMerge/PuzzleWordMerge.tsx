import React, { useEffect, useState } from "react";
import Puzzle from "../../models/Puzzle";
import useDebugCommand from "../../state/useDebugCommand";
import puzzles, { WordMergeTerm } from './wordMergePuzzles';
import { getIsCommonTargetForWords, getWordsWithoutDependencies} from "./wordMergeGraphUtils";
import toposort from "toposort";
import "./PuzzleWordMerge.css";

const getPuzzleRating = (countResolvedTerms: number, countTotalTerms: number): 0 | 1 | 2 | 3 => {
  return 3;
};

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

  // The user selected two or more words and hit "merge"
  const [mergedWords, setMergedWords] = useState<Set<WordMergeTerm>>(new Set());

  // Words selected but not yet "merged"
  const [_selectedWords, setSelectedWords] = useState<Set<WordMergeTerm>>(new Set()); 

  // TODO: Kind of hacky. But we want to exclude merged words from the selected set
  const selectedWords = new Set(Array.from(_selectedWords).filter(word => !mergedWords.has(word)));

  // Words for which all dependencies (previous words) have been met
  const resolvedWords = getWordsWithoutDependencies(puzzle.graph, mergedWords).filter(term => !mergedWords.has(term));

  const {setCommandCallback} = useDebugCommand();

  useEffect(() => {
    setCommandCallback('FINISH_PUZZLE_THREE_STARS', () => {
      onPuzzleSolved(3);
    });
  }, []);

  const onFinishSolvingPuzzle = () => {
    const rating = getPuzzleRating(resolvedWords.length, toposort(puzzle.graph).length);
    onPuzzleSolved(rating); 
  };

  useEffect(() => {
    if (resolvedWords.length === 1) {
      setTimeout(onFinishSolvingPuzzle, 2000);
    }
  }, [resolvedWords]);

  const onSelectWord = (term: WordMergeTerm) => {
    setSelectedWords(allWords => {
      const newWords = new Set(allWords);

      if (newWords.has(term)) {
        newWords.delete(term);
      } else {
        newWords.add(term);
      }
      return newWords;
    })
  };

  const onClickMerge = () => {
    if (getIsCommonTargetForWords(puzzle.graph, selectedWords)) {
      setMergedWords(state => {
        const words = new Set(state);
        for (const selectedWord of Array.from(selectedWords)) {
          words.add(selectedWord);
        }

        return words;
      });
    } else {
      alert('The words must all have something in common');
    }
  };

  const onClickReset = () => {
    setMergedWords(new Set());
    setSelectedWords(new Set());
  };
  

  return <div>
    <p style={{margin: '3vh 0'}}>{instructions}</p>

    <div className="puzzle-word-merge-container">
      {resolvedWords.map(term => (
        <button key={term}  onClick={() => onSelectWord(term)}
        className={`puzzle-word-merge-button ${selectedWords.has(term) ? 'puzzle-word-selected' : ''}`}>{term}</button>
      ))}
    </div>

    <footer className="puzzle-word-footer">
      <div style={{width: "100%", gap: "0.5rem", display: "flex"}}>
      <button className="puzzle-word-merge-button puzzle-word-footer-button" onClick={onClickReset} disabled={selectedWords.size < 2}>Reset</button>
      <button className="puzzle-word-merge-button puzzle-word-footer-button merge-button"  onClick={onClickMerge} disabled={selectedWords.size < 2}>Merge</button>
      </div>

      <button
        className="puzzle-word-footer-button-secondary"
        onClick={onFinishSolvingPuzzle}>I give up</button>
    </footer>
  </div>;
}
