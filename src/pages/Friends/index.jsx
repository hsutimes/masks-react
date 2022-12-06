import React from 'react';
import { Avatar, Button } from 'antd';
import { NavBar, List } from 'antd-mobile';

import { history, useModel } from 'umi';

import styles from './index.less';

const Friends = (props) => {
  const { conn, nums, peoples } = useModel('useWebSocketModel');

  return (
    <>
      <div className={styles.main}>
        <NavBar back={null}>好友</NavBar>
        <div className={styles.list}>
          <List header={`在线用户 ${nums} 人`}>
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
        </div>
      </div>
    </>
  );
};

export default Friends;
