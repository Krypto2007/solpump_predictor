import React, { useEffect, useState } from 'react';
import ws from './services/WebSocketService.js';

function predictCrash(multipliers) {
  if (multipliers.length < 10) return { willCrash: false, confidence: 0 };
  const avg = multipliers.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
  return {
    willCrash: avg < 3.0,
    confidence: Math.min(1, avg / 10)
  };
}

export default function App() {
  const [multipliers, setMultipliers] = useState([]);
  const [prediction, setPrediction] = useState({ willCrash: false, confidence: 0 });

  useEffect(() => {
    ws.connect();
    const unsub = ws.subscribe((newMultiplier) => {
      setMultipliers((prev) => [newMultiplier, ...prev].slice(0, 20));
    });
    return unsub;
  }, []);

  useEffect(() => {
    setPrediction(predictCrash(multipliers));
  }, [multipliers]);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20, background: '#111', color: 'white', minHeight: '100vh' }}>
      <h1>🚀 Solpump Predictor Dashboard</h1>
      <h2>Live Prediction</h2>
      <p>
        Status: <b style={{ color: prediction.willCrash ? '#ff5555' : '#55ff55' }}>{prediction.willCrash ? '⚠️ Crash Likely' : 'Safe'}</b>
      </p>
      <p>Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>

      <h2>Recent Multipliers</h2>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 10, listStyle: 'none', padding: 0 }}>
        {multipliers.map((m, i) => (
          <li key={i} style={{ background: '#222', padding: 10, borderRadius: 4, minWidth: 60, textAlign: 'center' }}>
            {m.toFixed(2)}x
          </li>
        ))}
      </ul>
    </div>
  );
}
