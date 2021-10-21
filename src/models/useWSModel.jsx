import { useState, useCallback } from 'react';

export default function useWSModel() {
  const [conn, setConn] = useState(null);

  const init = useCallback((nickname, cb) => {
    let ws = new WebSocket('ws://localhost:8081');
    setConn(ws);
    window.ws = ws;
    ws.onopen = () => {
      ws.send(nickname);
      cb(true);
    };
  }, []);

  const onMessage = useCallback((cb) => {
    if (window.ws) {
      window.ws.onmessage = (event) => {
        cb(event);
      };
    }
  }, []);

  return {
    conn,
    init,
    onMessage,
  };
}
