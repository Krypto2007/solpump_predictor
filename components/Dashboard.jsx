import React from 'react';
import useLiveMultipliers from '../hooks/useLiveMultipliers.js';
import { predictNextCrash } from '../engine/PredictionEngine.js';
import MultiplierChart from './MultiplierChart.jsx';
import AutoBetSimulator from './AutoBetSimulator.jsx';

export default function Dashboard() {
  const multipliers = useLiveMultipliers(50);
  const prediction = predictNextCrash(multipliers);

  return (
    <div>
      <MultiplierChart data={multipliers} />
      <div style={{ marginTop: '1rem' }}>
        <h2>Prediction</h2>
        {prediction.predicted ? (
          <>
            <p>Next Crash Predicted at: <strong>{prediction.predicted.toFixed(2)}x</strong></p>
            <p>Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
          </>
        ) : (
          <p>Gathering data...</p>
        )}
      </div>
      <AutoBetSimulator prediction={prediction} />
    </div>
  );
}
