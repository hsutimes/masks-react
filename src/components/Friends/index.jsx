import React from 'react';
import { Avatar, Button } from 'antd';
import { history, useModel } from 'umi';

const Friends = (props) => {
  const { conn, nums, peoples } = useModel('useWebSocketModel');

  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <div style={{ padding: 10 }}>
          <Avatar.Group>
            {peoples.map((o, k) => (
              <Avatar
                key={k}
                style={{ background: '#1890ff' }}
                shape={'circle'}
                size={'large'}
              >
                {o.charAt(0).toUpperCase()}
              </Avatar>
            ))}
          </Avatar.Group>
        </div>
      </div>
    </>
  );
};

export default Friends;
