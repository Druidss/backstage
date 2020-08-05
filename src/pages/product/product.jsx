import React, { Component } from 'react'
import { Card,Button,Select,Input,Table } from 'antd'
import {PlusOutlined} from '@ant-design/icons'

import {reqProductList} from '../../api'
import {PAGE_SIZE} from '../../config/index'
const {Option} = Select;

export default class Product extends Component {
  
  state ={
    productList:[],
    total:'',
    current:1,
  }

  getProductList = async(number=1) => {
    let result = await reqProductList(number,PAGE_SIZE)
    const {status,data,msg} = result
    if(status === 0){
      this.setState({
        productList: data.list,
        total: data.total,
        current: data.pageNum
      })
    }
  }
  
  componentDidMount(){
    this.getProductList()
  }


    render() {
      const dataSource = this.state.productList
      
      const columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name',
          width:'18%'
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
          key: 'desc',
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          align: 'center',
          width:'10%',
          render:(price) => '￥' + price
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          width:'10%',
          render: (status) => {
            return (
              <div>
                <Button type="primary"> {status === 1? '下架':'上架'}</Button><br/>
                <span> {status === 1? '在售':'已停售'} </span>
              </div>
            )
          }
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          align: 'center',
          width:'10%',
          render: () => {
            return(
              <div>
                <Button type="link"> 详情</Button><br/>
                <Button type="link"> 修改</Button>
              </div>
            )
          }
        },
      ];
        return (
          
            <div>
              <Card 
                title={
                  <div>
                    <Select defaultValue="name" >
                      <Option value="name" > 按名称搜索</Option>
                      <Option  value="desc" > 按描述搜索</Option>
                    </Select>
                    <Input style={{margin:'0px 10px',width:'22%'}} placeholder="请输入搜索关键字" allowClear />
                    <Button type="primary" >搜索</Button>
                  </div>
                }
                extra={<Button type="primary" ><PlusOutlined />添加商品</Button>} 
              >
                <Table 
                  dataSource={dataSource} 
                  columns={columns} 
                  bordered
                  rowKey='_id'
                  pagination={{
                    total:this.state.total,
                    current:this.state.current,
                    pageSize:PAGE_SIZE,
                    onChange:this.getProductList
                  }}
                />   
              </Card>
            </div>
        )
    }
}
