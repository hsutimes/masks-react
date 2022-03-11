import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { useLocalStorageState } from 'ahooks';
import { scrollToY } from '@/utils/sliding-scroll';
import { List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './index.less';

const MessageVirtualized = (props) => {
  const msg = props.msg;

  const estimatedItemSize = 80; // 估计节点高度
  const time = 500; // 淡入淡出 500ms
  const [positions, setPositions] = useLocalStorageState('positions'); // 缓存节点真实高度

  const [scrollToIndex, setScrollToIndex] = useState(undefined); // 滚动到目标索引

  useEffect(() => {
    if (msg?.length > 0) {
      // 滚动到最底部
      setScrollToIndex(msg.length - 1);
      // 初始化节点高度
      let t = msg.map((_, index) => ({
        index,
        height: estimatedItemSize,
      }));
      if (positions?.length > 0) {
        if (msg.length == positions.length) {
          t = [...positions];
        } else if (msg.length > positions.length) {
          // 新消息，淡入淡出
          toBottom(time);
          setScrollToIndex(undefined);
          positions.map((v, i) => {
            t[i].height = v.height;
          });
        } else {
          // 如果消息数小于缓存数，清空缓存
          setPositions(t);
        }
      }
      // 获取节点真实高度
      let ele = document.getElementById('scroll').childNodes[0];
      let nodes = ele.childNodes;
      nodes.forEach((node, k) => {
        let rect = node.getBoundingClientRect();
        let height = rect.height;
        let index = parseInt(node.id);
        let oldHeight = t[index].height;
        let dValue = oldHeight - height;
        // 存在差值
        if (dValue) {
          t[index].height = height;
          // 更新节点高度与滚动面板高度
          node.style.setProperty('min-height', height + 'px', 'important');
          let h =
            ele.getBoundingClientRect().height + height - estimatedItemSize;
          ele.style.setProperty('height', h + 'px', 'important');
          ele.style.setProperty('max-height', h + 'px', 'important');
        }
      });
      // console.log(t);
      // 更新缓存
      setPositions(t);
      // if (!scrollToIndex) toBottom(time);
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

  const rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    let i = msg[index];
    return (
      <li
        id={index}
        key={key}
        // style={style}
        style={{
          minHeight: style.height,
          left: style.left,
          position: style.position,
          top: style.top,
          width: style.width,
        }}
        className={i.isMe ? styles.me : styles.other}
      >
        <Avatar style={i.avatar_color}>{user(i)}</Avatar>
        <div style={{ margin: '7px 56px 0px' }}>{i.user}</div>
        <p className={styles.message}>{i.data}</p>
      </li>
    );
  };

  const getRowHeight = ({ index }) => {
    let h = estimatedItemSize;
    // 取节点真实高度
    if (positions?.length > 0) {
      let i = positions[index];
      if (i?.height) {
        h = i.height;
      }
    }
    return h;
  };

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
                rowHeight={getRowHeight}
                rowRenderer={rowRenderer}
                scrollToIndex={scrollToIndex}
              />
            )}
          </AutoSizer>
        </ul>
      </div>
    </>
  );
};

export default MessageVirtualized;
