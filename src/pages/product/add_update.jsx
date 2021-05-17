import React, { Component } from 'react'
import {connect} from 'react-redux' 
import { Button,Card,Form,Input,Select, message } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
// import RichTextEditor from './rich_text_editor'

import PicturesWall from './picture_wall'
// import {reqCategoryList,reqAddProduct} from '../../api/index'
import {reqAddDisch} from '../../api/index'
const {Option} = Select;

class AddUpdate extends Component {

  state = {
    operaType:'add',
    ChefId:'',
    DishName:'',
    DishStar:'',
    DishPrice:'',
    DischTime:'',
    IsDeleted:'',
    id:'',
  }
  



  // getCategoryList = async () => {
  //   let result = await reqCategoryList()
  //   const { status,data } = result
  //   if (status === 0) this.setState({categoryList:data})
  // }

  componentDidMount(){
    // const {categoryList} = this.props
    // if(categoryList) this.setState({categoryList})
    // else this.getCategoryList()
    const {id} = this.props.match.params;
    console.log(id);
    if(id) {
      this.setState({operaType:'update'})
    }

  }

  onFinish = async(values) => {
    console.log({...values});
    let res = await reqAddDisch({...values}) 
    const {result} = res
    if(result){
      message.success('添加菜品成功')
      // this.props.history.replace('/admin/prod_about/product')
    }
    else{
      message.error('请重试',3)
    }
  }
  

  render() {
    const {operaType} = this.state
    const title = (
      <div>
        <Button onClick={() => {this.props.history.goBack()}} >
          <ArrowLeftOutlined />
          <span>返回</span>
        </Button>
        <br/>
        <br/>
        <h3>{operaType === 'update' ? '菜品修改' : '菜品添加'}</h3>
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
          <Form.Item label="厨师ID"
            name="ChefId"
            rules={[
              {required: true, message: '厨师ID必须输入！'},
            ]}
          >
            <Input  placeholder="请输入厨师ID" />
          </Form.Item>
          <Form.Item label="菜品名称"
            name="DischName"
            rules={[
              {required: true, message: '菜品名称必须输入！'},
            ]}
          >
            <Input  placeholder="请输入菜品星级" />
          </Form.Item>
          <Form.Item label="菜品星级"
            name="Dischstart"
            rules={[
              {required: true, message: '菜品星级必须输入！'},
            ]}
          >
            <Input  placeholder="请输入菜品星级,5以内" />
          </Form.Item>
          <Form.Item label="菜品价格"
            name="DischPrice"
            rules={[
              {required: true, message: '菜品价格必须输入！'},
            ]}
          >
            <Input  
             type="number"
             placeholder="请输入菜品价格" 
             addonAfter="元"
             prefix="￥"
            />
          </Form.Item>
          <Form.Item label="配送时间"
            name="DishTime"
            rules={[
              {required: true, message: '配送时间必须输入！'},
            ]}
          >
            <Input  placeholder="请输入配送时间" />
          </Form.Item>
          <Form.Item label="默认上架"
            name="IsDeleted"
            rules={[
              {required: true, message: '上架为0！'},
            ]}
          >
            <Input  placeholder="上架为0" />
          </Form.Item>
          {/* <Form.Item label="菜品分类"
            name="categoryId"
            rules={[
              {required: true, message: '分类名必须输入！'},
            ]}
          >
            <Select >
              <Option >请选择分类</Option>
                  <Option value="1" > 川菜</Option>
                  <Option  value="2" > 淮扬菜</Option>
                  <Option  value="3" > 精致西餐</Option>
                  <Option  value="4" > 粤菜</Option>
                  <Option  value="5" > 湘菜</Option>
                  <Option  value="6" > 东北菜</Option>
            </Select>
          </Form.Item> */}
          <Form.Item label="菜品图片"
            name="Img"
            wrapperCol={{md:10}}
          >
           <Input  placeholder="请输入菜品图床链接" />
           <PicturesWall ref={this.picRef} />
          </Form.Item>
          {/* <Form.Item label="菜品详情"
            // name="categoryDetail;"
            wrapperCol={{md:16}}
          >
            <RichTextEditor ref={this.richText} />
          </Form.Item> */}
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