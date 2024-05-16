import GameState from "./GameState";

type Puzzle = {
  difficulty: "easy" | "medium" | "hard" | "extreme";
  instructions: string;
  // The puzzles already completed. IDs may or may not correspond to the 
  // current puzzle implementation. Used to avoid repetition and make
  // puzzles more difficult over time.
  completedPuzzleIds: Record<string, true>;
  onPuzzleSolved: (rating: 0 | 1 | 2 | 3, puzzleId: string) => void;
  onPuzzleFailed: () => void;
};

export default Puzzle;
