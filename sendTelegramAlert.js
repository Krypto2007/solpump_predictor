const axios = require("axios");
const BOT_TOKEN = "your_telegram_bot_token";
const CHAT_ID = "your_chat_id";

async function sendAlert(text) {
  await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text
  });
}

sendAlert("🔴 Crash below 2x detected!");