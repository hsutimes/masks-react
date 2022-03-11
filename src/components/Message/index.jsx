import React, { useState, useEffect } from 'react';
import { Avatar, Button } from 'antd';
import { scrollToY } from '@/utils/sliding-scroll';

import styles from './index.less';

const Message = (props) => {
  // const msg = props.msg;

  const [msg, setMsg] = useState([]);

  useEffect(() => {
    if (props.msg && props.msg.length != 0) {
      // 截取最近100条消息
      let msgArr = [...props.msg];
      if (msgArr.length > 100) {
        msgArr = msgArr.splice(msgArr.length - 100, msgArr.length);
      }
      setMsg(msgArr);
    }
  }, [props.msg]);

  useEffect(() => {
    toBottom();
  }, [msg]);

  const user = (obj) => {
    if (!obj.root) return obj.user.charAt(0).toUpperCase();
    else return obj.user;
  };

  const toBottom = () => {
    let ele = document.getElementById('scroll');
    scrollToY(ele.scrollHeight, 500, ele);
  };

  return (
    <>
      <div id="scroll" className={styles.chat}>
        <ul>
          {msg.map((i, k) => (
            <li key={k} className={i.isMe ? styles.me : styles.other}>
              <Avatar style={i.avatar_color}>{user(i)}</Avatar>
              <div style={{ margin: '7px 56px 0px' }}>{i.user}</div>
              <p className={styles.message}>{i.data}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Message;
