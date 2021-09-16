import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TabBar, ListView } from 'antd-mobile';

import Message from '@/components/Message';

import { randomColor, randomChar } from '@/utils/util.js';

const Chat = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let arr = [];
    var obj = {};
    for (let i = 0; i < 20; i++) {
      obj = {};
      obj.data = 'hello';
      obj.isMe = i % 2 == 0 ? true : false;
      obj.user = randomChar();
      obj.root = false;
      obj.avatar_color = randomColor();
      arr.push(obj);
    }
    setData(arr);
  }, []);

  return (
    <>
      <div style={{ background: '#b5ffb47a' }}>
        <Message msg={data} />
      </div>
    </>
  );
};
export default Chat;
