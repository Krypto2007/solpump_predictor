import { io } from 'socket.io-client';

const SOCKET_URL = "https://backend.solpump.com";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Set();
  }

  connect() {
    if (this.socket) return;
    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
      path: "/socket.io"
    });

    this.socket.on("connect", () => {
      console.log("Socket.IO connected");
    });

    // NOTE: Replace 'game_update' with the actual event name observed in devtools
    this.socket.on("game_update", (data) => {
      // Example structure: data might have multiplier info
      if (data && data.multiplier) {
        this.broadcast(data.multiplier);
      }
    });

    this.socket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });
  }

  broadcast(multiplier) {
    this.listeners.forEach((cb) => cb(multiplier));
  }

  subscribe(cb) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }
}

const instance = new WebSocketService();
export default instance;
