import React, { useContext, useEffect } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Puzzle from "../../models/Puzzle";
import useCountdown from "../../utils/useCountdown";
import "./PuzzleAnagram.css";
import englishWords from "./popularEnglishWords.json";
import useDebugCommand from "../../state/useDebugCommand";
import { Badge, Box, Button, Chip, Typography } from "@mui/material";
import { AccessTime, BadgeOutlined } from "@mui/icons-material";
import { formatCountdown } from "../../utils/timeUtils";
import { findNextPuzzle } from "../../utils/puzzleUtils";
import GameContext from "../../state/GameStateProvider";
import CharacterTrait from "../../models/CharacterTrait";


function getRandomItem<T>(items: T[]): T {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

const getAnagramWords = (puzzle: {
  id: string;
  word: string;
  anagrams: string[];
}) => {
  return puzzle.anagrams.concat(puzzle.word);
};

export default function PuzzleAnagram({
  instructions,
  onPuzzleSolved,
  onPuzzleFailed,
  completedPuzzleIds,
  difficulty,
}: Puzzle) {
  const puzzle = React.useMemo(() => findNextPuzzle(
    completedPuzzleIds,
    englishWords.words.map(item => ({ ...item, id: item.word}))
  ), []);

  const anagrams = React.useMemo(() => getAnagramWords(puzzle), []);
  const [game] = useContext(GameContext);
  const secondsLeft = useCountdown(game.player.trait === 'diva' ? 25 : 45);
  const {setCommandCallback} = useDebugCommand();
  
  const [wordGuessResult, setWordGuessResult] = React.useState<
    "unfinished" | "correct" | "incorrect"
  >("unfinished");
  const [discoveredWords, setDiscoveredWords] = React.useState<Set<string>>(
    new Set()
  );
  const [selectedLetterIndicies, setSelectedLetterIndicies] = React.useState<
    number[]
  >([]);
  const guess = selectedLetterIndicies.map((i) => anagrams[0][i]).join("");

  useEffect(() => {
    setCommandCallback('FINISH_PUZZLE_THREE_STARS', () => {
      setDiscoveredWords(new Set(anagrams));
    });
  }, []);

  const onClickLetter = (index: number) => {
    setSelectedLetterIndicies((letters) => {
      if (selectedLetterIndicies.length === anagrams[0].length) {
        return letters;
      }
      return letters.concat(index);
    });
  };

  const getPuzzleRating = () => {
    const percentageOfWordsDiscovered = discoveredWords.size / anagrams.length;

    if (percentageOfWordsDiscovered === 1) {
      return 3;
    }
    if (percentageOfWordsDiscovered >= 0.5) {
      return 2;
    }
    return percentageOfWordsDiscovered > 0 ? 1 : 0;
  };

  useEffect(() => {
    const ratingResult = getPuzzleRating();

    if (secondsLeft === 0 || ratingResult === 3) {
      if (ratingResult === 0) {
        onPuzzleFailed();
      } else {
        onPuzzleSolved(ratingResult, puzzle.id);
      }
    }
  }, [secondsLeft, puzzle]);

  useEffect(() => {
    if (selectedLetterIndicies.length === anagrams[0].length) {
      setWordGuessResult(anagrams.includes(guess) ? "correct" : "incorrect");
    }
  }, [selectedLetterIndicies]);

  const onWordGuessResultRevealed = () => {
    setWordGuessResult("unfinished");

    setDiscoveredWords((words) => {
      if (anagrams.includes(guess)) {
        words.add(guess);
      }
      return words;
    });

    setSelectedLetterIndicies([]);
  };

  return (
    <div className="puzzle-anagram">
      <div className="puzzle-overview">


      <Box display="flex" alignItems={"center"} gap="10px">
        <AccessTime fontSize="large" color="info" />
        <Typography fontSize="large" color="info">{
          Number.isFinite(secondsLeft) ? formatCountdown(secondsLeft) : secondsLeft
        }</Typography>

        {game.player.trait === CharacterTrait.DIVA && (
          <Chip label="Diva" color="warning" variant="filled" />
        )}
      </Box>
        
        <div className="puzzle-overview-row row">
          <h2>How to play</h2>
          <p>Find all of the anagrams of the provided letters.</p>
        </div>

        <div className="puzzle-overview-row row">
          <h2>
            Words Discovered ({discoveredWords.size} / {anagrams.length})
          </h2>
          <p>
            {discoveredWords.size > 0
              ? Array.from(discoveredWords).join(", ")
              : "None"}
          </p>
        </div>
      </div>

      <div className="puzzle-interaction-area">
        <div className={`digits-selected`}>
          <div
            className={`guess-result-${wordGuessResult}`}
            onAnimationEnd={onWordGuessResultRevealed}
          />
          {selectedLetterIndicies.map((index) => (
            <span key={index} className="digit-selector-button-selected">
              {anagrams[0][index]}
            </span>
          ))}
        </div>

        <div className="digit-selector">
          {anagrams[0].split("").map((letter, i) => (
            <Button
              key={i}
              variant="outlined"
              disabled={selectedLetterIndicies.includes(i)}
              onClick={() => onClickLetter(i)}
            >
              {letter}
            </Button>
          ))}
        </div>

          <div
            style={{
              display: "flex",
              marginTop: "2rem",
              gap: "2rem",
              justifyContent: "center",
            }}
          >
            {selectedLetterIndicies.length > 0 && <Button
              onClick={() => setSelectedLetterIndicies([])}
            >
              Reset
            </Button>}
          </div>
      </div>
    </div>
  );
}
