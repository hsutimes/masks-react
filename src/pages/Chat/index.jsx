import React, { useState, useEffect, useRef } from 'react';
import {
  NavBar,
  Input,
  TextArea,
  List,
  Button,
  Space,
  Popup,
  Toast,
} from 'antd-mobile';
import { MoreOutline } from 'antd-mobile-icons';

import { message, Mentions } from 'antd';
import { history, useModel } from 'umi';
import Cookies from 'js-cookie';
import { useKeyPress } from 'ahooks';

import { PlusCircleOutlined } from '@ant-design/icons';
import Message from '@/components/Message';
import Friends from '@/components/Friends';
import PopupContent from './components/PopupContent';

import { encryptAes, decryptAes } from '@/utils/util';

import styles from './index.less';

const Chat = () => {
  const { user, conn, nums, message, sendMsg } = useModel('useWebSocketModel');
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  // 监听回车事件
  useKeyPress('ctrl.enter', (event) => {
    send();
  });

  useEffect(() => {
    if (!user || !conn) {
      history.push('/login');
    } else {
      let arr = [];
      var obj = {};
      for (let i = 0; i < message.length; i++) {
        obj = {};
        let msg = message[i].split(': ');
        // obj.data = msg[1];
        obj.data = decryptAes(msg[1]);
        obj.isMe = msg[0] === user.name ? true : false;
        obj.user = msg[0];
        obj.root = false;
        obj.avatar_color = obj.isMe
          ? user.avatar_color
          : { background: '#00b578' };
        obj.isOnlyMsg = false;
        arr.push(obj);
      }
      for (let i = 0; i < arr.length - 1; i++) {
        let t = arr[i];
        let t_next = arr[i + 1];
        if (t.user == t_next.user) {
          t_next.isOnlyMsg = true;
        }
      }
      setData(arr);
    }
  }, [message]);

  const send = () => {
    if (!value) {
      return;
    }
    // console.log(value);
    sendMsg(encryptAes(value));
    setValue('');
  };

  // 发送图片
  const onUploadImg = (e) => {
    setVisible(false);
    sendMsg(encryptAes('img|' + e));
  };

  const handleKeyPress = (event) => {
    console.log(event.key);
    if (event.key === 'Enter') {
      send();
    }
  };

  const back = () => {
    history.goBack();
  };

  const plus = () => {
    setVisible(true);
  };

  return (
    <>
      <div className={styles.body}>
        <NavBar
          onBack={back}
          right={
            <MoreOutline
              fontSize={24}
              onClick={() => {
                setVisible2(true);
              }}
            />
          }
        >
          洽谈室 ({nums})
        </NavBar>
        <div className={styles.message}>
          <Message msg={data} />
        </div>
        <div className={styles.footer}>
          <List
            style={{
              '--prefix-width': '6em',
            }}
          >
            <List.Item
              extra={
                <>
                  <Space>
                    <div className={styles.plus}>
                      <PlusCircleOutlined
                        style={{ fontSize: '35px' }}
                        onClick={plus}
                      />
                    </div>
                    <Button color="primary" fill="solid" onClick={send}>
                      发送
                    </Button>
                  </Space>
                </>
              }
            >
              {/* <Mentions
                placeholder="消息"
                // value={value}
                maxLength={1000}
                autoSize={{ minRows: 2, maxRows: 5 }}
                // showCount
                onChacnge={(val) => {
                  console.log(val);
                  // setValue(val);
                }}
                options={[
                  {
                    value: 'robot',
                    label: 'robot',
                  },
                ]}
              /> */}
              <TextArea
                placeholder="消息"
                value={value}
                maxLength={1000}
                autoSize={{ minRows: 2, maxRows: 5 }}
                // showCount
                onChange={(val) => {
                  setValue(val);
                }}
              />
            </List.Item>
          </List>
        </div>
        <Popup
          visible={visible}
          onMaskClick={() => {
            setVisible(false);
          }}
          // bodyStyle={{ height: '40vh' }}
        >
          <PopupContent onUploadImg={onUploadImg} />
        </Popup>
        <Popup
          visible={visible2}
          onMaskClick={() => {
            setVisible2(false);
          }}
          position="right"
          bodyStyle={{ width: '60vw' }}
        >
          <Friends />
        </Popup>
      </div>
    </>
  );
};

export default Chat;
