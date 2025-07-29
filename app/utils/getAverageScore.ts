export const getAverageScore = (scores: number[]): number => {
  if (scores.length === 0) return 0;

  const total = scores.reduce((acc, score) => acc + score, 0);
  return total / scores.length;
}