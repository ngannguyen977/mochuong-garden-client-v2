import React from 'react'
import { mapStateToProps, mapDispathToProps } from './container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Input, TreeSelect, Select, Button, Upload, Icon, message, Steps, Divider } from 'antd'
const { TextArea } = Input
const Option = Select.Option
const Step = Steps.Step;
const ButtonGroup = Button.Group;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i} value={i}>{i.toString(36) + i}</Option>);
}

@connect(
  mapStateToProps,
  mapDispathToProps,
)
export class Step1 extends React.Component {

  updateInfo(type, value) {
    console.log(this.props)
    switch (type) {
      case 'user':
        this.props.createUser({ ...this.props.userCreate, user: value })
        break
      case 'password':
        this.props.createUser({ ...this.props.userCreate, password: value })
        break
      case 'confirm':
        this.props.createUser({ ...this.props.userCreate, confirm: value })
        break
      case 'group':
        this.props.createUser({ ...this.props.userCreate, group: value })
        break
      default:
        break
    }
  }

  render() {
    return (
      <div className='user-create-step-1 row'>
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
            <label htmlFor='product-edit-title'>Username</label>
            <Input id='product-edit-title' placeholder='cloud@onsky.com' onBlur={(evt) => this.updateInfo('user', evt.target.value)} />
            <small className='font-italic text-right'> *With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
             (or don't remember the name you chose), try using your e-mail address as your username.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</small>
          </div>
          <div className='form-group'>
            <label htmlFor='product-edit-title'>Password</label>
            <Input id='product-edit-title' placeholder='********' onBlur={(evt) => this.updateInfo('password', evt.target.value)} />
            <small className='font-italic text-right'>*The Password is require at least 8 characters, inclusion of both uppercase,lowercase and special characters. Use of at least one number</small>
          </div>
          <div className='form-group'>
            <label htmlFor='product-edit-title'>Confirm</label>
            <Input id='product-edit-title' placeholder='********' onBlur={(evt) => this.updateInfo('confirm', evt.target.value)} />
            <small className='font-italic text-right'>*It’s time to lay confirm password fields to rest. What was once a common convention on sign up forms has evolved into something better.</small>
          </div>
        </div>
      </div>)
  }
}

export default Step1
