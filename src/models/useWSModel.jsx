import { useState, useCallback } from 'react';

export default function useWSModel() {
  const [conn, setConn] = useState(null);
  const [nums, setNums] = useState(0);
  const [message, setMessage] = useState([]);

  const init = useCallback((nickname, cb) => {
    let ws = new WebSocket('ws://192.168.0.100:8081');
    setConn(ws);
    window.ws = ws;
    ws.onopen = () => {
      ws.send(nickname);
      cb(true, '脑电波对接成功');
    };
  }, []);

  const onMessage = useCallback((cb) => {
    if (window.ws) {
      window.ws.onmessage = (event) => {
        let msg = event.data;
        if (msg.includes('nums')) {
          let l = parseInt(msg.split(': ')[1]);
          setNums(l);
        } else {
          message.push(msg);
          setMessage([...message]);
          cb(msg);
        }
      };
    }
  }, []);

  const onSend = useCallback((msg) => {
    if (window.ws) {
      window.ws.send(msg);
    }
  }, []);

  return {
    conn,
    nums,
    message,
    init,
    onMessage,
    onSend,
  };
}
