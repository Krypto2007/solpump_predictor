import { useState } from 'react';
export default function AutoBet({ onBet, prediction }) {
  const [balance, setBalance] = useState(1000);
  function handleBet() {
    const win = !prediction.willCrash;
    const amount = 10;
    const updated = balance + (win ? amount : -amount);
    setBalance(updated);
    onBet({ amount, win });
  }
  return <div><h3>Auto Bet Simulator</h3><p>Balance: {balance.toFixed(2)}</p><button onClick={handleBet}>Simulate Bet</button></div>;
}