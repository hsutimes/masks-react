import React, { useState, useEffect, useRef } from 'react';
import { history, useModel } from 'umi';
import { Space, Toast } from 'antd-mobile';
import { PictureOutlined, SmileOutlined } from '@ant-design/icons';

import EmojiPicker from 'emoji-picker-react';

import styles from './index.less';

/**
 * 弹出层内容
 * @returns
 */
const PopupContent = (props) => {
  const { uploadImageSingle, uploadImageSingleProgress } =
    useModel('useImgModel');

  const handler = useRef();

  const [fileList, setFileList] = useState([]);

  const [show, setShow] = useState(false);

  const onImg = () => {
    const upload = document.getElementById('upload_file');
    upload.click();
  };

  const onEmoji = () => {
    // setShow(!show);
    Toast.show({
      content: '敬请期待',
      position: 'top',
    });
  };

  const onChange = (e) => {
    const { files } = e.target;
    if (files?.length == 0) {
      Toast.show({
        icon: 'fail',
        content: `请选择图片`,
      });
      return;
    }
    setFileList(files);
    let file = files[0];
    let body = { file: file };
    handler.current = Toast.show({
      icon: 'loading',
      content: '上传中…',
      maskClickable: false,
      duration: 0,
    });

    uploadImageSingle(body, (b, d, msg) => {
      handler.current?.close();
      handler.current = null;
      if (b) {
        Toast.show({
          icon: 'success',
          content: '上传成功',
        });
        // console.log(d);
        props.onUploadImg(d);
      } else {
        Toast.show({
          icon: 'fail',
          content: `上传失败，${msg}`,
        });
        console.log(msg);
      }
    });
    setTimeout(() => {
      if (handler.current) {
        handler.current?.close();
        Toast.show({
          icon: 'fail',
          content: '上传失败',
        });
      }
    }, 10000);
  };

  return (
    <>
      <div className={styles.popup}>
        <Space>
          <div className={styles.f_img} onClick={onImg}>
            <div className={styles.icon}>
              <PictureOutlined style={{ fontSize: '35px' }} />
            </div>
            <span>图片</span>
          </div>
          <div className={styles.f_img} onClick={onEmoji}>
            <div className={styles.icon}>
              <SmileOutlined style={{ fontSize: '35px' }} />
            </div>
            <span>表情</span>
          </div>
        </Space>
      </div>
      {show && (
        <div className={styles.emoji}>
          <EmojiPicker
            onEmojiClick={(e) => {
              console.log(e);
            }}
          />
        </div>
      )}
      <input
        id="upload_file"
        style={{ display: 'none' }}
        type="file"
        // multiple
        accept="image/png, image/jpeg"
        onChange={onChange}
      ></input>
    </>
  );
};
export default PopupContent;
