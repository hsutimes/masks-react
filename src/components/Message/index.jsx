import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from 'antd';
import { Image, ImageViewer } from 'antd-mobile';

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

  const ref = useRef();

  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState([]);
  const [imgList, setImgList] = useState([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (props.msg && props.msg.length != 0) {
      // 截取最近100条消息
      let msgArr = [...props.msg];
      if (msgArr.length > 100) {
        msgArr = msgArr.splice(msgArr.length - 100, msgArr.length);
      }
      let t = [];
      msgArr.map((i) => {
        if (i.data?.includes('img|')) {
          t.push(i.data.split('|')[1]);
        }
      });
      setImgList(t);
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

  const onImgClick = (e) => {
    let index = imgList.findIndex((i) => i == e);
    console.log(index);
    if (index != -1) {
      ref.current.swipeTo(index);
      setVisible(true);
    }
  };

  return (
    <>
      <div id="scroll" className={styles.chat}>
        {msg.map((i, k) => (
          <div
            key={k}
            className={classNames(
              styles.item,
              i.isMe ? styles.me : styles.other,
            )}
          >
            <div
              className={styles.avatar}
              style={{ opacity: i.isOnlyMsg ? 0 : 1 }}
            >
              <Avatar style={i.avatar_color} size={38}>
                {user(i)}
              </Avatar>
            </div>
            <div className={styles.msg_body}>
              {!i.isOnlyMsg && conf.settings.isShowNickname && (
                <div className={styles.nickname}>
                  <span>
                    {conf.settings.isAnonymity ? 'Anonymity' : i.user}
                  </span>
                </div>
              )}
              {i.data?.includes('img|') ? (
                <div
                  className={styles.img}
                  onClick={() => {
                    onImgClick(i.data.split('|')[1]);
                  }}
                >
                  <Image
                    src={i.data.split('|')[1]}
                    fit="cover"
                    style={{ borderRadius: 8 }}
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
      </div>
      <ImageViewer.Multi
        ref={ref}
        images={imgList}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
};
export default Message;
