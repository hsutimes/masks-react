import React, { useState, useEffect } from 'react';
import { Button, List, InputItem, WhiteSpace, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { history } from 'umi';
import Cookies from 'js-cookie';
import { randomColor } from '@/utils/util.js';

import styles from './index.less';

const Page = (props) => {
  const { getFieldProps, getFieldError } = props.form;

  useEffect(() => {
    let a = Cookies.get('account');
    if (a) {
      // console.log(a);
      props.form.setFieldsValue({ account: a });
    }
  }, []);

  const onSubmit = () => {
    props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        // console.log(props.form.getFieldsValue());
        let obj = props.form.getFieldsValue();
        console.log(obj.account);
        Cookies.set('account', obj.account);
        Cookies.set('avatar_color', JSON.stringify(randomColor()));
        history.push('/');
      } else {
        Toast.fail('Validation failed');
      }
    });
  };
  const validateAccount = (rule, value, callback) => {
    if (value && value.length >= 2) {
      callback();
    } else {
      callback(new Error('至少大于等于2个字符'));
    }
  };

  return (
    <>
      <form className={styles.form}>
        <List>
          <div style={{ padding: 10 }}>
            <InputItem
              {...getFieldProps('account', {
                // initialValue: 'little ant',
                rules: [
                  { required: true, message: '请输入昵称' },
                  { validator: validateAccount },
                ],
              })}
              clear
              error={!!getFieldError('account')}
              onErrorClick={() => {
                Toast.fail(getFieldError('account').join('、'));
              }}
              placeholder="输入昵称"
            >
              <div
                style={{
                  backgroundImage:
                    'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)',
                  backgroundSize: 'cover',
                  height: '22px',
                  width: '22px',
                }}
              />
            </InputItem>
            <WhiteSpace />
            <Button type="primary" onClick={onSubmit}>
              进入西方极乐世界
            </Button>
            <WhiteSpace />
          </div>
        </List>
      </form>
    </>
  );
};
const App = createForm()(Page);
export default App;
