import { io } from "socket.io-client";
const socket = io("wss://backend.solpump.com", { transports: ["websocket"] });

let data = [];
const MAX_POINTS = 20;

function renderChart() {
  const el = document.getElementById("chart");
  el.innerHTML = data.map((v, i) => `[${i}] ${v}x`).join("<br>");
}

socket.on("connect", () => {
  document.getElementById("app").textContent = "✅ Connected to Solpump";
});

socket.on("navbar:crash", (multiplier) => {
  data.unshift(multiplier);
  if (data.length > MAX_POINTS) data.pop();
  renderChart();
  fetch("http://localhost:4000/api/multiplier", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet: "mock_wallet_address", multiplier }),
  });
});