import React, { Component } from 'react'
import { Card,Button,Select,Input,Table, message } from 'antd'
import {PlusOutlined} from '@ant-design/icons'

import {getAllChef, reqChefList,reqChefbyDishName,reqDelChef } from '../../api'
// import {PAGE_SIZE} from '../../config/index'
import { FormProvider } from 'antd/lib/form/context'
const {Option} = Select;

export default class User extends Component {

state ={
    chefList:[],
    total:'',
    current:1,
    keyWord:'', //搜索关键字
    searchType:'productName',//搜索类型
    isLoading:true,
  }

  getChefList = async() => {
    let res;
    let CuisineId = 1;
    if(this.isSearch){
      const {searchType,keyWord} = this.state 
      // res = await reqSearchProductList(number,PAGE_SIZE,searchType,keyWord)
      res = await reqChefList(searchType)
      if(keyWord){
        res = await reqChefbyDishName(keyWord)
          console.log(keyWord);
      }
        }else{
        res = await getAllChef(CuisineId) // 没有前置搜索的情况
     }
    const {isSuccess, result, totalCount } = res
    if(isSuccess){
      console.log(CuisineId);
      console.log(result);
      this.setState({isLoading:false})
      this.setState({
        chefList: result,
        total: totalCount,
      })
    }
    else message.error('获取厨师列表失败',3)
  }


  
  componentDidMount(){
    this.getChefList()
  }

  search = async() => {
    this.isSearch = true
    this.getChefList()

  }

  // 更新厨师当前的状态
    changeChefStatus = async({id,isDeleted}) => {
    let chefList = [...this.state.chefList]
    if(isDeleted === 0) isDeleted = 1
    else isDeleted = 0
    let res = await reqDelChef(id,isDeleted)
    if(res.isSuccess){
      message.success("厨师删除成功",3)
      chefList = chefList.map((item) => {
        if(item.id === id){
          item.isDeleted = isDeleted
        }
        return item
      })
      this.setState(chefList)
    }
    else message.error('厨师状态更新失败')
  } 

    render() {
    const dataSource = this.state.chefList
    
    const columns = [
      {
        title: '厨师名称',
        dataIndex: 'chefName',
        key: 'dishName',
        align: 'center',
        width:'14%'
      },
      {
        title: '厨师id',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width:'10%'
      },
      {
        title: '厨师星级',
        dataIndex: 'chefStar',
        key: 'chefStar',
        align: 'center',
        width:'10%',
        render:(chefStar) => chefStar + '⭐'
      },
      {
        title: '厨师距离',
        dataIndex: 'chefDist',
        key: 'chefDist',
        align: 'center',
        width:'10%',
        render:(chefDist) => chefDist + 'km'
      },
      {
        title: '厨师简介',
        dataIndex: 'chefIntroduction',
        key: 'chefIntroduction',
        align: 'center',
        width:'18%',
      },
      {
        title: '厨师照片',
        dataIndex: 'chefImage',
        key: 'chefImage',
        align: 'center',
        // width:'10%',
        render:(record) => {
          return (
          <div>
             <img  src={record} alt={record} width="150px" height="120px" /> 
          </div>
          )
        }
      },
      {
        title: '删除厨师',
        key: 'isDeleted',
        align: 'center',
        width:'10%',
        render: (item) => {
          return (
            <div>
              <Button 
                type={item.isDeleted === 1 ? 'damger' : 'primary'}
                onClick={() => {this.changeChefStatus(item)}}
              > 
                {item.isDeleted === 1? '添加':'删除'}
              </Button><br/>
              <span> {item.isDeleted === 1? '已删除':'已添加'} </span>
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
                onClick={() => {this.props.history.push(`/admin/user/update_chef/${item.id}`)}}
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
                  placeholder="请输入菜品关键字" 
                  allowClear 
                  onChange={(event) => {this.setState({keyWord:event.target.value})}}
                />
                <Button type="primary" onClick={this.search}>搜索厨师</Button>
              </div>
            }
            extra={<Button 
              type="primary" 
              onClick={() => {this.props.history.push('/admin/user/add_chef')}}
            ><PlusOutlined />新加厨师</Button>} 
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
                defaultPageSize:3,
                hideOnSinglePage:true,
              }}
            />   
          </Card>
        </div>
    )
    }
}
