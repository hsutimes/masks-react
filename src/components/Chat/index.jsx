import React, { useState, useEffect, useRef } from 'react';
import {
  NavBar,
  Input,
  List,
  Button,
  Space,
  Popup,
  Toast,
} from 'antd-mobile-v5';
import { message } from 'antd';
import { history, useModel } from 'umi';
import Cookies from 'js-cookie';
import { useKeyPress } from 'ahooks';

import {
  PlusCircleOutlined,
  PictureOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import Message from '@/components/Message';
import styles from './index.less';

const Chat = () => {
  const { conn, nums, message, sendMsg } = useModel('useWebSocketModel');
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');

  const [visible, setVisible] = useState(false);

  // 监听回车事件
  useKeyPress('enter', (event) => {
    send();
  });

  useEffect(() => {
    let a = Cookies.get('account');
    let c = Cookies.get('avatar_color');
    if (!a || !c || !conn) {
      history.push('/login');
    } else {
      let arr = [];
      var obj = {};
      for (let i = 0; i < message.length; i++) {
        obj = {};
        let msg = message[i].split(': ');
        if (msg[0] === 'entered' || msg[0] === 'left') {
          continue;
          let t = msg[0] === 'entered' ? '欢迎' + msg[1] : msg[1] + '下线';
          obj.data = t;
          obj.isMe = false;
          obj.user = '^o^';
          obj.root = true;
          obj.avatar_color = { background: '#ff8f1f' };
          arr.push(obj);
        }
        obj.data = msg[1];
        obj.isMe = msg[0] === a ? true : false;
        obj.user = msg[0];
        obj.root = false;
        obj.avatar_color = obj.isMe ? JSON.parse(c) : { background: '#00b578' };
        arr.push(obj);
      }
      setData(arr);
    }
  }, [message]);

  const send = () => {
    if (!value) {
      return;
    }
    // console.log(value);
    sendMsg(value);
    setValue('');
  };

  // 发送图片
  const onUploadImg = (e) => {
    setVisible(false);
    sendMsg('img|' + e);
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
        <NavBar onBack={back}>Enjoying Time ({nums})</NavBar>
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
              prefix=""
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
              <Input
                id="msg_input"
                placeholder="请输入内容"
                clearable
                value={value}
                onChange={(val) => {
                  setValue(val);
                }}
                onKeyPress={handleKeyPress}
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
      </div>
    </>
  );
};

/**
 * 弹出层内容
 * @returns
 */
const PopupContent = (props) => {
  const { uploadImageSingle } = useModel('useImgModel');

  const [fileList, setFileList] = useState([]);

  const onImg = () => {
    const upload = document.getElementById('upload_file');
    upload.click();
  };

  const onEmoji = () => {
    Toast.show({
      content: '敬请期待',
      position: 'top',
    });
  };

  const onChange = (e) => {
    const { files } = e.target;
    setFileList(files);
    let file = files[0];
    let body = { file: file };
    uploadImageSingle(body, (b, d, msg) => {
      if (b) {
        // message.info(msg);
        console.log(d);
        props.onUploadImg(d);
      } else {
        message.error(msg);
        console.log(msg);
      }
    });
  };

  return (
    <div className={styles.popup}>
      <Space>
        <div className={styles.f_img} onClick={onImg}>
          <div className={styles.icon}>
            <PictureOutlined style={{ fontSize: '35px' }} />
          </div>
          <span>图片</span>
        </div>
        <input
          id="upload_file"
          style={{ display: 'none' }}
          type="file"
          // multiple
          accept="image/png, image/jpeg"
          onChange={onChange}
        ></input>
        <div className={styles.f_img} onClick={onEmoji}>
          <div className={styles.icon}>
            <SmileOutlined style={{ fontSize: '35px' }} />
          </div>
          <span>表情</span>
        </div>
      </Space>
    </div>
  );
};
export default Chat;
