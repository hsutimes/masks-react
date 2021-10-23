import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Input, List, Button } from 'antd-mobile-v5';
import { history, useModel } from 'umi';
import Cookies from 'js-cookie';
import * as Scroll from 'react-scroll';

import Message from '@/components/Message';
import { randomColor, randomChar } from '@/utils/util.js';
import styles from './index.less';

const Chat = () => {
  const { conn, nums, message, onSend } = useModel('useWSModel', (model) => ({
    conn: model.conn,
    nums: model.nums,
    message: model.message,
    onSend: model.onSend,
  }));
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const scroll = Scroll.animateScroll;

  useEffect(() => {
    let a = Cookies.get('account');
    let c = Cookies.get('avatar_color');
    if (!a || !c || !conn) {
      history.push('/login');
    } else {
      let arr = [];
      var obj = {};
      // console.log(message);
      for (let i = 0; i < message.length; i++) {
        obj = {};
        let msg = message[i].split(': ');
        if (msg[0] === 'entered' || msg[0] === 'left') {
          let t = msg[0] === 'entered' ? '欢迎' + msg[1] : msg[1] + '下线';
          obj.data = t;
          obj.isMe = false;
          obj.user = '^o^';
          obj.root = true;
          obj.avatar_color = { background: '#ff8f1f' };
          arr.push(obj);
          continue;
        }
        obj.data = msg[1];
        obj.isMe = msg[0] === a ? true : false;
        obj.user = msg[0];
        obj.root = false;
        obj.avatar_color = obj.isMe ? JSON.parse(c) : { background: '#00b578' };
        arr.push(obj);
        if (message.length > 7)
          setTimeout(() => {
            scrollToBottom();
          }, 500);
      }
      setData(arr);
    }
  }, [message]);

  const send = () => {
    if (!value) {
      return;
    }
    // console.log(value);
    onSend(value);
    setValue('');
  };

  const handleKeyPress = (event) => {
    console.log(event.key);
    if (event.key === 'Enter') {
      send();
    }
  };

  const back = () => {
    history.goBack();
  };

  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  return (
    <>
      <NavBar onBack={back}>Enjoying Time</NavBar>
      <div className={styles.message}>
        <Message msg={data} />
      </div>
      <div className={styles.footer}>
        <List
          style={{
            '--prefix-width': '6em',
          }}
        >
          <List.Item
            prefix=""
            extra={
              <Button color="primary" fill="solid" onClick={send}>
                发送
              </Button>
            }
          >
            <Input
              id="msg_input"
              placeholder="请输入内容"
              clearable
              value={value}
              onChange={(val) => {
                setValue(val);
              }}
              onKeyPress={handleKeyPress}
            />
          </List.Item>
        </List>
      </div>
    </>
  );
};
export default Chat;
