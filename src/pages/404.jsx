import React from 'react';
import { history } from 'umi';
import { Result, Button } from 'antd-mobile';

const PageNotFound = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '15px',
      }}
    >
      <Result
        status="warning"
        title="404"
        description="对不起，您访问的页面不存在。"
      />
      <Button color="primary" size="middle" onClick={() => {
        history.push('/login')
      }}>
        返回首页
      </Button>
    </div>
  );
};

export default PageNotFound;
