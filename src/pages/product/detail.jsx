import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Button, Card,List } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

import {reqProductById} from '../../api'
import './detail.less'
const {Item} = List

class Detail extends Component {

  state ={
    categoryId:'',
    categoryName:'',
    desc:'',
    detail:'',
    imgs:[],
    name:'',
    price:'',
    isLoading:true,
  }

  
  getProdById = async(id) => {
    let result = await reqProductById()
    console.log(result);
  }

  componentDidMount(){
    const reduxProdList = this.props.productList
    const reduxCateList = this.props.categoryList
    const {id} = this.props.match.params
    if(reduxProdList.length){
      let result = reduxProdList.find ((item) => item._id === id)
      if(result){
        this.setState({...result})
        this.categoryId = result.categoryId
      }
    }

    if(reduxCateList.length){
      let result = reduxCateList.find ((item) => item._id === this.categoryId)
      this.setState({categoryName:result.name})
    }
    // else this.getProdById(id)

  }


  render() {
    return (
      <div >
        <Card title={
            <div  className="left-top">
              <Button type="link" onClick={() => {this.props.history.goBack()}} >
              <ArrowLeftOutlined />
              </Button>
              <span>商品详情</span>
            </div>
          }
          
        >
          <List>
            <Item>
              <span className="prod-name" >商品名称</span>
              <span>{this.state.name}</span>
            </Item>
            <Item>
              <span className="prod-name" >商品描述</span>
              <span> {this.state.desc} </span>
            </Item>
            <Item>
              <span className="prod-name" >商品价格</span>
              <span> {this.state.price}</span>
            </Item>
            <Item>
              <span className="prod-name" >所属分类</span>
              <span> {this.state.categoryName}</span>
            </Item>
            <Item>
              <span className="prod-name" >商品图片</span>
              <span> 
                {
                  this.state.imgs.map((item,index) => {
                    return <img  key={index} src={`/upload/` + item} alt ="商品图片" />
                  })
                }
              </span>
            </Item>
            <Item>
              <span className="prod-name" >商品详情</span>
              <span dangerouslySetInnerHTML={{ __html:this.state.detail }} ></span>
            </Item>
          </List>

        </Card>
      </div>
    );
  }
}


export default connect(
  state => ({
    productList:state.productList,
    categoryList:state.categoryList
  }),
)(Detail)