import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import conf from '@/utils/conf';

// import Header from './components/header';
// import './App.less';

const Test = () => {
  const ws = useRef();
  const [message, setMessage] = useState('');
  const [readyState, setReadyState] = useState('正在链接中');
  const [rdNum, SetRdNum] = useState();

  /**
   * 伪随机函数，测试用
   *  */
  const getRandomInt = useCallback(() => {
    SetRdNum(Math.floor(Math.random() * Math.floor(999)));
  }, []);

  const webSocketInit = useCallback(() => {
    const stateArr = [
      '正在链接中',
      '已经链接并且可以通讯',
      '连接正在关闭',
      '连接已关闭或者没有链接成功',
    ];
    if (!ws.current || ws.current.readyState === 3) {
      ws.current = new WebSocket(conf.host);
      ws.current.onopen = (_e) =>
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onclose = (_e) =>
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onerror = (e) =>
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onmessage = (e) => {
        setMessage(e.data);
      };
    }
  }, [ws]);

  /**
   * 初始化 WebSocket
   * 且使用 WebSocket 原声方法获取信息
   *  */
  useLayoutEffect(() => {
    getRandomInt();
    webSocketInit();
    return () => {
      ws.current?.close();
    };
  }, [ws, getRandomInt, webSocketInit]);

  console.log('ws.readyState', ws.current?.readyState);

  return (
    <div className="App">
      {/* <Header status={readyState} /> */}
      <div className="container">
        <div>{message}</div>
        <div>{readyState}</div>
        <div
          onClick={() => {
            ws.current?.close();
          }}
        >
          Close
        </div>
        <div
          onClick={() => {
            getRandomInt();
            webSocketInit();
          }}
        >
          start
        </div>
        <div
          onClick={() => {
            if (ws.current?.readyState !== 1) {
              console.log('尚未链接成功');
              setMessage('正在链接');
              return;
            }
            ws.current?.send('hello');
          }}
        >
          ID:{rdNum}
        </div>
      </div>
    </div>
  );
};

export default Test;
