require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { io: clientIo } = require('socket.io-client');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let streak = 0;
let lastCrash = null;
let baseBet = 1;
let currentBet = baseBet;
let balance = 100;

const solpumpSocket = clientIo('https://backend.solpump.com', { transports: ['websocket'] });

solpumpSocket.on('connect', () => {
  console.log('📡 Connected to Solpump Socket.IO server');
});

solpumpSocket.on('disconnect', () => {
  console.log('⚠️ Disconnected from Solpump server');
});

solpumpSocket.on('crash', (data) => {
  const crash = data?.multiplier || null;
  if (!crash) return;
  console.log(`🔥 Crash multiplier: ${crash}x`);

  // Update streak for prediction logic
  if (crash < 2) streak++;
  else streak = 0;
  lastCrash = crash;

  // Broadcast crash data and prediction to frontend clients
  io.emit('crash_update', {
    crash,
    streak,
    prediction: getPrediction(streak)
  });
});

function getPrediction(streak) {
  if (streak >= 3) return { label: '💥 Crash likely (<2x)', confidence: 90 };
  if (streak === 2) return { label: '⚠️ Possible Crash', confidence: 70 };
  return { label: '✅ Safe', confidence: 50 };
}

app.get('/status', (req, res) => {
  res.json({
    streak,
    lastCrash,
    balance,
    currentBet
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});