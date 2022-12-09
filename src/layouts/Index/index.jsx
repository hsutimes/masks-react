import React, { useState, useEffect } from 'react';
import { history, useModel } from 'umi';
import { NavBar, TabBar } from 'antd-mobile';

import { AppstoreOutline, UserContactOutline } from 'antd-mobile-icons';

import Cookies from 'js-cookie';

import styles from './index.less';

const Bottom = (props) => {
  const { pathname } = props.location;

  const setRouteActive = (value) => {
    history.push(value);
  };

  const tabs = [
    {
      key: '/app/home',
      title: '首页',
      icon: <AppstoreOutline />,
    },
    {
      key: '/app/friend',
      title: '好友',
      icon: <UserContactOutline />,
    },
  ];

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

const Index = ({ location, children }) => {
  const { conn, init } = useModel('useWebSocketModel');

  // const [user, setUser] = useState(null);

  useEffect(() => {
    let a = Cookies.get('account');
    let c = Cookies.get('avatar_color');
    if (!a || !c) {
      history.push('/login');
    } else {
      // console.log(a);
      if (a) {
        if (!conn) {
          let user = {
            name: a,
            avatar_color: JSON.parse(c),
          };
          init(user);
        }
      }
    }
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.body}>{children}</div>
      <div className={styles.bottom}>
        <Bottom location={location} />
      </div>
    </div>
  );
};

export default Index;