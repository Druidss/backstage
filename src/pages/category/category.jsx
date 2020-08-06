import React, { Component } from 'react'
import { Card, Button,Table,message,Modal,Input,Form } from 'antd';
import {PlusOutlined} from '@ant-design/icons'

import {reqCategoryList,reqAddCategory,reqUpdateCategory} from '../../api'
import {PAGE_SIZE} from '../../config/index'

export default class Category extends Component {

  state ={
    CategoryList:[], //商品分类列表
    visible: false, // 控制弹窗的展示和隐藏
    operType:'', //操作类型
    isLoading:true,
    modalCurrentValue:'',//弹窗显示值
    modalCurrentId:''
  }
  
  componentDidMount(){
    this.getCategoryList()
  }

  getCategoryList = async() => {
    let result = await reqCategoryList()
    this.setState({isLoading:false})
    const {status,data,msg} = result
    if(status === 0) this.setState({categoryList:data.reverse()})
    else  message.error(msg,1)
  }

  //展示弹窗
  showAdd = () => {
    this.setState({
      visible: true,
      operType:'add'
    });
  };

  showUpdate = (item) => {
    const {_id,name} = item
    this.setState({
      visible: true,
      operType:'update',
      modalCurrentValue:name,
      modalCurrentId:_id
    })
    const {form} = this.refs
    if(form) form.setFieldsValue({categoryName:name})
  };

  toAdd = (values) => {
    reqAddCategory(values).then((result) => {
      const {status, data, msg} = result
      if(status === 0) {
        message.success('新增商品分类成功')
        let categoryList = [...this.state.categoryList]
        categoryList.unshift(data)
        this.setState({categoryList})
        this.refs.form.resetFields()
        this.setState({
          visible: false,
        });
      }
      if(status === 1) message.error(msg,1)
    })

  }

  toAUpdate = async(id,name) => {
    let result = await reqUpdateCategory(id,name)
    const {status,msg} = result 
    if(status === 0){
      message.success('更新分类名成功',1)
      this.getCategoryList()
      this.refs.form.resetFields()
      this.setState({
        visible: false,
      });
    }else{
      message.error(msg,1)
    }
  }


  // 点击弹窗 ok 的回调
  handleOk = () => {
    const {operType} = this.state
    const values = this.refs.form.getFieldValue(['categoryName'])
    if(operType === 'add') this.toAdd(values)
    if(operType === 'update') this.toAUpdate(this.state.modalCurrentId,values)
    

  };

  handleCancel = () => {
    this.refs.form.resetFields()
    this.setState({
      visible: false,
    });
  };

  render() {
    const dataSource = this.state.categoryList;
    
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        key: 'age',
        render:(item)=>{return <Button type="link" onClick={() => {this.showUpdate(item)}} > 修改分类 </Button>},
        width:'25%',
        align:'center',
      },
    ];
    return (
        <div>
            <Card 
              title="分类管理" 
              extra={<Button type="primary" onClick={this.showAdd} ><PlusOutlined />添加</Button>} >
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{pageSize:PAGE_SIZE,showQuickJumper:true}}
                loading={this.state.isLoading}
                rowKey="_id" bordered 
              />
            </Card>
            <Modal
              title={this.state.operType === 'add' ? '新增分类' : '修改分类' }
              okText="确定"
              cancelText="取消"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Form
                ref='form'
                initialValues={{
                  // categoryName:this.state.modalCurrentValue,
                }}
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="categoryName"
                  rules={[
                    {required: true, message: '分类名必须输入！'},
                  ]}
                >
                  <Input  placeholder="请输入分类名称" />
                </Form.Item>
              </Form>
            </Modal>
        </div>
    )
  }
}
