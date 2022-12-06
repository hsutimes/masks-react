import React from 'react';
import { Avatar, Button } from 'antd';
import { NavBar, List, Image } from 'antd-mobile';
import { List as VirtualizedList, AutoSizer } from 'react-virtualized';
import { history, useModel } from 'umi';

import styles from './index.less';

const rowHeight = 50; // 单行高度
const maxRowCount = 10; // 最大行数

const Friends = (props) => {
  const { nums, peoples } = useModel('useWebSocketModel');

  const rowCount = peoples.length;
  const maxHeight =
    rowCount <= maxRowCount ? rowCount * rowHeight : maxRowCount * rowHeight;

  function rowRenderer({ index, key, style }) {
    const item = peoples[index];
    return (
      <List.Item
        key={key}
        style={style}
        prefix={
          <Avatar style={{ background: '#76c6b8' }} shape="circle" size="large">
            {item.charAt(0).toUpperCase()}
          </Avatar>
        }
      >
        {item}
      </List.Item>
    );
  }

  return (
    <>
      <List header={`在线用户 ${nums} 人`}>
        <AutoSizer disableHeight>
          {({ width }) => (
            <VirtualizedList
              rowCount={rowCount}
              rowRenderer={rowRenderer}
              width={width}
              height={maxHeight}
              rowHeight={rowHeight}
              overscanRowCount={10}
            />
          )}
        </AutoSizer>
      </List>
    </>
  );
};

export default Friends;
