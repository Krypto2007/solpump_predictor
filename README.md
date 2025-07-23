# Solpump Predictor Website

## Overview

This project consists of a backend Node.js server connecting to Solpump's socket, and a React frontend showing crash predictions in real-time.

## Setup Instructions

### Backend
1. Navigate to the backend directory.
2. Run `npm install` to install dependencies.
3. Run `node server.js` to start the backend server.

### Frontend
1. Navigate to the frontend directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the React development server.

The frontend connects to the backend at `http://localhost:4000` by default. Adjust as needed for deployment.

## Deployment

- Deploy the backend on a Node.js capable hosting (Heroku, Render, etc).
- Deploy the React frontend on static hosting or platforms like Vercel.
- Ensure the frontend connects to the correct backend URL.

## Notes

- The backend listens to Solpump crash events and broadcasts predictions.
- The frontend displays live updates in a simple UI.