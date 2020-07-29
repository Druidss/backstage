import React, { Component } from 'react';
import './css/header.less'
import { Button } from 'antd'
import {FullscreenOutlined} from '@ant-design/icons';

class Header extends Component {
    render() {
        return (
            <header className='header'>
							<div className="header-top">
								<Button size="small">
								<FullscreenOutlined />
								</Button>
								<span className="username">欢迎你</span>
								<Button type="link" >退出登录</Button>
							</div>
							<div className="header-bottom">

							</div>
            </header>
        );
    }
}

export default Header;