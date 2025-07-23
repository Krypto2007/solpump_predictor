import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Change if deployed elsewhere

function App() {
  const [crash, setCrash] = useState(null);
  const [streak, setStreak] = useState(0);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    socket.on('crash_update', (data) => {
      setCrash(data.crash);
      setStreak(data.streak);
      setPrediction(data.prediction);
    });

    return () => {
      socket.off('crash_update');
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Arial', padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h1>Solpump Crash Predictor</h1>
      <p><strong>Last Crash:</strong> {crash ? crash + 'x' : 'Loading...'}</p>
      <p><strong>Current Streak:</strong> {streak}</p>
      <p><strong>Prediction:</strong> {prediction ? `${prediction.label} (Confidence: ${prediction.confidence}%)` : 'Loading...'}</p>
      <small>Data updates live from Solpump backend.</small>
    </div>
  );
}

export default App;