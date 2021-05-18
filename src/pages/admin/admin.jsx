import React, { Component } from 'react';
import {connect} from  'react-redux'
import { Layout } from 'antd';
import { Route, Switch,Redirect} from 'react-router-dom'

import {deleteSaveUserInfoAction} from '../../redux/action_creators/login_action'
import Header  from './header/Header'
import LeftNav from './left_nav/left_nav.jsx'
import Home from '../../components/home/home'
import Product from '../product/product'
import Detail from '../product/detail'
import AddUpdate from '../product/add_update'
import Category from '../category/category'
import User from '../user/user'
import ChefAdd from '../user/add_chef'
import ChefUpdate from '../user/update_chef'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
import './css/admin.less'


const { Footer, Sider, Content } = Layout;
class Admin extends Component {
    
    componentDidMount(){
        // console.log(this.props);
    }

    logout = () => {
      this.props.deleteUserInfo()
    }


    render() {
        const {isLogin} = this.props.userInfo;
        if(!isLogin){
            return <Redirect to="/login" />
        }else{
            return(
							<Layout className='admin'>
								<Sider className='sider'>
                  <LeftNav></LeftNav>
                </Sider>
								<Layout>
									<Header className='header'>Header</Header>
									<Content className='content'>
										<Switch>
										<Route path="/admin/home" component={Home}/>
                		<Route path="/admin/prod_about/category" component={Category}/>
										<Route path="/admin/prod_about/product" component={Product} exact/>
										<Route path="/admin/prod_about/product/detail/:id" component={Detail} />
										<Route path="/admin/prod_about/product/add_update" component={AddUpdate} exact/>
										<Route path="/admin/prod_about/product/add_update/:id" component={AddUpdate}/>

                    <Route path="/admin/user/add_chef" component={ChefAdd} exact />
										<Route path="/admin/user/update_chef/:id" component={ChefUpdate} exact/>
                    <Route path="/admin/user" component={User}/>
									
										<Route path="/admin/role" component={Role}/>
										<Route path="/admin/charts/bar" component={Bar}/>
										<Route path="/admin/charts/line" component={Line}/>
										<Route path="/admin/charts/pie" component={Pie}/>
										<Redirect to="/admin/home"/>
										</Switch>
                  </Content>
									<Footer className='footer'>推荐使用谷歌浏览器，以便获得最佳用户体验</Footer>
								</Layout>
						</Layout>
            )
        }

    }
}

export default connect(
    state => ({userInfo: state.userInfo}),
    {
      deleteUserInfo:deleteSaveUserInfoAction
    }
)(Admin)