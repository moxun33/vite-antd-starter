/**
 * Created by xun on 2022/6/28 15:44.
 * description: LoginForm
 */

import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { saveUserInfo } from '@/utils/storage';

const LoginForm: React.FC<any> = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form]: any = Form.useForm();

  const onOk = () => {
    form.validateFields().then((values: Record<any, any>) => {
      saveUserInfo({
        token: 'token',
        userId: '1',
        name: 'name',
        roles: [],
        loginAccount: 'loginAccount',
        permissions: []
      });
      window.location.href = '/';
    });
  };

  return (
    <div className={'flex-center'} style={{ alignItems: 'center' }}>
      <Form form={form} layout={'vertical'} colon={false} preserve={false}>
        <Form.Item label={'用户名'} name={'name'} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label={'密码'} name={'password'} rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type={'primary'} block onClick={onOk}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginForm;
