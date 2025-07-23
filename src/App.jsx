import React, { useEffect, useState } from 'react';
import { startSimulation } from './services/SimulatedStream';
import { predict } from './services/PredictionEngine';
import Chart from './components/Chart';
import AutoBet from './components/AutoBet';
import { sendTelegramAlert } from './hooks/useTelegramBot';
import { useWallet } from './hooks/useWallet';

export default function App() {
  const [multipliers, setMultipliers] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const wallet = useWallet();

  useEffect(() => {
    startSimulation(mult => {
      setMultipliers(prev => [mult, ...prev.slice(0, 19)]);
    });
  }, []);

  useEffect(() => {
    if (multipliers.length >= 10) {
      const pred = predict(multipliers);
      setPrediction(pred);
      if (pred.confidence > 0.8 && pred.willCrash) {
        sendTelegramAlert(`⚠️ High crash risk predicted. Confidence: ${(pred.confidence*100).toFixed(1)}%`);
      }
    }
  }, [multipliers]);

  const data = multipliers.map((m, i) => ({ index: i, multiplier: m }));

  return <div style={{ padding: 20, color: 'white', background: '#111', minHeight: '100vh', fontFamily: 'sans-serif' }}>
    <h1>🚀 Solpump Predictor</h1>
    <p><strong>Wallet:</strong> {wallet.publicKey} ({wallet.balance} SOL)</p>
    {prediction ? <p>Prediction: <b style={{ color: prediction.willCrash ? 'red' : 'lime' }}>{prediction.willCrash ? 'Crash Likely' : 'Safe'}</b> — Confidence: {(prediction.confidence*100).toFixed(1)}%</p> : <p>Gathering data...</p>}
    <Chart data={data} />
    <AutoBet onBet={() => {}} prediction={prediction || { willCrash: false }} />
  </div>;
}