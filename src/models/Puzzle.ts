import GameState from "./GameState";

type Puzzle = {
  difficulty: "easy" | "medium" | "hard" | "extreme";
  instructions: string;
  onPuzzleSolved: (rating: 0 | 1 | 2 | 3) => void;
  onPuzzleFailed: () => void;
};

export default Puzzle;
