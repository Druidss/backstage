import React, { Component } from 'react';
import './css/header.less'
import { Modal, Button } from 'antd'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {deleteSaveUserInfoAction} from '../../../redux/action_creators/login_action'
import { FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import menuList from '../../../config/menu_config'
const { confirm } = Modal;


class Header extends Component {
	state ={
		isFull: false,
		date:dayjs().format('YYYY-MM-DD HH:mm:ss'),
		title:''
	}

	componentDidMount(){
		screenfull.on('change',()=> {
			let isFull = !this.state.isFull
			this.setState({isFull})
		});
		setInterval(() => {
			this.setState({date:dayjs().format('YYYY-MM-DD HH:mm:ss')})
		},1000)
		this.getTitle()
	}


	fullScreen = () => {
		screenfull.toggle()
		console.log(this.props.title);
	}

	//点击退出登录的回调
	logOut = () => {
		let {deleteUserInfo} = this.props
		confirm({
			title: '确定退出？',
			icon: <ExclamationCircleOutlined />,
			// content: '若退出 需要再次登录',
			cancelText:'取消',
			okText:'确认',
			onOk() {
				deleteUserInfo()
			},
		});
		}
	
	getTitle = () => {
		let {pathname} =  this.props.location
		let pathKey = pathname.split('/').reverse()[0]
		if(pathname.indexOf('product' !== -1))  pathKey = 'product'
		let title = ''
		menuList.forEach((item) => {
			if(item.children instanceof Array){
				let tmp = item.children.find((citem) => {
					return citem.key === pathKey
				})
			if(tmp) title = tmp.title
			}else{
				if(pathKey === item.key) title = item.title
			}
		})
		this.setState({title})
	}


    render() {
			let {isFull} = this.state
			let {user} = this.props.userInfo
        return (
            <header className='header'>
							<div className="header-top">
								<Button size="small" onClick={this.fullScreen}>
									{isFull
										?<FullscreenExitOutlined />
									  :<FullscreenOutlined />} 
								</Button>
								<span className="username">欢迎 </span>
								<Button type="link" onClick={this.logOut}>退出登录</Button>
							</div>
							<div className="header-bottom">
								<div className='header-bottom-left'>
									{ this.props.title || this.state.title } 
								</div>
								<div className='header-bottom-right'>
									{this.state.date}
									<img src='http://api.map.baidu.com/images/weather/day/qing.png' alt='天气信息'/>
								</div>	

							</div>
            </header>
        );
    }
}

export default connect(
	state => ({
		userInfo: state.userInfo,
		title: state.title
	}),
	{
		deleteUserInfo:deleteSaveUserInfoAction
	}
)(withRouter(Header))