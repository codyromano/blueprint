import React, { useEffect, useState } from "react";
import Puzzle from "../../models/Puzzle";
import useDebugCommand from "../../state/useDebugCommand";
import puzzles, { WordMergeTerm } from './wordMergePuzzles';
import { getIsCommonTargetForWords, getWordsWithoutDependencies} from "./wordMergeGraphUtils";
import toposort from "toposort";
import "./PuzzleWordMerge.css";
import { Alert, Button, ButtonGroup, Grid } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

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
    <Alert title="How to Play" severity="info" style={{margin: '16px'}}>
    {instructions}
    </Alert>

    <Grid container spacing={2} style={{marginBottom: '16px'}}>
      {resolvedWords.map(term => (
        <Grid item xs={4}>
          <Button
            fullWidth
            key={term}
            variant={selectedWords.has(term) ? "contained" : "outlined"}
            color={"success"}
            onClick={() => {
              if (resolvedWords.length !== 1) {
                onSelectWord(term);
              }
            }}
          >{term}</Button>
         </Grid>
      ))}

    </Grid>

    {resolvedWords.length !== 1 && <ButtonGroup fullWidth>
      <Button
            variant="outlined"
            color="secondary"
            onClick={onClickReset}
            disabled={selectedWords.size < 1}
            fullWidth
          >Reset</Button>

      <Button
          variant="contained"
          color="primary"
          onClick={onClickMerge}
          disabled={selectedWords.size < 2}
          fullWidth
        >Merge</Button>
    </ButtonGroup>}

  </div>;
}
