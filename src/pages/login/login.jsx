import React, { Component } from 'react';
import './css/login.less'
import logo from "./imgs/logo.png"
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {connect} from 'react-redux'
import {reqLogin} from '../../api'
import {createDemo1Action, createDemo2Action} from '../../redux/action_creators/test_action'

class Login extends Component {


  componentDidMount () {
    // console.log(this.props);
  }

  onFinish = (values) => {
      console.log('Finish:', values);
      const {username,password} = values;

      reqLogin(username,password)
      .then((result)=>{
        const {status,msg,data} = result;
        if (status === 0){
          console.log(data);
        }else{
          message.warning(msg,1)
        }
      })
    .catch((reason)=>{
      console.log(reason);
    })

  };
  
    render() {
        return (
          
            <div className = "login">
                <header>
                  <img src={logo} alt=""/>                  
                  <h1>商品管理系统</h1>
                </header>

                <section>
                  <h1>用户登录</h1>
                        <Form
                              name="normal_login"
                              className="login-form"
                              initialValues={{
                                remember: true,
                              }}
                              onFinish={this.onFinish}
                            >
                              <Form.Item
                                name="username"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please input your Username!',
                                  },
                                  {max:12,message:"用户名必须小于等于12位"},
                                  {min:4, message:"用户名必须大于等于4位"},
                                  {pattern:/^\w+$/, message:"用户名必须是字母,数字,下划线"},
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
                </section>
            </div>
        );
    }
}

export default connect(
  state => ({test:state.test}),
  {
    demo1:createDemo1Action,
    demo2:createDemo2Action,
  }
)(Login)


