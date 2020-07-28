import React, { Component } from 'react';
import {connect} from  'react-redux'

class Admin extends Component {
    
    componentDidMount(){
        console.log(this.props);
    }
    render() {
        return (
            <div>
                Admin
            </div>
        );
    }
}

export default connect(
    state => ({userInfo: state.userInfo}),
    {
        
    }
)(Admin)