import React, { Component } from 'react'
import { Button,Card,Form,Input } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

export default class AddUpdate extends Component {
  render() {
    const title = (
      <div>
        <Button onClick={() => {this.props.history.goBack()}} >
          <ArrowLeftOutlined />
          <span>返回</span>
        </Button>
        <span>商品添加</span>
      </div>
    )
    
    return (
      <div>
        <Card  title={title}>
        <Form
          ref='form'
          initialValues={{
            // categoryName:this.state.modalCurrentValue,
          }}
          onFinish={this.onFinish}
          labelCol={{md:2}}
          wrapperCol={{md:8}}
        >
          <Form.Item label="商品名称"
            name="categoryName"
            rules={[
              {required: true, message: '商品名称必须输入！'},
            ]}
          >
            <Input  placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item label="商品描述"
            name="categoryName"
            rules={[
              {required: true, message: '商品描述必须输入！'},
            ]}
          >
            <Input  placeholder="请输入商品描述" />
          </Form.Item>
          <Form.Item label="商品价格"
            name="categoryName"
            rules={[
              {required: true, message: '商品价格必须输入！'},
            ]}
          >
            <Input  
             type="number"
             placeholder="请输入商品价格" 
             addonAfter="元"
             prefix="￥"
            />
          </Form.Item>
          <Form.Item label="商品分类"
            name="categoryName"
            rules={[
              {required: true, message: '分类名必须输入！'},
            ]}
          >
            <Input  placeholder="请输入分类名称" />
          </Form.Item>
          <Form.Item label="商品图片"
            name="categoryName"
            rules={[
              {required: true, message: '分类名必须输入！'},
            ]}
          >
            <Input  placeholder="请输入分类名称" />
          </Form.Item>
          <Form.Item label="商品详情"
            name="categoryName"
            rules={[
              {required: true, message: '分类名必须输入！'},
            ]}
          >
            <Input  placeholder="请输入分类名称" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">提交</Button>
        </Form>
        </Card>
      </div>
    )
  }
}
