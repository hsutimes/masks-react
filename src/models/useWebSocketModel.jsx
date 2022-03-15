import { useState, useCallback } from 'react';
import {
  useWebSocket,
  useReactive,
  useUpdateEffect,
  useCookieState,
  useLocalStorageState,
} from 'ahooks';
import { notification } from 'antd';
import { history } from 'umi';

import notify from '@/utils/notify';

import conf from '@/utils/conf';

const ReadyState = {
  Connecting: 0,
  Open: 1,
  Closing: 2,
  Closed: 3,
};

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/**
 * latestMessage	最新消息
 * sendMessage	发送消息函数
 * disconnect	手动断开 webSocket 连接
 * connect	手动连接 webSocket，如果当前已有连接，则关闭后重新连接
 * readyState	当前 webSocket 连接状态
 * webSocketIns	webSocket
 *
 * 初始化
 * 发送消息
 * 断开连接
 *
 * @returns
 */
export default function useWebSocketModel() {
  const [nickname, setNickname] = useCookieState('account');

  const [host, setHost] = useState('');

  const [conn, setConn] = useState(null);
  const [nums, setNums] = useState(0);
  const [peoples, setPeoples] = useState([]);
  const [message, setMessage] = useState([]);

  const [historyMsg, setHistoryMsg] = useLocalStorageState('msg'); // 缓存历史消息

  const {
    readyState,
    sendMessage,
    latestMessage,
    disconnect,
    connect,
    webSocketIns,
  } = useWebSocket(host, {
    manual: true, // 手动启动连接
    reconnectLimit: 10, // 重试次数
    reconnectInterval: 3000, // 重试时间间隔（ms）
    onOpen: (e, ws) => {
      // console.log(webSocketIns);
      // 首次发送，注册用户名
      setConn(ws);
      // sendMsg('大家好，我是' + nickname);
      notification.success({ message: '连接成功' });
      ping(ws);
    },
    onMessage: (e, ws) => {
      onMessage(e, ws);
    },
    onError: (e, ws) => {
      // notification.error({ message: '连接出错' });
    },
    onClose: (e, ws) => {
      notification.error({ message: '连接关闭' });
    },
  });

  useUpdateEffect(() => {
    // console.log(host);
    if (connect) {
      connect();
    }
  }, [host]);

  useUpdateEffect(() => {
    let t = [...message];
    if (t.length >= 100) {
      // 最多只保留100条消息
      t = t.slice(t.length - 100, t.length);
    }
    setHistoryMsg(t);
  }, [message]);

  // 初始化连接
  const init = useCallback((name) => {
    if (name) {
      setNickname(name);
      setHost(`${conf.host}/chat?token=${conf.token}&name=${name}`);
      // if (historyMsg) {
      //   setMessage(historyMsg);
      // }
    }
  }, []);

  // 定时发ping
  const ping = (ws) => {
    let t = setInterval(() => {
      // console.log(ws.readyState);
      if (ws.readyState == ReadyState.Closed) {
        clearInterval(t);
      }
      if (ws.readyState == ReadyState.Open) {
        ws.send('ping');
      }
    }, 10000);
  };

  // 断开连接
  const disConnect = (msg) => {
    if (disconnect) {
      disconnect();
    }
  };

  // 发送消息
  const sendMsg = (msg) => {
    if (webSocketIns) {
      // sendMessage(msg); // 执行出现 disconnected 异常
      webSocketIns.send(msg);
    }
  };

  // 接收消息
  const onMessage = (e, ws) => {
    let msg = e.data;
    if (msg.includes('nums')) {
      let l = parseInt(msg.split(': ')[1]);
      setNums(l);
    } else if (msg.includes('peoples')) {
      let l = msg.split(': ')[1];
      l = l.split(',');
      setPeoples(l);
    } else if (msg.includes('entered') || msg.includes('left')) {
      // donothing
    } else if (msg.includes('history')) {
      let l = msg.slice('history: '.length, msg.length);
      if (l) {
        l = l.split(',');
        // console.log(l);
        setMessage(l);
      }
    } else {
      let t = [...message];
      t.push(msg);
      setMessage([...t]);
      // console.log(msg);
      // 全局通知新消息
      if (history.location.pathname === '/') {
        // navigator.vibrate(200);
        notification.info({ message: msg, duration: 3 });
        // notify.notifyMsg(msg);
      }
    }
  };

  return {
    ReadyState,
    conn,
    nums,
    peoples,
    message,
    latestMessage,
    init,
    disConnect,
    sendMsg,
  };
}
