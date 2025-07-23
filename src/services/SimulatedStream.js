export function startSimulation(callback) {
  setInterval(() => {
    const simulated = parseFloat((Math.random() * 10 + 1).toFixed(2));
    callback(simulated);
  }, 3000);
}