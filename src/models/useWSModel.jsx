import { useState, useCallback } from 'react';
import conf from '@/utils/conf';

export default function useWSModel() {
  const [conn, setConn] = useState(null);
  const [nums, setNums] = useState(0);
  const [peoples, setPeoples] = useState([]);
  const [message, setMessage] = useState([]);

  const init = useCallback((nickname, cb) => {
    let ws = new WebSocket(conf.host);
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
        } else if (msg.includes('peoples')) {
          let l = msg.split(': ')[1];
          l = l.split(',');
          setPeoples(l);
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
    peoples,
    message,
    init,
    onMessage,
    onSend,
  };
}
