import React, { Component } from 'react'
import {connect} from 'react-redux' 
import { Button,Card,Form,Input,Select } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

import PicturesWall from './picture_wall'
import {reqCategoryList} from '../../api/index'
const {Option} = Select;

class AddUpdate extends Component {

  state = {
    categoryList:[]
  }


  getCategoryList = async () => {
    let result = await reqCategoryList()
    const { status,data } = result
    if (status === 0) this.setState({categoryList:data})
  }

  componentDidMount(){
    const {categoryList} = this.props
    if(categoryList) this.setState({categoryList})
    else this.getCategoryList()
    console.log(this.refs.pictureWall);
  }

  onFinish = (values) => {
    console.log('Finish:', values);
    console.log(this.refs.pictureWall.getImgArr());
  }

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
            categoryList:'请选择分类',
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
            name="categoryDesc"
            rules={[
              {required: true, message: '商品描述必须输入！'},
            ]}
          >
            <Input  placeholder="请输入商品描述" />
          </Form.Item>
          <Form.Item label="商品价格"
            name="categoryPrice"
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
            name="categoryList"
            rules={[
              {required: true, message: '分类名必须输入！'},
            ]}
          >
            <Select >
              <Option >请选择分类</Option>
              {
                this.state.categoryList.map((item) => {
                return <Option value={item._id} key={item._id} > {item.name} </Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label="商品图片"
            name="categoryPic"
            wrapperCol={{md:10}}
          >
           <PicturesWall ref='pictureWall' />
          </Form.Item>
          <Form.Item label="商品详情"
            name="categoryDetail;"
          >
            此处为富文本编辑器
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">提交</Button>
        </Form>
        </Card>
      </div>
    )
  }
}


export default connect(
  state => ({
    categoryList:state.categoryList,
  }),
)(AddUpdate)