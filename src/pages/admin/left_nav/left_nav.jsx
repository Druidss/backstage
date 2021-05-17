import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom'
import { Menu } from 'antd';
import { Icon } from '@ant-design/compatible';
import {connect} from 'react-redux'
import {createSaveTitileAction} from '../../../redux/action_creators/menu_action.js'

import menuList from '../../../config/menu_config'
import logo from '../../../static/imgs/logo.png'
import './left_nav.less'

const { SubMenu,Item } = Menu;
class leftNav extends Component {
 

  createMenu = (target) => {
    return target.map((item) => {
      if(!item.children){
        return (      
          <Item key={item.key} onClick={() => {this.props.saveTitile(item.title)}}  >
            <Icon type={item.icon} ></Icon>
            <Link to={item.path}> <span> {item.title}</span> </Link>
          </Item>)
      }else{
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
          }>
          {this.createMenu(item.children)}
          </SubMenu>
        )
      }
    })

  }


  render() {
    let {pathname} = this.props.location
    return (
      <div>
        <header className="nav-header">
          <img src={logo} alt="" />
          <h1>私厨管理系统</h1>  
        </header>
        <div>
        <Menu
          // selectedKeys={pathname.indexOf('product') !== -1 ? 'product' : pathname.split('/').reverse()[0]}
          selectedKeys={pathname.split('/').reverse()[0]}
          defaultOpenKeys={pathname.split('/').splice(2)}
          mode="inline"
          theme="dark"
        >
          {this.createMenu(menuList)}
        </Menu>
      </div>
     </div>
    );
  }
}

export default connect(
  state => ({}),
  {
    saveTitile: createSaveTitileAction
  }
)(withRouter(leftNav));
