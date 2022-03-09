import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { scrollToY } from '@/utils/sliding-scroll';
import { List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './index.less';

const MessageVirtualized = (props) => {
  const msg = props.msg;

  useEffect(() => {
    if (msg?.length > 0) {
      toBottom();
    }
  }, [msg]);

  const user = (obj) => {
    if (!obj.root) return obj.user.charAt(0).toUpperCase();
    else return obj.user;
  };

  const toBottom = () => {
    let ele = document.getElementById('scroll');
    scrollToY(ele.scrollHeight, 500, ele);
  };

  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) {
    let i = msg[index];
    return (
      <li key={key} style={style} className={i.isMe ? styles.me : styles.other}>
        <Avatar style={i.avatar_color}>{user(i)}</Avatar>
        <div style={{ margin: '7px 56px 0px' }}>{i.user}</div>
        <p className={styles.message}>{i.data}</p>
      </li>
    );
  }

  return (
    <>
      <div className={styles.chat}>
        <ul>
          <AutoSizer>
            {({ height, width }) => (
              <List
                id="scroll"
                height={height}
                width={width}
                rowCount={msg.length}
                rowHeight={80}
                rowRenderer={rowRenderer}
                // scrollToIndex={msg.length - 1}
              />
            )}
          </AutoSizer>
        </ul>
      </div>
    </>
  );
};

export default MessageVirtualized;
