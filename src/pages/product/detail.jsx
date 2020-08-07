import React, { Component } from 'react';
import { Button } from 'antd'

class Detail extends Component {
  render() {
    return (
      <div>
        detail
       {this.props.match.params.id}
        <Button onClick={() => {this.props.history.goBack()}} >返回</Button>
      </div>
    );
  }
}

export default Detail;