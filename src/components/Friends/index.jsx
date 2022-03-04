import React from 'react';
import { Avatar, Button } from 'antd';
import { history, useModel } from 'umi';

const Friends = (props) => {
  const { conn, nums, peoples } = useModel('useWebSocketModel', (model) => ({
    conn: model.conn,
    nums: model.nums,
    peoples: model.peoples,
  }));

  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          textAlign: 'center',
        }}
      >
        {peoples.map((o, k) => (
          <div key={k} style={{ paddingTop: 10 }}>
            <Avatar style={{ background: '#1890ff' }}>
              {o.charAt(0).toUpperCase()}
            </Avatar>
          </div>
        ))}
      </div>
    </>
  );
};

export default Friends;
