export function getStringSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const s2 = str2.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  
  if (s1 === s2) return 1.0;
  if (s1.length < 2 || s2.length < 2) {
    // If very short and not exact, return 0
    return 0.0;
  }
  
  const getBigrams = (str: string): Set<string> => {
    const bigrams = new Set<string>();
    for (let i = 0; i < str.length - 1; i++) {
      bigrams.add(str.substring(i, i + 2));
    }
    return bigrams;
  };
  
  const bigrams1 = getBigrams(s1);
  const bigrams2 = getBigrams(s2);
  
  let intersection = 0;
  bigrams1.forEach((bigram) => {
    if (bigrams2.has(bigram)) {
      intersection++;
    }
  });
  
  return (2.0 * intersection) / (bigrams1.size + bigrams2.size);
}

/**
 * Checks if two card texts are highly similar (threshold e.g. 0.65)
 */
export function isDuplicate(text1: string, text2: string): boolean {
  return getStringSimilarity(text1, text2) >= 0.65;
}
