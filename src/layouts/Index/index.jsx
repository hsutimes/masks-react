import React, { useState, useEffect } from 'react';
import { history, useModel } from 'umi';
import { NavBar, TabBar, Button } from 'antd-mobile';
import useSound from 'use-sound';

import { AppstoreOutline, UserContactOutline } from 'antd-mobile-icons';

import Cookies from 'js-cookie';

import di from '@/assets/aud/di.wav';
import message from '@/assets/aud/message.mp3';
import jointone from '@/assets/aud/jointone.mp3';
import leavetone from '@/assets/aud/leavetone.mp3';

import styles from './index.less';

const Bottom = (props) => {
  const { pathname } = props.location;
  const [play] = useSound(jointone);

  const setRouteActive = (value) => {
    play();
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
  const { conn, latestMessage, init } = useModel('useWebSocketModel');

  const [voice, setVoice] = useState('');

  useEffect(() => {
    console.log(latestMessage);
    setTimeout(() => {
      setVoice(
        'https://dds.dui.ai/runtime/v1/synthesize?voiceId=qianranfa&speed=0.8&volume=100&audioType=wav&text=' +
          latestMessage,
      );
    }, 1000);
  }, [latestMessage]);

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
      <audio autoPlay src={voice}></audio>
    </div>
  );
};

export default Index;
