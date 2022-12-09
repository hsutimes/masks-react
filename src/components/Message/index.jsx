import React, { useState, useEffect } from 'react';
import { Avatar, Button, Image } from 'antd';
import { scrollToY } from '@/utils/sliding-scroll';
import { useUpdateEffect } from 'ahooks';
import Markdown from 'marked-react';
import Lowlight from 'react-lowlight';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import classNames from 'classnames';
import conf from '@/utils/conf';
import styles from './index.less';

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
  });
});

const renderer = {
  code(snippet, lang) {
    return <Lowlight key={this.elementId} language={lang} value={snippet} />;
  },
};

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
          {msg.map((i, k) => (
            <div
              key={k}
              className={classNames(
                styles.item,
                i.isMe ? styles.me : styles.other,
              )}
            >
              <div className={styles.avatar}>
                <Avatar style={i.avatar_color} size={38}>
                  {user(i)}
                </Avatar>
              </div>
              <div className={styles.msg_body}>
                {conf.settings.isShowNickname && (
                  <div className={styles.nickname}>
                    <span>
                      {conf.settings.isAnonymity ? 'Anonymity' : i.user}
                    </span>
                  </div>
                )}
                {i.data?.includes('img|') ? (
                  <div className={styles.img}>
                    <Image
                      src={i.data.split('|')[1]}
                      style={{ borderRadius: 8 }}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className={styles.msg_bg}>
                    <div className={styles.message}>
                      <Markdown
                        value={i.data}
                        renderer={renderer}
                        breaks={true}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};
export default Message;
