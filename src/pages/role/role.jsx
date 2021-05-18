import React, { Component } from 'react'
import { Card,Button,Input,Table, message } from 'antd'
// import {PlusOutlined} from '@ant-design/icons'

import {getOrderbyUserId,postColseOder,getIdbyEmail} from '../../api'


export default class Role extends Component {

    
state ={
    orderList:[],
    total:'',
    current:1,
    keyWord:'', //搜索关键字
    // searchType:'productName',//搜索类型
    isLoading:true,
  }

  
  getOrderList = async() => {
    let res,resId;
    let userId = 1;
    if(this.isSearch){
      const {keyWord} = this.state 
      // res = await reqSearchProductList(number,PAGE_SIZE,searchType,keyWord)
      resId = await getIdbyEmail(keyWord)
      const {result} = resId
      console.log(result);
      if(result != -1){
        res = await getOrderbyUserId(result)
          console.log(keyWord);
      }else res = {isSuccess:false}
        }else{
        res = await getOrderbyUserId(userId) // 没有前置搜索的情况 默认显示订单号为1
     }

    const {isSuccess, result, totalCount } = res
    if(isSuccess){
      console.log(result);
      this.setState({isLoading:false})
      this.setState({
        orderList: result,
        total: totalCount,
      })
    }
    else message.error('获取订单列表失败,未搜索到邮箱',3)
  }


  search = async() => {
    this.isSearch = true
    this.getOrderList()

  }

  //异常关闭订单
    changeOrderStatus = async({id,isClosed}) => {
    let orderList = [...this.state.orderList]
    if(isClosed === 0) isClosed = 1
    else isClosed = 0
    let res = await postColseOder(id)
    if(res.isSuccess){
      message.success("订单关闭成功",3)
      orderList = orderList.map((item) => {
        if(item.id === id){
          item.isClosed = isClosed
        }
        return item
      })
      this.setState(orderList)
    }
    else message.error('订单状态更新失败')
  } 


 componentDidMount(){
    this.getOrderList()
    }

    render() {
    const dataSource = this.state.orderList
    const columns = [
      {
        title: '订单ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width:'14%',
      },
      {
        title: '订单总价',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        align: 'center',
        width:'14%',
        render:(totalPrice) => '￥' + totalPrice 
      },
      {
        title: '订单备注',
        dataIndex: 'commit',
        key: 'commit',
        align: 'center',
        width:'14%',
      },
      {
        title: '订单折扣',
        dataIndex: 'discount',
        key: 'discount',
        align: 'center',
        width:'14%',
      },
      {
        title: '订单状态',
        key: 'isClosed',
        align: 'center',
        width:'10%',
        render: (item) => {
          return (
            <div>
              <Button 
                type={item.isClosed === 1 ? 'damger' : 'primary' }
                disabled={item.isClosed === 1 ? true : false}
                onClick={() => {this.changeOrderStatus(item)}}
              > 
                {item.isClosed === 1? '已结束':'关闭'}
              </Button><br/>
              <span> {item.isClosed === 1? '':'进行中'} </span>
            </div>
          )
        }
      },
    ]
        return (
            <div>
            <Card 
                title={
                <div>
                    <Input 
                    style={{margin:'0px 10px',width:'22%'}} 
                    placeholder="请输入用户邮箱" 
                    allowClear 
                    onChange={(event) => {this.setState({keyWord:event.target.value})}}
                    />
                    <Button type="primary" onClick={this.search}>搜索订单</Button>
                </div>
                }
                // extra={<Button 
                // type="primary" 
                // onClick={() => {this.props.history.push('/admin/user/add_chef')}}
                // ><PlusOutlined />新加订单</Button>} 
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
                    defaultPageSize:5,
                    hideOnSinglePage:true,
                }}
                />   
            </Card>
            </div>
        )
    }
}
