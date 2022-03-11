import React, { useState, useEffect, useRef } from 'react';
import { message, Avatar } from 'antd';
import { scrollToY } from '@/utils/sliding-scroll';
import { List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './index.less';

// List data as an array of strings
const list = [
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
  'aa',
];

function rowRenderer({
  key, // Unique key within array of rows
  index, // Index of row within collection
  isScrolling, // The List is currently being scrolled
  isVisible, // This row is visible within the List (eg it is not an overscanned row)
  style, // Style object to be applied to row (to position it)
}) {
  return (
    <div key={key} style={style}>
      {list[index] + key}
    </div>
  );
}

const ListView = () => {
  return (
    <div
      style={{
        height: '100%',
        padding: '10px',
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <List
            id="scroll"
            height={height}
            width={width}
            rowCount={list.length}
            rowHeight={30}
            rowRenderer={rowRenderer}
            scrollToIndex={list.length - 1}
          />
        )}
      </AutoSizer>
    </div>
  );
};

const Message = () => {
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < 100; i++) {
      let obj = {};
      obj.k = i + '';
      obj.data = 'hello ' + i;
      obj.isMe = i % 2 == 0 ? true : false;
      obj.user = 'time';
      obj.root = false;
      obj.avatar_color = { background: '#00b578' };
      arr.push(obj);
    }
    setMsg(arr);
  }, []);

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

  const add = () => {
    let arr = [...msg];
    let obj = {};
    let i = arr.length;
    obj.k = i + '';
    obj.data = 'hello ' + i;
    obj.isMe = i % 2 == 0 ? true : false;
    obj.user = 'time';
    obj.root = false;
    obj.avatar_color = { background: '#00b578' };
    arr.push(obj);
    setMsg(arr);
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
      <button onClick={toBottom}>bottom</button>
      <button onClick={add}>add</button>
    </>
  );
};

const Index = () => {
  return <Message />;
};

export default Index;
