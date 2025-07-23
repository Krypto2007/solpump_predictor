export function predict(multis) {
  const recent = multis.slice(0, 10);
  const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const crashRisk = avg < 3;
  return {
    willCrash: crashRisk,
    confidence: Math.min(1, avg / 10),
    avg
  };
}