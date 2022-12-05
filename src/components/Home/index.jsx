import React, { useState, useEffect } from 'react';
import { Avatar, Button } from 'antd';
import { history, useModel } from 'umi';
import { useUpdateEffect } from 'ahooks';

const index = (props) => {
  const { conn, disConnect, nums } = useModel('useWebSocketModel');
  const [user, setUser] = useState(props.user);
  useEffect(() => {
    if (props.user !== user) {
      setUser(props.user);
    }
  }, [props.user]);

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
      <div
        style={{
          backgroundColor: 'white',
          textAlign: 'center',
        }}
      >
        {user && (
          <Avatar size="large" style={user.avatar_color}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
        )}
        <div>在线人数：{nums}</div>
        <div
          style={{
            padding: 30,
          }}
        >
          <Button type="primary" onClick={enter}>
            进入
          </Button>
        </div>
        <div
          style={{
            padding: 30,
          }}
        >
          <Button type="primary" onClick={offLine}>
            下线
          </Button>
        </div>
      </div>
    </>
  );
};

export default index;
