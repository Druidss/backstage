import React, { Component } from 'react';
import { Button,Card,Form,Input, message } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {postSudo} from '../../api/index'

class Home extends Component {




    onFinish = async(values) => {
        console.log({...values});
        let res = await postSudo({oprId:1,userId:2}) 
        const {result} = res
        if(result){
        message.success('提权成功')
        // this.props.history.replace('/admin/prod_about/product')
        }
        else{
        message.error('请重试',3)
        }
    }

    render() {
    const title = (
      <div>
        <Button onClick={() => {this.props.history.goBack()}} >
          <ArrowLeftOutlined />
          <span>返回</span>
        </Button>
        <br/>
        <br/>
        <h3>系统提权</h3>
        <h3>输入被提权者ID，将Ta提升为管理员权限</h3>
      </div>
    )



        return (
            <div>
        <Card  title={title}>
        <Form
          ref='form'
          initialValues={{
            categoryList:'请选择分类',
          }}
          onFinish={this.onFinish}
          labelCol={{md:2}}
          wrapperCol={{md:8}}
        >
          <Form.Item label="操作者ID"
            name="oprId"
            rules={[
              {required: true, message: '操作者ID必须输入！'},
            ]}
          >
            <Input  placeholder="请输入操作者ID" />
          </Form.Item>
          <Form.Item label="被提权者ID"
            name="userId"
            rules={[
              {required: true, message: '被提权者ID必须输入！'},
            ]}
          >
            <Input  placeholder="请输入被提权者ID" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">提交</Button>
        </Form>
        </Card>
            </div>
        );
    }
}

export default Home;