import React, { useState, useEffect } from 'react';
import { Avatar, Button } from 'antd';
import { history, useModel } from 'umi';
import { useUpdateEffect } from 'ahooks';
import { NavBar, List } from 'antd-mobile';

import styles from './index.less';

const Home = (props) => {
  const { user, conn, disConnect, nums } = useModel('useWebSocketModel');

  useEffect(() => {
    // console.log('');
  }, []);

  useUpdateEffect(() => {
    // console.log(nums);
  }, [nums]);

  const enter = () => {
    history.push('/chat');
  };

  const offLine = () => {
    disConnect();
    history.push('/login');
  };

  return (
    <>
      <div className={styles.main}>
        <NavBar back={null}>首页</NavBar>
        {user && (
          <div className={styles.user}>
            <Avatar size="large" style={user.avatar_color}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </div>
        )}
        {/* <div>在线人数：{nums}</div> */}

        <List mode="card" header="频道列表">
          <List.Item extra={`在线人数：${nums}`} onClick={enter}>
            洽谈室
          </List.Item>
        </List>
      </div>
    </>
  );
};

export default Home;
