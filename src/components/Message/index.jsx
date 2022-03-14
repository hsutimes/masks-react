import React, { useState, useEffect } from 'react';
import { Avatar, Button, Image } from 'antd';
import { scrollToY } from '@/utils/sliding-scroll';
import { useUpdateEffect } from 'ahooks';
import styles from './index.less';

const Message = (props) => {
  // const msg = props.msg;

  const [msg, setMsg] = useState([]);

  const [count, setCount] = useState(0);

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

  useUpdateEffect(() => {
    if (count === 0) {
      // 首次进入页面，滚动到底部
      toBottom(0);
      setCount(1);
    } else {
      // 新消息，淡入淡出
      toBottom(500);
    }
  }, [msg]);

  const user = (obj) => {
    if (!obj.root) return obj.user.charAt(0).toUpperCase();
    else return obj.user;
  };

  const toBottom = (t) => {
    let ele = document.getElementById('scroll');
    scrollToY(ele.scrollHeight, t, ele);
  };

  return (
    <>
      <div id="scroll" className={styles.chat}>
        <Image.PreviewGroup>
          <ul>
            {msg.map((i, k) => (
              <li key={k} className={i.isMe ? styles.me : styles.other}>
                <Avatar style={i.avatar_color}>{user(i)}</Avatar>
                <div style={{ margin: '7px 56px 0px' }}>{i.user}</div>
                {i.data.includes('img|') ? (
                  <div className={styles.img}>
                    <Image
                      src={i.data.split('|')[1]}
                      style={{ borderRadius: 8 }}
                      alt=""
                    />
                  </div>
                ) : (
                  <p className={styles.message}>{i.data}</p>
                )}
              </li>
            ))}
          </ul>
        </Image.PreviewGroup>
      </div>
    </>
  );
};
export default Message;
