import React from 'react'
import { Upload, Icon, message } from 'antd'
import './style.scss'
import constant from '../../../config/default'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const mimeTypes = ['image/gif', 'image/jpeg', 'image/bmp', 'image/png']
  const isImage = mimeTypes.includes(file.type)
  if (!mimeTypes) {
    message.error('You can only upload Image file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  console.log(file, isImage, isLt2M)
  return isImage && isLt2M
}

class UploadImage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }
  }


  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      )
    }
    console.log(info, this.state)
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const { imageUrl, token, onSuccess } = this.props
    return (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        headers={{ Authorization: 'Bearer ' + token }}
        action={constant.api.upload.host}
        // customRequest = {action}
        onSuccess={onSuccess}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        accept='image/*'
      >
        {imageUrl ? <img className='img-responsive' src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    )
  }
}

export default UploadImage
