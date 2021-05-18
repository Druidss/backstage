import React, { Component } from 'react'
import {connect} from 'react-redux' 
import { Button,Card,Form,Input,Select, message } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

import {getDish,reqAddDisch,reqUpdateDisch} from '../../api/index'
// const {Option} = Select;

class AddUpdate extends Component {

  formRef = React.createRef();
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
  


  componentDidMount(){
    const {id} = this.props.match.params;
    console.log(id);
    if(id) {
      this.setState({operaType:'update'})
      this.getCuiInfo(id)
    }

  }


  getCuiInfo = async (id)=>{
    let res;
    console.log(id);
    if(id){
      res = await getDish(id)
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
  }

  onFinish = async(values) => {
    console.log({...values});
    let res
    const {id} = this.props.match.params;
    if(id)   res = await reqUpdateDisch({...values}) 
    else res = await reqAddDisch({...values}) ;
    //
    const {result} = res
    console.log(result);
    if(result){
      message.success('操作成功')
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
          ref={this.formRef}
          // initialValues={{
          //   categoryList:'请选择分类',
          // }}
          onFinish={this.onFinish}
          labelCol={{md:2}}
          wrapperCol={{md:8}}
        >
          <Form.Item label="厨师ID"
            name="cookId"
            rules={[
              {required: true, message: '厨师ID必须输入！'},
            ]}
          >
            <Input  placeholder="请输入厨师ID" />
          </Form.Item>
          <Form.Item label="菜品名称"
            name="dishName"
            rules={[
              {required: true, message: '菜品名称必须输入！'},
            ]}
          >
            <Input  placeholder="请输入菜品名称" />
          </Form.Item>
          <Form.Item label="菜品星级"
            name="dishStar"
            rules={[
              {required: true, message: '菜品星级必须输入！'},
            ]}
          >
            <Input  placeholder="请输入菜品星级,5以内" addonAfter="⭐"/>
          </Form.Item>
          <Form.Item label="菜品价格"
            name="dishPrice"
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
            name="dishTime"
            rules={[
              {required: true, message: '配送时间必须输入！'},
            ]}
          >
            <Input  placeholder="请输入配送时间" addonAfter="分钟" />
          </Form.Item>
          <Form.Item label="默认上架"
            name="IsDeleted"
            initialValue='0'
            disabled
            rules={[
              {required: true, message: '上架为0！'},
            ]}
          >
            <Input  placeholder="上架为0" disabled />
          </Form.Item>
          <Form.Item label="菜品Id"
            name="id"
            initialValue='0'
            disabled
            rules={[
              {required: true, message: '不可修改！'},
            ]}
          >
            <Input  placeholder="不可修改" disabled/>
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
            name="dishImage"
            wrapperCol={{md:10}}
          >
           <Input  placeholder="请输入菜品图床链接" />
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