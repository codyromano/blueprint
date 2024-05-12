export const NO_DEPENDENCIES = '';

export type WordMergeTerm = string;
  

type WordMergePuzzle = {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  graph: Array<[WordMergeTerm, WordMergeTerm]>;
};

// TODO: Maybe some basic validation
const validatePuzzle = (puzzle: WordMergePuzzle) => puzzle;

const puzzles: WordMergePuzzle[] = [
  {
    id: '1',
    difficulty: 'easy',
    graph: [
      ['Hammer', NO_DEPENDENCIES],
      ['Nail', NO_DEPENDENCIES],
      ['Screwdriver', NO_DEPENDENCIES],
      ['Seattle', NO_DEPENDENCIES],
      ['Building', 'Hammer'],
      ['Building', 'Nail'],
      ['Building', 'Screwdriver'],
      ['Space Needle', 'Building'],
      ['Space Needle', 'Seattle']
    ]
  },
  {
    id: '2',
    difficulty: 'medium',
    graph: [
      ['Ring', NO_DEPENDENCIES],
      ['Box', NO_DEPENDENCIES],
      ['Star', NO_DEPENDENCIES],
      ['Light', NO_DEPENDENCIES],
      ['Dust', NO_DEPENDENCIES],
      ['Ball', NO_DEPENDENCIES],
      ['Tree', NO_DEPENDENCIES],
      ['Night', NO_DEPENDENCIES],
      ['Wave', NO_DEPENDENCIES],
    ]
  }
];

puzzles.forEach(puzzle => validatePuzzle(puzzle));

export default puzzles;