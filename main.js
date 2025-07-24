
import { io } from "socket.io-client";

const socket = io("wss://backend.solpump.com", {
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("✅ Connected to Solpump");
  document.getElementById("app").textContent = "Connected... waiting for multipliers";
});

socket.on("navbar:crash", (multiplier) => {
  console.log("Live multiplier:", multiplier);
  document.getElementById("app").textContent = `Multiplier: ${multiplier}x`;
});
