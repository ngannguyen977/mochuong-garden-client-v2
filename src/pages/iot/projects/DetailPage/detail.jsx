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
      name: '',
      description: ''
    }
  }
  componentWillReceiveProps() {
    const { detail, isEdit } = this.props
    const { name,description } = this.state
    if (isEdit && detail) {
      this.setState({
        name: detail.name,
        description: detail.description,
      })
    }
  }
  render() {
    const { name, description } = this.state
    const { isEdit } = this.props
    return (
      <div className='user-detail-page row'>
        <div className='col-lg-4 text-justify'>
          <p>Project management is the application of processes, methods, knowledge, skills and experience to achieve the project objectives.</p>
          {!isEdit && (<p>About the permission, please go to the next step: SET PERMISSION.</p>)}
        </div>
        <div className='col-lg-8'>
          <div className='form-group'>
            <label htmlFor='username-edit-title'>Username</label>
            <Input
              id='username-edit-title'
              placeholder='cloud@onsky.com'
              value={username}
              disabled={isEdit}
              onChange={(evt) => this.updateInfo('user', evt.target.value)} />
            <small className='font-italic text-right'> *With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
             (or don't remember the name you chose), try using your e-mail address as your username.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</small>
          </div>
          <div className='form-group'>
            <label htmlFor='password-edit-title'>Password</label>
            <Input
              id='password-edit-title'
              value={password}
              placeholder='********'
              onChange={(evt) => this.updateInfo('password', evt.target.value)} />
            <small className='font-italic text-right'>*The Password is require at least 8 characters, inclusion of both uppercase,lowercase and special characters. Use of at least one number</small>
          </div>
          {!isEdit && (<div className='form-group'>
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
