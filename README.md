# Solpump Predictor Website

This project provides:

- Live multiplier tracking via WebSocket
- Crash prediction engine (heuristic demo)
- Auto-bet simulation
- Telegram alert stub
- Vite + React front‑end
- Ready for Vercel deploy

## Quick Start

```bash
npm install
npm run dev
```

### Environment

- Edit `services/WebSocketService.js` with the proper Solpump WebSocket URL.
- To enable Telegram alerts, call `sendTelegramMessage` with your bot token and chat ID.

Deploy on Vercel: Build command `npm run build`, output `dist`.
