# Solpump Predictor Website with Socket.IO

This project connects to Solpump.com backend using Socket.IO to get live multiplier updates.

## Setup

1. Run `npm install` to install dependencies including socket.io-client.
2. Run `npm run dev` to start locally.
3. Open http://localhost:5173 to view dashboard.

## Notes

- The WebSocketService listens for 'game_update' events. You should verify the actual event name and data structure from browser DevTools and update `WebSocketService.js` accordingly.
- The prediction logic is simple and based on average multipliers.
- This is a starter template; feel free to enhance prediction and UI.

