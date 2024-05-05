import React, { useEffect } from "react";
import Puzzle from "../../models/Puzzle";
import useCountdown from "../../utils/useCountdown";
import "./PuzzleAnagram.css";
import englishWords from "./popularEnglishWords.json";


function getRandomItem<T>(items: T[]): T {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

const getAnagramWords = () => {
  const targetItem = getRandomItem(englishWords.words);
  return targetItem.anagrams.concat(targetItem.word);
};

export default function PuzzleAnagram({
  instructions,
  onPuzzleSolved,
  onPuzzleFailed,
  difficulty,
}: Puzzle) {
  const anagrams = React.useMemo(() => getAnagramWords(), []);
  const secondsLeft = useCountdown(10);
  
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
        onPuzzleSolved(ratingResult);
      }
    }
  }, [secondsLeft]);

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
        <div className="puzzle-overview-row row">
          <h2>How to play</h2>
          <p>Find all of the anagrams of the provided letters.</p>
        </div>

        <div className="puzzle-overview-row row">
          <h2>Time Remaining</h2>
          <p>
            {secondsLeft} {secondsLeft === 1 ? "second" : "seconds"}
          </p>
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
            <button
              key={i}
              disabled={selectedLetterIndicies.includes(i)}
              onClick={() => onClickLetter(i)}
              className={`digit-selector-button ${
                selectedLetterIndicies.includes(i)
                  ? "digit-selector-digit-button-pressed"
                  : ""
              }`}
            >
              {letter}
            </button>
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
            {selectedLetterIndicies.length > 0 && <button
              style={{ color: "red", fontSize: "1rem" }}
              onClick={() => setSelectedLetterIndicies([])}
            >
              Reset
            </button>}
          </div>
      </div>
    </div>
  );
}
