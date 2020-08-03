import React, { Component } from 'react'
import { Card, Button,Table,message,Modal,Input,Form } from 'antd';
import {PlusOutlined} from '@ant-design/icons'

import {reqCategoryList,reqAddCategory} from '../../api'
import {PAGE_SIZE} from '../../config/index'

export default class Category extends Component {

  state ={
    CategoryList:[], //商品分类列表
    visible: false, // 控制弹窗的展示和隐藏
    operType:''
  }
  
  componentDidMount(){
    this.getCategoryList()
  }

  getCategoryList = async() => {
    let result = await reqCategoryList()
    const {status,data,msg} = result
    if(status === 0) this.setState({categoryList:data})
    else  message.error(msg,1)
  }

  //展示弹窗
  showAdd = () => {
    this.setState({
      visible: true,
      operType:'add'
    });
  };

  showUpdate = () => {
    this.setState({
      visible: true,
      operType:'update'
    });
  };




  // 点击弹窗 ok 的回调
  handleOk = () => {
    const {operType} = this.state
    const values = this.refs.form.getFieldValue(['categoryName'])
    console.log(values);

    this.refs.form.resetFields()
    this.setState({
      visible: false,
    });
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
          dataIndex: 'age',
          key: 'age',
          render:(a)=>{return <Button type="link" onClick={this.showUpdate} > 修改分类 </Button>},
          width:'25%',
          align:'center',
        },
      ];
        return (
            <div>
                <Card 
                  title="Default size card" 
                  extra={<Button type="primary" onClick={this.showAdd} ><PlusOutlined />添加</Button>} >
                 <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{pageSize:PAGE_SIZE}}
                    rowKey="_id" bordered 
                  />;
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
                      remember: true,
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
