import React, { useState, useEffect } from 'react';
import { Avatar, Button } from 'antd';
import { history, useModel } from 'umi';

const index = (props) => {
  const { conn, init, onMessage } = useModel('useWSModel', (model) => ({
    conn: model.conn,
    init: model.init,
    onMessage: model.onMessage,
  }));
  const [user, setUser] = useState(props.user);
  useEffect(() => {
    if (props.user !== user) {
      setUser(props.user);
      initWs(props.user.name);
    }
  }, [props.user]);

  const initWs = (name) => {
    init(name, (b) => {
      if (b) {
        console.log(window.ws);
        onMessage((event) => {
          console.log(event.data);
        });
      }
    });
  };

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
