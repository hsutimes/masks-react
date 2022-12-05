import React, { useState, useEffect } from 'react';
import { history, useModel } from 'umi';
import { NavBar, TabBar } from 'antd-mobile';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  MemoryRouter as Router,
} from 'react-router-dom';
import { AppstoreOutline, UserContactOutline } from 'antd-mobile-icons';

import Home from '@/components/Home';
import Friends from '@/components/Friends';

import Cookies from 'js-cookie';

import styles from './index.less';

const Bottom = () => {
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value) => {
    history.push(value);
  };

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppstoreOutline />,
    },
    {
      key: '/friend',
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

const Index = () => {
  const { conn, init } = useModel('useWebSocketModel');

  const [user, setUser] = useState(null);

  useEffect(() => {
    let a = Cookies.get('account');
    let c = Cookies.get('avatar_color');
    if (!a || !c) {
      history.push('/login');
    } else {
      // console.log(a);
      let t = {
        name: a,
        avatar_color: JSON.parse(c),
      };
      setUser(t);
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (!conn) {
        init(user.name);
      }
    }
  }, [user]);

  return (
    <Router initialEntries={['/home']}>
      <div className={styles.app}>
        <div className={styles.body}>
          <Switch>
            <Route exact path="/home">
              <Home user={user} />
            </Route>
            <Route exact path="/friend">
              <Friends />
            </Route>
          </Switch>
        </div>
        <div className={styles.bottom}>
          <Bottom />
        </div>
      </div>
    </Router>
  );
};

export default Index;
