import React, { Component } from 'react'
import { Upload, Modal,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {BASE_URL} from '../../config'
import {reqDeletePicture} from '../../api'
 
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };
  componentDidMount(){
    console.log('我是照片墙');
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async ({ file,fileList }) => {
    if(file.status === 'done'){
      fileList[fileList.length-1].url = file.response.data.url
      fileList[fileList.length-1].name = file.response.data.name
    }
    if(file.status === 'removed'){
      let result = await reqDeletePicture(file.name)
      const {status,msg} = result
      if(status === 0 ) message.success('删除图片成功')
      else message.error(msg)
    }
    this.setState({ fileList });
  }
  //从 fileList 提取中商品对应的图片的名字
  getImgArr = () => {
    let result = []
    this.state.fileList.forEach((item) => {
      result.push(item.name)
    })
    return result
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={`${BASE_URL}/manage/img/upload`}
          name="image"
          listType="picture-card"
          fileList={fileList} 
          onPreview={this.handlePreview}  //点击预览按钮的回调
          onChange={this.handleChange} //图片状态改变的回调
        >
          {fileList.length >= 8 ? null : uploadButton} 
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall