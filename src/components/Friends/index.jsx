import React from 'react';
import { Avatar, Button } from 'antd';
import { Image, List } from 'antd-mobile-v5';

import { history, useModel } from 'umi';

const Friends = (props) => {
  const { conn, nums, peoples } = useModel('useWebSocketModel');

  return (
    <>
      <List header="在线用户">
        {peoples.map((i, k) => (
          <List.Item
            key={k}
            prefix={
              <Avatar
                style={{ background: '#76c6b8' }}
                shape="circle"
                size="large"
              >
                {i.charAt(0).toUpperCase()}
              </Avatar>
            }
          >
            {i}
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default Friends;
