import React, { useState } from 'react';

export default function AutoBetSimulator({ prediction }) {
  const [balance, setBalance] = useState(1000);
  const [betSize, setBetSize] = useState(10);

  function handleBet() {
    if (!prediction.predicted) return;
    const win = Math.random() < prediction.confidence;
    setBalance((b) => b + (win ? betSize * (prediction.predicted - 1) : -betSize));
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>Auto Bet Simulator</h3>
      <p>Balance: {balance.toFixed(2)}</p>
      <button onClick={handleBet}>Simulate Bet</button>
    </div>
  );
}
