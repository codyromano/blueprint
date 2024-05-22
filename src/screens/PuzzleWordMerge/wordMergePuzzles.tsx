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
    id: 'wordMerge1',
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
    id: 'wordMerge2',
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
    id: 'wordMergeUniversalStudios',
    difficulty: 'medium',
    graph: [
      ['Play', NO_DEPENDENCIES],
      ['Kids', NO_DEPENDENCIES],
      ['Park', 'Play'],
      ['Park', 'Kids'],

      ['Mario', NO_DEPENDENCIES],
      ['Luigi', NO_DEPENDENCIES],
      ['Peach', NO_DEPENDENCIES],
      ['Game', 'Mario'],
      ['Game', 'Luigi'],
      ['Game', 'Peach'],

      ['Water', NO_DEPENDENCIES],
      ['Dirt', NO_DEPENDENCIES],
      ['Air', NO_DEPENDENCIES],
      ['World', 'Water'],
      ['World', 'Dirt'],
      ['World', 'Air'],

      ['Universal Studios', 'Park'],
      ['Universal Studios', 'Game'],
      ['Universal Studios', 'World']
    ]
  },
  {
    id: 'wordMergePokemonRave',
    difficulty: 'medium',
    graph: [
      ['Lights', NO_DEPENDENCIES],
      ['Music', NO_DEPENDENCIES],
      ['Party', 'Lights'],
      ['Party', 'Music'],

      ['Bear', NO_DEPENDENCIES],
      ['Penguin', NO_DEPENDENCIES],
      ['Chicken', NO_DEPENDENCIES],
      ['Animal', 'Bear'],
      ['Animal', 'Penguin'],
      ['Animal', 'Chicken'],

      ['Invisibility', NO_DEPENDENCIES],
      ['Teleportation', NO_DEPENDENCIES],
      ['Telekinesis', NO_DEPENDENCIES],
      ['Superpower', 'Invisibility'],
      ['Superpower', 'Teleportation'],
      ['Superpower', 'Telekinesis'],

      ['Pokémon Rave', 'Party'],
      ['Pokémon Rave', 'Animal'],
      ['Pokémon Rave', 'Superpower']
    ]
  },
  {
    id: 'wordMerge3',
    difficulty: 'medium',
    graph: [
      ["Ad-lib", NO_DEPENDENCIES],
      ["Freestyle", NO_DEPENDENCIES],
      ["Improv", NO_DEPENDENCIES],
      ["Make up", NO_DEPENDENCIES],
      ["Invent as you go", "Ad-lib"],
      ["Invent as you go", "Freestyle"],
      ["Invent as you go", "Improv"],
      ["Invent as you go", "Make up"],

      ["Babble", NO_DEPENDENCIES],
      ["Coo", NO_DEPENDENCIES],
      ["Crawl", NO_DEPENDENCIES],
      ["Nurse", NO_DEPENDENCIES],
      ["Things babies do", "Babble"],
      ["Things babies do", "Coo"],
      ["Things babies do", "Crawl"],
      ["Things babies do", "Nurse"],

      ["Cosmetic", NO_DEPENDENCIES],
      ["External", NO_DEPENDENCIES],
      ["Shallow", NO_DEPENDENCIES],
      ["Surface", NO_DEPENDENCIES],

      ["Superficial", "Cosmetic"],
      ["Superficial", "External"],
      ["Superficial", "Shallow"],
      ["Superficial", "Surface"],

      ["Butterfly", NO_DEPENDENCIES],
      ["Domino", NO_DEPENDENCIES],
      ["Placebo", NO_DEPENDENCIES],
      ["Side 12", NO_DEPENDENCIES],
      ["Effect", "Butterfly"],
      ["Effect", "Domino"],
      ["Effect", "Placebo"],
      ["Effect", "Side 12"]
    ]
    },
  {
    id: 'wordMerge4',
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
  },
  {
    id: 'wordMerge5',
    difficulty: 'medium',
    graph: [
      ["Article", NO_DEPENDENCIES],
      ["Feature", NO_DEPENDENCIES],
      ["Report", NO_DEPENDENCIES],
      ["Story", NO_DEPENDENCIES],
      ["Journalism", "Article"],
      ["Journalism", "Feature"],
      ["Journalism", "Report"],
      ["Journalism", "Story"],

      ["Even", NO_DEPENDENCIES],
      ["Flat", NO_DEPENDENCIES],
      ["Flush", NO_DEPENDENCIES],
      ["Level", NO_DEPENDENCIES],
      ["Plane", "Even"],
      ["Plane", "Flat"],
      ["Plane", "Flush"],
      ["Plane", "Level"],

      ["Boeing", "Journalism"],
      ["Boeing", "Plane"]
    ]
  },
  {
    id: 'wordMerge6',
    difficulty: 'medium',
    graph: [
      ["Column", NO_DEPENDENCIES],
      ["Pillar", NO_DEPENDENCIES],
      ["Pole", NO_DEPENDENCIES],
      ["Post", NO_DEPENDENCIES],
      ["Support", "Column"],
      ["Support", "Pillar"],
      ["Support", "Pole"],
      ["Support", "Post"],
      ["Follow", NO_DEPENDENCIES],
      ["Mind", NO_DEPENDENCIES],
      ["Observe", NO_DEPENDENCIES],
      ["Regard", NO_DEPENDENCIES],
      ["Rules", "Follow"],
      ["Rules", "Mind"],
      ["Rules", "Observe"],
      ["Rules", "Regard"],
      ["Interest", NO_DEPENDENCIES],
      ["Percentage", NO_DEPENDENCIES],
      ["Share", NO_DEPENDENCIES],
      ["Stake", NO_DEPENDENCIES],
      ["Finance", "Interest"],
      ["Finance", "Percentage"],
      ["Finance", "Share"],
      ["Finance", "Stake"],

      ["Allowance", "Finance"],
      ["Allowance", "Support"],

      ["Parenting", "Allowance"],
      ["Parenting", "Rules"]
    ]
  },
  {
    id: 'wordMerge7',
    difficulty: 'medium',
    "graph": [
      ["Aim", NO_DEPENDENCIES],
      ["Intend", NO_DEPENDENCIES],
      ["Mean", NO_DEPENDENCIES],
      ["Plan", NO_DEPENDENCIES],
      ["Have in mind", "Aim"],
      ["Have in mind", "Intend"],
      ["Have in mind", "Mean"],
      ["Have in mind", "Plan"],
      ["Curb", NO_DEPENDENCIES],
      ["Grate", NO_DEPENDENCIES],
      ["Gutter", NO_DEPENDENCIES],
      ["Manhole", NO_DEPENDENCIES],
      ["Sidewalk", "Curb"],
      ["Sidewalk", "Grate"],
      ["Sidewalk", "Gutter"],
      ["Sidewalk", "Manhole"],
      ["Cal", NO_DEPENDENCIES],
      ["Gal", NO_DEPENDENCIES],
      ["Oz", NO_DEPENDENCIES],
      ["1", NO_DEPENDENCIES],
      ["Units", "Cal"],
      ["Units", "Gal"],
      ["Units", "Oz"],
      ["Units", "1"],

      ["Recycling", "Units"],
      ["Recycling", "Sidewalk"],

      ["Thursday", "Have in mind"],
      ["Thursday", "Recycling"]
    ]
  },
  {
    id: 'wordMerge8',
    difficulty: 'medium',
    "graph": [
      ["Adhere", NO_DEPENDENCIES],
      ["Glue", NO_DEPENDENCIES],
      ["Paste", NO_DEPENDENCIES],
      ["Stick", NO_DEPENDENCIES],
      ["Attach", "Adhere"],
      ["Attach", "Glue"],
      ["Attach", "Paste"],
      ["Attach", "Stick"],
      ["Copy", NO_DEPENDENCIES],
      ["Text", NO_DEPENDENCIES],
      ["Words", NO_DEPENDENCIES],
      ["Writing", NO_DEPENDENCIES],
      ["Published", "Copy"],
      ["Published", "Text"],
      ["Published", "Words"],
      ["Published", "Writing"],
      ["Carat", NO_DEPENDENCIES],
      ["Clarity", NO_DEPENDENCIES],
      ["Color", NO_DEPENDENCIES],
      ["Cut", NO_DEPENDENCIES],
      ["Diamond", "Carat"],
      ["Diamond", "Clarity"],
      ["Diamond", "Color"],
      ["Diamond", "Cut"],
      ["List", NO_DEPENDENCIES],
      ["Ok", NO_DEPENDENCIES],
      ["Plus", NO_DEPENDENCIES],
      ["Rod", NO_DEPENDENCIES],
      ["A-", "List"],
      ["A-", "Ok"],
      ["A-", "Plus"],
      ["A-", "Rod"]
    ]
  },
  {
    id: 'wordMerge9',
    difficulty: 'easy',
    "graph": [
      ["Bunk", NO_DEPENDENCIES],
      ["Crock", NO_DEPENDENCIES],
      ["Hogwash", NO_DEPENDENCIES],
      ["Horsefeathers", NO_DEPENDENCIES],
      ["Balderdash", "Bunk"],
      ["Balderdash", "Crock"],
      ["Balderdash", "Hogwash"],
      ["Balderdash", "Horsefeathers"],
      ["Baton", NO_DEPENDENCIES],
      ["Hammer", NO_DEPENDENCIES],
      ["Hurdle", NO_DEPENDENCIES],
      ["Pole", NO_DEPENDENCIES],
      ["Track", "Baton"],
      ["Track", "Hammer"],
      ["Track", "Hurdle"],
      ["Track", "Pole"]
    ]
  },
  {
    id: 'wordMerge10',
    difficulty: 'hard',
    "graph": [
      ["Bud", NO_DEPENDENCIES],
      ["Chum", NO_DEPENDENCIES],
      ["Mate", NO_DEPENDENCIES],
      ["Pal", NO_DEPENDENCIES],
      ["Friend", "Bud"],
      ["Friend", "Chum"],
      ["Friend", "Mate"],
      ["Friend", "Pal"],
      ["Cold", NO_DEPENDENCIES],
      ["Dank", NO_DEPENDENCIES],
      ["Dark", NO_DEPENDENCIES],
      ["Musty", NO_DEPENDENCIES],
      ["Basement", "Cold"],
      ["Basement", "Dank"],
      ["Basement", "Dark"],
      ["Basement", "Musty"],
      ["Fuzz", NO_DEPENDENCIES],
      ["Scruff", NO_DEPENDENCIES],
      ["Shadow", NO_DEPENDENCIES],
      ["Whiskers", NO_DEPENDENCIES],
      ["Stubble", "Fuzz"],
      ["Stubble", "Scruff"],
      ["Stubble", "Shadow"],
      ["Stubble", "Whiskers"],
      ["Fund", NO_DEPENDENCIES],
      ["Kitty", NO_DEPENDENCIES],
      ["Pool", NO_DEPENDENCIES],
      ["Pot", NO_DEPENDENCIES],
      ["Money", "Fund"],
      ["Money", "Kitty"],
      ["Money", "Pool"],
      ["Money", "Pot"]
    ]
  }
];

puzzles.forEach(puzzle => validatePuzzle(puzzle));

function shuffle<T>(_a: T, _b: T): number {
  return Math.random() > 0.5 ? -1 : 1;
}

for (const puzzle of puzzles) {
  puzzle.graph = puzzle.graph.sort(shuffle);
}


export default puzzles;