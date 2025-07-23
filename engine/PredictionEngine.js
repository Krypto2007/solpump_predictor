export function predictNextCrash(multipliers) {
  // basic heuristic: average of last 10 multipliers
  if (multipliers.length < 10) return { predicted: null, confidence: 0 };
  const recent = multipliers.slice(-10);
  const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const predicted = avg * 0.8; // heuristic scaling
  const confidence = Math.min(1, avg / 10); // simple confidence
  return { predicted, confidence };
}
