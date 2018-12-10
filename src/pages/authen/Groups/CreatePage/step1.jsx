import React from 'react'
import { mapStateToProps, mapDispathToProps } from './container'
import { connect } from 'react-redux'
import { Input } from 'antd'
const { TextArea } = Input

@connect(
  mapStateToProps,
  mapDispathToProps,
)
export class Step1 extends React.Component {

  updateInfo(type, value) {
    console.log(this.props)
    switch (type) {
      case 'name':
        this.props.createGroup({ ...this.props.groupCreate, name: value })
        break
      case 'decription':
        this.props.createGroup({ ...this.props.groupCreate, decription: value })
        break
      case 'users':
        this.props.createGroup({ ...this.props.groupCreate, users: value })
        break
      case 'policies':
        this.props.createGroup({ ...this.props.groupCreate, policies: value })
        break
      default:
        break
    }
  }

  render() {
    return (
      <div className='group-create-step-1 row'>
        <div className='col-lg-4 text-justify'>
          <p>With most services, your groupname is a name you created, or that has been assigned to you. If you do not recall creating a groupname,
               (or don't remember the name you chose), try using your e-mail address as your groupname.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
          <p>With most services, your groupname is a name you created, or that has been assigned to you. If you do not recall creating a groupname,
          (or don't remember the name you chose), try using your e-mail address as your groupname.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
        </div>
        <div className='col-lg-8'>
          <div className='form-group'>
            <label htmlFor='product-edit-title'>Group name</label>
            <Input id='product-edit-title' placeholder='Application Team' onBlur={(evt) => this.updateInfo('name', evt.target.value)} />
            <small className='font-italic text-right'> *With most services, your groupname is a name you created, or that has been assigned to you. If you do not recall creating a groupname,
             (or don't remember the name you chose), try using your e-mail address as your groupname.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</small>
          </div>
          <div className='form-group'>
            <label htmlFor='product-edit-title'>Group description</label>
            <TextArea rows={4} placeholder='group description' onBlur={(evt) => this.updateInfo('description', evt.target.value)} />
            <small className='font-italic text-right'>*The Password is require at least 8 characters, inclusion of both uppercase,lowercase and special characters. Use of at least one number</small>
          </div>
        </div>
      </div>)
  }
}

export default Step1
