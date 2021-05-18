import React, { Component } from 'react'
import {connect} from 'react-redux' 
import { Button,Card,Form,Input,Select, message } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'


// import {reqCategoryList,reqAddProduct} from '../../api/index'
import {reqAddChef} from '../../api/index'
const {Option} = Select;

export default class CehfAdd extends Component {

  state = {
    operaType:'add',
    ChefId:'',
    DishName:'',
    DishStar:'',
    DishPrice:'',
    DischTime:'',
    IsDeleted:'',
    id:'',
    Type:'', //菜系类型
  }
  

  componentDidMount(){
    const {id} = this.props.match.params;
    console.log(id);
    if(id) {
      this.setState({operaType:'update'})
    }
  }

  onFinish = async(values) => {
    console.log({...values});
    let res = await reqAddChef({...values}) 
    const {result} = res
    if(result){
      message.success('添加厨师成功')
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
        <h3>厨师信息添加</h3>
      </div>
    )
    
    return (
      <div>
        <Card  title={title}>
        <Form
          ref='form'
          initialValues={{
            ChefCuisiness:'请选择菜系',
          }}
          onFinish={this.onFinish}
          labelCol={{md:2}}
          wrapperCol={{md:8}}
        >
          <Form.Item label="厨师名字"
            name="chefName"
            rules={[
              {required: true, message: '厨师名字必须输入！'},
            ]}
          >
            <Input  placeholder="请输入厨师名字" />
          </Form.Item>

          <Form.Item label="所属菜品分类"
            name="ChefCuisiness"
            rules={[
              {required: true, message: '分类名必须选择！'},
            ]}
          >
            <Select   onChange={(value) => {this.setState({Type:value})}}>
                  <Option value="1" > 川菜</Option>
                  <Option  value="2" > 淮扬菜</Option>
                  <Option  value="3" > 精致西餐</Option>
                  <Option  value="4" > 粤菜</Option>
                  <Option  value="5" > 湘菜</Option>
                  <Option  value="6" > 东北菜</Option>
            </Select>
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


