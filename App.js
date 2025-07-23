// src/App.jsx
import { useEffect, useState } from 'react';
import { initSocket } from './services/WebSocketService';
import { predictCrash } from './services/PredictionEngine';

export default function App() {
  const [multipliers, setMultipliers] = useState([]);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    initSocket((newMultiplier) => {
      setMultipliers((prev) => [newMultiplier, ...prev.slice(0, 19)]);
      const pred = predictCrash([newMultiplier, ...multipliers]);
      setPrediction(pred);
    });
  }, [multipliers]);

  return (
    <div className="p-4 font-mono text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🔮 Solpump Predictor Dashboard</h1>

      <div className="mb-4">
        <strong>Latest Prediction:</strong>{' '}
        <span className={prediction?.willCrash ? 'text-red-500' : 'text-green-400'}>
          {prediction?.willCrash ? '⚠️ Likely Crash' : '✅ Safe'}
        </span>
        <br />
        <strong>Confidence:</strong> {Math.round((prediction?.confidence || 0) * 100)}%
      </div>

      <h2 className="text-xl font-semibold mb-2">📊 Recent Multipliers</h2>
      <ul className="grid grid-cols-5 gap-2">
        {multipliers.map((m, i) => (
          <li key={i} className="p-2 bg-gray-800 rounded text-center">
            {m}×
          </li>
        ))}
      </ul>
    </div>
  );
}
