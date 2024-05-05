export default function findAllPermutations(englishDictionary: Set<string>, input: string): string[] {
  const result: string[] = [];

  // Helper function to generate permutations recursively
  const generatePermutations = (str: string, permutation: string = '') => {
      if (str.length === 0) {
          // If there are no more characters left, add the permutation to the result
          if (englishDictionary.has(permutation) && !result.includes(permutation)) {
              result.push(permutation);
          }
      } else {
          for (let i = 0; i < str.length; i++) {
              // Choose one character at a time and generate permutations with remaining characters
              generatePermutations(str.slice(0, i) + str.slice(i + 1), permutation + str[i]);
          }
      }
  };

  // Start generating permutations
  generatePermutations(input);

  return result;
}