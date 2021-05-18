import React, { Component } from 'react'
import { Button,Card,Form,Input, message } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'


import {reqUpdateChef,getChef} from '../../api/index'
const { TextArea } = Input;
// const {Option} = Select;

export default class CehfUpdate extends React.Component {

  formRef = React.createRef();
  state = {
    operaType:'add',
    chefName:'',
    chefStar:'',
    IsDeleted:'',
    id:'',
    chefImage:'',
    chefIntroduction:'',
    isLoading:true,
  }
  

  componentDidMount(){
    const {id} = this.props.match.params;
    console.log(id);
    if(id) {
      this.setState({operaType:'update'})
      this.getChefInfo(id)
    }
  }

  getChefInfo = async (id)=>{
    let res;
    console.log(id);
    res = await getChef(id)
    const {isSuccess,result} = res
    if(isSuccess){
      console.log(res);
      console.log(result);
      this.setState({isLoading:false})
      this.setState({...result})
      this.formRef.current.setFieldsValue({...result})
    }
    else message.error('更新失败')
  }
  

  onFinish = async(values) => {
    console.log({...values});
    let res = await reqUpdateChef({...values}) 
    const {result} = res
    if(result){
      message.success('更新厨师信息成功')
      this.props.history.replace('/admin/prod_about/product')
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
        <h3>{operaType === 'update' ? '厨师信息修改' : '厨师添加'}</h3>
      </div>
    )
    
    return (
      <div>
        <Card  title={title}>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          labelCol={{md:2}}
          wrapperCol={{md:8}}
        >
          <Form.Item label="厨师ID"
            name="id"
            rules={[
              {required: true, message: '厨师ID必须输入！'},
            ]}
          >
            <Input  placeholder="请输入厨师ID" />
          </Form.Item>
          <Form.Item label="厨师姓名"
            name="chefName"
            rules={[
              {required: true, message: '厨师姓名必须输入！'},
            ]}
          >
            <Input  placeholder="请输入厨师姓名" />
          </Form.Item>
          <Form.Item label="厨师星级"
            name="chefStar"
            rules={[
              {required: true, message: '厨师星级必须输入！'},
            ]}
          >
            <Input  placeholder="请输入厨师星级,5以内"  addonAfter="⭐"/>
          </Form.Item>

          <Form.Item label="最短出餐时间"
            name="chefTime"
            disabled
            rules={[
              {required: true, message: '最短出餐时间必须输入！'},
            ]}
          >
            <Input  placeholder="最短时间" addonAfter="分钟" />
          </Form.Item>
          <Form.Item label="默认上架"
            name="IsDeleted"
            initialValue='0'
            rules={[
              {required: true, message: '默认上架为0！'},
            ]}
          >
            <Input  placeholder="默认上架为0"  disabled />
          </Form.Item>
          <Form.Item label="厨师所属菜品分类"
            name="IsDeleted"
            initialValue='0'
            rules={[
              {required: true, message: '不可修改！'},
            ]}
          >
            <Input  placeholder="不可修改"  disabled />
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
          <Form.Item label="厨师图片"
            name="chefImage"
            wrapperCol={{md:10}}
          >
           <Input  placeholder="请输入厨师图床链接" />
          </Form.Item>
          <Form.Item label="厨师介绍"
            name="chefIntroduction"
            wrapperCol={{md:10}}
          >
           <TextArea rows={4} />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="login-form-button">提交</Button>
        </Form>
        </Card>
      </div>
    )
  }
}


