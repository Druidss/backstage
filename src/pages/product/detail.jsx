import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Button, Card,List } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import './detail.less'
const {Item} = List

class Detail extends Component {

  state ={
    categoryId:'',
    desc:'',
    detail:'',
    imgs:'',
    name:'',
    price:'',
  }

  componentDidMount(){
    const reduxProdList = this.props.productList
    const {id} = this.props.match.params
    reduxProdList.find (() => {

    })
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
              <span>{}</span>
            </Item>
            <Item>
              <span className="prod-name" >商品描述</span>
              <span>xxxxxxxxxxxxx</span>
            </Item>
            <Item>
              <span className="prod-name" >所属分类</span>
              <span>xxxxxxxxxxxxx</span>
            </Item>
            <Item>
              <span className="prod-name" >商品图片</span>
              <span>xxxxxxxxxxxxx</span>
            </Item>
            <Item>
              <span className="prod-name" >商品详情</span>
              <span>xxxxxxxxxxxxx</span>
            </Item>
          </List>

        </Card>
      </div>
    );
  }
}


export default connect(
  state => ({productList:state.productList}),
)(Detail)