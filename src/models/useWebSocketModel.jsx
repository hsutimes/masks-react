import { useState, useCallback } from 'react';
import { useWebSocket, useReactive, useUpdateEffect } from 'ahooks';

import conf from '@/utils/conf';

const ReadyState = {
  Connecting: 0,
  Open: 1,
  Closing: 2,
  Closed: 3,
};

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
  const state = useReactive({
    nickname: '',
  });

  const [conn, setConn] = useState(null);
  const [nums, setNums] = useState(0);
  const [peoples, setPeoples] = useState([]);
  const [message, setMessage] = useState([]);

  const {
    readyState,
    sendMessage,
    latestMessage,
    disconnect,
    connect,
    webSocketIns,
  } = useWebSocket(conf.host, {
    manual: true, // 手动启动连接
    reconnectLimit: 10, // 重试次数
    reconnectInterval: 3000, // 重试时间间隔（ms）
    onOpen: (e, ws) => {
      console.log('连接成功');
      // console.log(webSocketIns);
      // 首次发送，注册用户名
      setConn(webSocketIns);
      sendMsg(state.nickname);
    },
    onMessage: (e, ws) => {
      onMessage(e, ws);
    },
    onError: (e, ws) => {
      console.log('连接出错');
    },
  });

  const init = useCallback((nickname) => {
    if (nickname) {
      state.nickname = nickname;
    }
    if (connect) {
      connect();
    }
  }, []);

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
    } else {
      message.push(msg);
      setMessage([...message]);
      // cb(msg);
      // console.log(msg);
    }
  };

  return {
    ReadyState,
    readyState,
    conn,
    nums,
    peoples,
    message,
    init,
    disConnect,
    sendMsg,
  };
}
