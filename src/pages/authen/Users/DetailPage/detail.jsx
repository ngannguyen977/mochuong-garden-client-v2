import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Input } from 'antd'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
export class DetailPage extends React.Component {
  constructor() {
    super()
    this.state = {
      user: '',
      password: '',
      isCreateMode: false
    }
  }
  updateInfo(type, value) {
    switch (type) {
      case 'user':
        this.props.create({ ...this.props.userCreate, username: value })
        break
      case 'password':
        this.props.create({ ...this.props.userCreate, password: value })
        break
      case 'confirm':
        this.props.create({ ...this.props.userCreate, confirm: value })
        break
      default:
        break
    }
  }

  render() {
    const { isCreateMode } = this.state
    const { userCreate, detail } = this.props
    let user = isCreateMode ? userCreate : detail
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
            <label htmlFor='username-edit-title'>Username</label>
            <Input
              id='username-edit-title'
              placeholder='cloud@onsky.com'
              value={user.username}
              disable={!isCreateMode && 'disable'}
              onChange={(evt) => this.updateInfo('user', evt.target.value)} />
            <small className='font-italic text-right'> *With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
             (or don't remember the name you chose), try using your e-mail address as your username.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</small>
          </div>
          <div className='form-group'>
            <label htmlFor='password-edit-title'>Password</label>
            <Input
              id='password-edit-title'
              placeholder='********'
              onBlur={(evt) => this.updateInfo('password', evt.target.value)} />
            <small className='font-italic text-right'>*The Password is require at least 8 characters, inclusion of both uppercase,lowercase and special characters. Use of at least one number</small>
          </div>
          {isCreateMode && (<div className='form-group'>
            <label htmlFor='confirm-edit-title'>Confirm Password</label>
            <Input
              id='confirm-edit-title'
              placeholder='********'
              onBlur={(evt) => this.updateInfo('confirm', evt.target.value)} />
            <small className='font-italic text-right'>*It’s time to lay confirm password fields to rest. What was once a common convention on sign up forms has evolved into something better.</small>
          </div>)}
        </div>
      </div>)
  }
}

export default DetailPage
