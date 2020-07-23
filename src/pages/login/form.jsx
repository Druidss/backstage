import React from 'react';
import './css/login.less'
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const NormalLoginForm = () => {
  // const onFinish = values => {
  //   console.log('Received values of form: ', values);
  // };

  return (
    <Form
      name="normal_login"
      className="login-form"
      // initialValues={{
      //   remember: true,
      // }}
      // onFinish={onFinish}
    >

      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'username 必填！',
          },
          {max:12 ,message:'用户名必须小于等于12位'},
          {min:4 ,message:'用户名必须大于等于4位'},
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>


      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >

        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NormalLoginForm;