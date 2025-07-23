const SOCKET_URL = 'wss://solpump.com/ws'; // Replace with actual endpoint

class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Set();
  }

  connect() {
    if (this.socket) return;
    this.socket = new WebSocket(SOCKET_URL);
    this.socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        // Expected format: { multiplier: Number }
        if (data && typeof data.multiplier === 'number') {
          this.broadcast(data.multiplier);
        }
      } catch (e) {
        console.error('WS parse error', e);
      }
    });
    this.socket.addEventListener('error', console.error);
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
