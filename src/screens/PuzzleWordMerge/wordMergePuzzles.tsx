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
      // Initial words
      ['Tiff', NO_DEPENDENCIES],
      ['Ria', NO_DEPENDENCIES],
      ['Kendra', NO_DEPENDENCIES],
      ['Reed', NO_DEPENDENCIES],
      ['One', NO_DEPENDENCIES],
      ['Three', NO_DEPENDENCIES],
      ['Limb', NO_DEPENDENCIES],
      ['Foot', NO_DEPENDENCIES],

      // Combinations
      ['Friends', 'Tiff'],
      ['Friends', 'Ria'],
      ['Friends', 'Kendra'],
      ['Friends', 'Reed'],
      ['Four', 'Three'],
      ['Four', 'One'],
      ['Legged', 'Limb'],
      ['Legged', 'Foot'],

      // Winning combo
      ['Momo & Emmy', 'Four'],
      ['Momo & Emmy', 'Legged'],
      ['Momo & Emmy', 'Friends']
    ]
  },
  {
    id: '3',
    difficulty: 'hard',
    graph: [
      ['Brand', NO_DEPENDENCIES],
      ['Collection', NO_DEPENDENCIES],
      ['Label', NO_DEPENDENCIES],
      ['Fashion', 'Brand'],
      ['Fashion', 'Collection'],
      ['Fashion', 'Label'],

      ['Diamond', NO_DEPENDENCIES],
      ['Emerald', NO_DEPENDENCIES],
      ['Saphire', NO_DEPENDENCIES],
      ['Jewels', 'Diamond'],
      ['Jewels', 'Emerald'],
      ['Jewels', 'Saphire'],

      ['Bunny', NO_DEPENDENCIES],
      ['Duck', NO_DEPENDENCIES],
      ['Martian', NO_DEPENDENCIES],
      ['Cartoon', 'Bunny'],
      ['Cartoon', 'Duck'],
      ['Cartoon', 'Martian'],

      ['Greece', NO_DEPENDENCIES],
      ['Cats', NO_DEPENDENCIES],
      ['Hair', NO_DEPENDENCIES],
      ['Live Show', 'Greece'],
      ['Live Show', 'Cats'],
      ['Live Show', 'Hair'],

      ['Taylor Swift', 'Fashion'],
      ['Taylor Swift', 'Live Show'],

      ['Bejeweled', 'Taylor Swift'],
      ['Bejewled', 'Jewels']
    ]
  }
];

puzzles.forEach(puzzle => validatePuzzle(puzzle));

export default puzzles;