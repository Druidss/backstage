import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Card,Button,Select,Input,Table, message } from 'antd'
import {PlusOutlined} from '@ant-design/icons'

import {reqProductList,reqUpdateProdStatus,reqSearchProductList} from '../../api'
import {PAGE_SIZE} from '../../config/index'
import {createSaveProductAction} from '../../redux/action_creators/porduct_action'
const {Option} = Select;

class Product extends Component {
  
  state ={
    productList:[],
    total:'',
    current:1,
    keyWord:'', //搜索关键字
    searchType:'productName',//搜索类型
    isLoading:true,
  }

  getProductList = async(number=1) => {
    let result
    if(this.isSearch){
      const {searchType,keyWord} = this.state 
      result = await reqSearchProductList(number,PAGE_SIZE,searchType,keyWord)
    }else{
        result = await reqProductList(number,PAGE_SIZE)
    }
    const {status,data} = result
    if(status === 0){
      this.setState({isLoading:false})
      this.setState({
        productList: data.list,
        total: data.total,
        current: data.pageNum
      })
      this.props.saveProduct(data.list)
    }
    else message.error('获取商品列表失败')
  }
  
  componentDidMount(){
    this.getProductList()
  }

  updateProdStatus = async({_id,status}) => {
    let productList = [...this.state.productList]
    if(status === 1) status =2 
    else status = 1
    let result = await reqUpdateProdStatus(_id,status)
    if(result.status === 0 ){
      message.success("商品更新成功")
      productList = productList.map((item) => {
        if(item._id === _id){
          item.status = status
        }
        return item
      })
      this.setState(productList)
    }
    else message.error('商品更新失败')
  }

  search = async() => {
    this.isSearch = true
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
        key: 'status',
        align: 'center',
        width:'10%',
        render: (item) => {
          return (
            <div>
              <Button 
                type={item.status === 1 ? 'damger' : 'primary'}
                onClick={() => {this.updateProditem(item)}}
              > 
                {item.status === 1? '下架':'上架'}
              </Button><br/>
              <span> {item.status === 1? '在售':'已停售'} </span>
            </div>
          )
        }
      },
      {
        title: '操作',
        // dataIndex: 'opera',
        key: 'opera',
        align: 'center',
        width:'10%',
        render: (item) => {
          return(
            <div>
              <Button type="link" 
                onClick={() => {this.props.history.push(`/admin/prod_about/product/detail/${item._id}`)}} 
              >
              详情</Button><br/>
              <Button type="link" 
                onClick={() => {this.props.history.push(`/admin/prod_about/product/add_update/${item._id}`)}}
              > 
              修改</Button>
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
                <Select defaultValue="productName" onChange={(value) => {this.setState({searchType:value})}}>
                  <Option value="productName" > 按名称搜索</Option>
                  <Option  value="productDesc" > 按描述搜索</Option>
                </Select>
                <Input 
                  style={{margin:'0px 10px',width:'22%'}} 
                  placeholder="请输入搜索关键字" 
                  allowClear 
                  onChange={(event) => {this.setState({keyWord:event.target.value})}}
                />
                <Button type="primary" onClick={this.search}>搜索</Button>
              </div>
            }
            extra={<Button 
              type="primary" 
              onClick={() => {this.props.history.push('/admin/prod_about/product/add_update')}}
            ><PlusOutlined />添加商品</Button>} 
            loading={this.state.isLoading}
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


export default connect(
  state => ({productList:state.productList}),
  {
    saveProduct:createSaveProductAction,
  }
)(Product)
