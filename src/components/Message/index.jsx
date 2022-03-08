import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TabBar, ListView } from 'antd-mobile';
import { Avatar, Button } from 'antd';

import styles from './index.less';

const Message = (props) => {
  const msg = props.msg;

  useEffect(() => {
    if (msg && msg.length != 0) {
      // console.log(msg);
    }
  }, [msg]);

  const user = (obj) => {
    if (!obj.root) return obj.user.charAt(0).toUpperCase();
    else return obj.user;
  };

  return (
    <>
      <div className={styles.chat}>
        <ul>
          {msg.map((i, k) => (
            <li key={k} className={i.isMe ? styles.me : styles.other}>
              <Avatar style={i.avatar_color}>{user(i)}</Avatar>
              <div style={{ margin: '0 56px' }}>{i.user}</div>
              <p className={styles.message}>{i.data}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Message;
