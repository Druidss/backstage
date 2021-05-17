import React, { Component } from 'react';

import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom'

import {connect} from 'react-redux'
import {reqLoginCheck} from '../../api'
import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'
import './css/login.less'
import logo from '../../static/imgs/logo.png'

class Login extends Component {


  componentDidMount () {
    // console.log(this.props);
  }

  onFinish = (values) => {
      console.log('Finish:', values);
      const {email,password} = values;

      reqLoginCheck(email,password)
      .then((res)=>{
        const {result} = res;
        console.log(reqLoginCheck);
        if (res.result){
          console.log(email);
          console.log(password);
          // 将登陆信息交给redux 来管理
          this.props.saveUerInfo({userId:1,token:1});
          this.props.history.replace('/admin');
        }else{
          message.warning('重新检查邮箱和密码',3)
        }
      })
    .catch((reason)=>{
      console.log(reason);
    })

  };
  
    render() {
      const {isLogin} = this.props;
      if (isLogin){
        return <Redirect to="/admin/home" />
      }
        return (
            <div className = "login">
                <header>
                  <img src={logo} alt=""/>                  
                  <h1>私厨管理系统</h1>
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
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your Email!',
                              },
                              // {max:12,message:"用户名必须小于等于12位"},
                              {min:4, message:"邮箱必须大于等于4位"},
                              // {pattern:/^\w+$/, message:"用户名必须是字母,数字,下划线"},
                            ]}
                          >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
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
  state => ({isLogin: state.userInfo.isLogin}),
  {
    saveUerInfo:createSaveUserInfoAction,
  }
)(Login)


