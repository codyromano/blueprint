export const NO_DEPENDENCIES = '';

export type WordMergeTerm = 
  typeof NO_DEPENDENCIES |
  'Building' |
  'Hammer' |
  'Nail' |
  'Screwdriver' |
  'Space Needle' |
  'Seattle';

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
  }
];

puzzles.forEach(puzzle => validatePuzzle(puzzle));

export default puzzles;