import React, { useState, useEffect } from 'react';
import { Avatar, Button } from 'antd';
import { history } from 'umi';

const index = (props) => {
  const user = props.user;
  useEffect(() => {}, []);

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
