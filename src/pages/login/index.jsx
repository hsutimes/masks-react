import React, { useState, useEffect } from 'react';
import { Form, Button, Input, WhiteSpace, Toast } from 'antd-mobile';
import { history } from 'umi';
import Cookies from 'js-cookie';
import { randomColor } from '@/utils/util';

import styles from './index.less';

const Login = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    let a = Cookies.get('account');
    if (a) {
      // console.log(a);
      form.setFieldsValue({ account: a });
    }
  }, []);

  const validateAccount = (rule, value, callback) => {
    if (value && value.length >= 2) {
      callback();
    } else {
      callback(new Error('至少大于等于2个字符'));
    }
  };

  const onFinish = (e) => {
    let obj = e;
    // console.log(obj.account);
    Cookies.set('account', obj.account);
    if (!Cookies.get('avatar_color')) {
      Cookies.set('avatar_color', JSON.stringify(randomColor()));
    }
    history.push('/');
  };

  return (
    <>
      <div className={styles.form}>
        <Form
          form={form}
          layout="horizontal"
          onFinish={onFinish}
          footer={
            <Button block type="submit" color="primary" size="large">
              进入平行宇宙
            </Button>
          }
        >
          <Form.Item
            name="account"
            label="昵称"
            rules={[
              { required: true, message: '昵称不能为空' },
              { validator: validateAccount },
            ]}
          >
            <Input placeholder="请输入昵称" />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default Login;
