import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Card,Button,Select,Input,Table, message } from 'antd'
import {PlusOutlined} from '@ant-design/icons'

// import {reqProductList,reqUpdateProdStatus,reqSearchProductList} from '../../api'
import {reqDischList,reqChangeStatus } from '../../api'

import {PAGE_SIZE} from '../../config/index'
import {createSaveProductAction} from '../../redux/action_creators/porduct_action'
// import { FormProvider } from 'antd/lib/form/context'
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

  getProductList = async(CuisineId=1) => {
    let res;
    if(this.isSearch){
      const {searchType,keyWord} = this.state 
      // res = await reqSearchProductList(number,PAGE_SIZE,searchType,keyWord)
      res = await reqDischList(searchType)
      if(keyWord){
        res = await reqDischList(keyWord)
      }
    }else{
        res = await reqDischList(CuisineId)
    }
    const {isSuccess, result, totalCount } = res
    if(isSuccess){
      console.log(res);
      console.log(result);
      this.setState({isLoading:false})
      this.setState({
        productList: result,
        total: totalCount,
      })
      this.props.saveProduct(result)
    }
    else message.error('获取商品列表失败')
  }
  
  componentDidMount(){
    this.getProductList()
  }

  changeDischStatus = async({id,isDeleted}) => {
    let productList = [...this.state.productList]
    if(isDeleted === 0) isDeleted = 1
    else isDeleted = 0
    let res = await reqChangeStatus(id,isDeleted)
    if(res.isSuccess){
      message.success("菜品状态更新成功",3)
      productList = productList.map((item) => {
        if(item.id === id){
          item.isDeleted = isDeleted
        }
        return item
      })
      this.setState(productList)
    }
    else message.error('菜品更新失败')
  }

  search = async() => {
    this.isSearch = true
    this.getProductList()

  }

  render() {
    const dataSource = this.state.productList
    
    const columns = [
      {
        title: '菜品名称',
        dataIndex: 'dishName',
        key: 'dishName',
        width:'16%'
      },
      {
        title: '所属厨师id',
        dataIndex: 'cookId',
        key: 'cookId',
        width:'16%'
      },
      {
        title: '菜品星级',
        dataIndex: 'dishStar',
        key: 'dishStar',
        width:'10%',
        render:(dishStar) => dishStar + '⭐'
      },
      {
        title: '配送时间',
        dataIndex: 'dishTime',
        key: 'dishTime',
        width:'10%'
      },
      {
        title: '价格',
        dataIndex: 'dishPrice',
        key: 'dishPrice',
        align: 'center',
        width:'10%',
        render:(dishPrice) => '￥' + dishPrice
      },
      {
        title: '菜品图片',
        dataIndex: 'dishImage',
        key: 'dishImage',
        align: 'center',
        // width:'10%',
        render:(record) => {
          return (
          <div>
             <img  src={record} alt={record} width="90px" height="90px" /> 
          </div>
          )
        }
      },
      {
        title: '状态',
        key: 'isDeleted',
        align: 'center',
        width:'10%',
        render: (item) => {
          return (
            <div>
              <Button 
                type={item.isDeleted === 1 ? 'damger' : 'primary'}
                onClick={() => {this.changeDischStatus(item)}}
              > 
                {item.isDeleted === 1? '上架':'下架'}
              </Button><br/>
              <span> {item.isDeleted === 1? '已停售':'在售'} </span>
            </div>
          )
        }
      },
      {
        title: '操作',
        // dataIndex: 'opera',
        key: 'id',
        align: 'center',
        width:'10%',
        render: (item) => {
          return(
            <div>
              {/* <Button type="link" 
                onClick={() => {this.props.history.push(`/admin/prod_about/product/detail/${item._id}`)}} 
              >
              详情</Button><br/> */}
              <Button type="link" 
                onClick={() => {this.props.history.push(`/admin/prod_about/product/add_update/${item.id}`)}}
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
                <Select defaultValue="选择菜系" onChange={(value) => {this.setState({searchType:value})}}>
                  <Option value="1" > 川菜</Option>
                  <Option  value="2" > 淮扬菜</Option>
                  <Option  value="3" > 精致西餐</Option>
                  <Option  value="4" > 粤菜</Option>
                  <Option  value="5" > 湘菜</Option>
                  <Option  value="6" > 东北菜</Option>
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
            ><PlusOutlined />添加菜品</Button>} 
            loading={this.state.isLoading}
          >
            <Table 
              dataSource={dataSource} 
              columns={columns} 
              bordered
              rowKey='id'
              pagination={{
                total:this.state.total,
                defaultCurrent:1,
                pageSize:PAGE_SIZE,
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
