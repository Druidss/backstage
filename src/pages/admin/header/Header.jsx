import React, { Component } from 'react';
import './css/header.less'
import { Modal, Button } from 'antd'
import screenfull from 'screenfull'
import dayjs from 'dayjs'

import {connect} from 'react-redux'
import {deleteSaveUserInfoAction} from '../../../redux/action_creators/login_action'
import { FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


class Header extends Component {
	state ={
		isFull: false,
		date:dayjs().format('YYYY-MM-DD HH:mm:ss')
	}

	componentDidMount(){
		screenfull.on('change',()=> {
			let isFull = !this.state.isFull
			this.setState({isFull})
		});
		setInterval(() => {
			this.setState({date:dayjs().format('YYYY-MM-DD HH:mm:ss')})
		},1000)
	}

	fullScreen = () => {
		screenfull.toggle()
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
								<span className="username">欢迎, {user} </span>
								<Button type="link" onClick={this.logOut}>退出登录</Button>
							</div>
							<div className="header-bottom">
								<div className='header-bottom-left'>
									<span>柱状图</span>
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
	state => ({userInfo: state.userInfo}),
	{
		deleteUserInfo:deleteSaveUserInfoAction
	}
)(Header)