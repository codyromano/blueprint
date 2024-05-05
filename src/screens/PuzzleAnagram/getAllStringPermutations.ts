export default function getAllStringPermutations(inputString: string): string[] {
    const result: string[] = [];

    function permute(current: string, remaining: string) {
        if (remaining.length === 0) {
            result.push(current);
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            const nextChar = remaining[i];
            const rest = remaining.slice(0, i) + remaining.slice(i + 1);
            permute(current + nextChar, rest);
        }
    }

    permute('', inputString);
    return result;
}