import React, { useState, useEffect } from 'react';
import { Avatar, Button } from 'antd';
import { history, useModel } from 'umi';

const index = (props) => {
  const { conn, nums, message } = useModel('useWSModel', (model) => ({
    conn: model.conn,
    nums: model.nums,
    message: model.message,
  }));
  const [user, setUser] = useState(props.user);
  useEffect(() => {
    if (props.user !== user) {
      setUser(props.user);
    }
  }, [props.user]);

  useEffect(() => {
    // console.log('onmessage');
  }, []);

  const enter = () => {
    history.push('/chat');
  };

  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          paddingTop: '50%',
          textAlign: 'center',
        }}
      >
        <Avatar size="large" style={user.avatar_color}>
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
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
      </div>
    </>
  );
};

export default index;
