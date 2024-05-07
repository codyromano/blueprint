export type WordMergeTerm = 
  'Building' |
  'Hammer' |
  'Nail' |
  'Screwdriver' |
  'Space Needle' |
  'Seattle';

type WordMergePuzzle = {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  graph: Partial<Record<Partial<WordMergeTerm>, Partial<WordMergeTerm>[]>>;
};

const puzzles: WordMergePuzzle[] = [
  {
    id: '1',
    difficulty: 'easy',
    graph: {
      'Building': ['Hammer', 'Nail', 'Screwdriver'],
      'Seattle': ['Building', 'Space Needle']
    }
  }
];

export default puzzles;