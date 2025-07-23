import { useEffect, useState } from 'react';
import ws from '../services/WebSocketService.js';

export default function useLiveMultipliers(limit = 50) {
  const [multipliers, setMultipliers] = useState([]);

  useEffect(() => {
    ws.connect();
    const unsub = ws.subscribe((m) => {
      setMultipliers((prev) => {
        const next = [...prev, m].slice(-limit);
        return next;
      });
    });
    return unsub;
  }, [limit]);

  return multipliers;
}
