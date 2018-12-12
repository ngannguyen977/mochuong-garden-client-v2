import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Input } from 'antd'
const { TextArea } = Input

@connect(
  mapStateToProps,
  mapDispathToProps,
)
export class DetailPage extends React.Component {

  updateInfo(type, value) {
    switch (type) {
      case 'name':
        this.props.create({ ...this.props.permissionCreate, name: value })
        break
      case 'description':
        this.props.create({ ...this.props.permissionCreate, description: value })
        break
      default:
        break
    }
  }

  render() {
    return (
      <div className='user-detail-page row'>
        <div className='col-lg-4 text-justify'>
          <p>With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
               (or don't remember the name you chose), try using your e-mail address as your username.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
          <p>With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
          (or don't remember the name you chose), try using your e-mail address as your username.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
        </div>
        <div className='col-lg-8'>
          <div className='form-group'>
            <label htmlFor='product-edit-title'>Name</label>
            <Input id='product-edit-title' placeholder='cloud@onsky.com' onBlur={(evt) => this.updateInfo('name', evt.target.value)} />
            <small className='font-italic text-right'> *With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
             (or don't remember the name you chose), try using your e-mail address as your username.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</small>
          </div>
          <div className='form-group'>
            <label htmlFor='product-edit-title'>Description</label>
            <TextArea id='product-edit-title' row={4} onBlur={(evt) => this.updateInfo('description', evt.target.value)} />
            <small className='font-italic text-right'>*The Password is require at least 8 characters, inclusion of both uppercase,lowercase and special characters. Use of at least one number</small>
          </div>
        </div>
      </div>)
  }
}

export default DetailPage
