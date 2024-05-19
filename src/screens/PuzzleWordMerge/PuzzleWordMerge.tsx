import React, { useEffect, useState } from "react";
import Puzzle from "../../models/Puzzle";
import useDebugCommand from "../../state/useDebugCommand";
import puzzles, { WordMergeTerm } from './wordMergePuzzles';
import { getIsCommonTargetForWords, getWordsWithoutDependencies} from "./wordMergeGraphUtils";
import toposort from "toposort";
import "./PuzzleWordMerge.css";
import { Alert, Box, Button, ButtonGroup, Card, Grid, Snackbar, Typography } from "@mui/material";
import { CheckCircleOutline, Favorite, FavoriteBorder, SentimentDissatisfied } from "@mui/icons-material";

const getPuzzleRating = (countResolvedTerms: number, countTotalTerms: number): 0 | 1 | 2 | 3 => {
  return 3;
};

function findNextPuzzle<T extends {id: string}>(
  completedPuzzleIds: Record<string, true>,
  puzzles: Array<T>
): T {
  const firstNonCompletedPuzzle = puzzles.find(item => !completedPuzzleIds[item.id]);
  return firstNonCompletedPuzzle ?? puzzles[
    Math.floor(Math.random() * puzzles.length)
  ];
}

export default function PuzzleWordMerge({
  instructions,
  onPuzzleSolved,
  onPuzzleFailed,
  completedPuzzleIds,
  difficulty,
}: Puzzle) {
  const [isFailMessageOpen, setIsFailMessageOpen] = useState(false);
  const puzzle = findNextPuzzle(completedPuzzleIds, puzzles);
  const puzzleId = puzzle.id;

  if (puzzle == null) {
    throw new Error(`No wordMergePuzzle with id ${puzzleId}`);
  }

  const [attemptsRemaining, setAttemptsRemaining] = useState<number>(4);

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
      onPuzzleSolved(3, puzzleId);
    });
  }, [puzzleId]);

  const onFinishSolvingPuzzle = () => {
    const rating = getPuzzleRating(resolvedWords.length, toposort(puzzle.graph).length);
    onPuzzleSolved(rating, puzzleId); 
  };

  useEffect(() => {
    if (resolvedWords.length === 1) {
      setTimeout(onFinishSolvingPuzzle, 2000);
    }
  }, [resolvedWords]);

  useEffect(() => {
    if (attemptsRemaining === 0) {
      onPuzzleFailed();
    }
  }, [attemptsRemaining]);

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
      setIsFailMessageOpen(true);
      setAttemptsRemaining(attempts => --attempts);
    }
  };

  const onClickReset = () => {
    setMergedWords(new Set());
    setSelectedWords(new Set());
    setAttemptsRemaining(4);
  };

  const heartIcons = [];

  for (let i=1; i<=4; i++) {
    if (i > attemptsRemaining) {
      heartIcons.push(
        <FavoriteBorder sx={{color: '#555'}} />
      );
    } else {
      heartIcons.push(
        <Favorite sx={{color: '#555'}} />
      );
    }
  }
  

  return <div>
    <Snackbar
      open={isFailMessageOpen}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      onClose={() => {
        setIsFailMessageOpen(false);
      }}
      color="error"
    >
      <Alert
        icon={<SentimentDissatisfied />}
        variant="filled"
        color="error"
        >The words must relate to a common theme</Alert>
    </Snackbar>
    <Box style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '16px'}}>
      <Typography variant="caption" style={{marginRight: '5px'}}>Attempts:</Typography> 
      {heartIcons}
    </Box>

    <Alert title="How to Play" severity="info" style={{margin: '16px'}}>
      {instructions}
    </Alert>

    <Grid container spacing={2} style={{marginBottom: '16px'}}>
      {resolvedWords.map(term => (
        <Grid item xs={4} key={term}>
          <Button
            fullWidth
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
