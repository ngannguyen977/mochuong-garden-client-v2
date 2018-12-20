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
      username: '',
      password: '',
      confirm: ''
    }
  }
  componentDidUpdate() {
    const { detail, isEdit } = this.props
    const { username } = this.state
    if (isEdit && detail && (!username || username !== detail.username)) {
      this.setState({
        username: detail.username,
        password: detail.password,
      })
    }
  }

  componentDidMount() {
    const { userCreate, isEdit } = this.props
    if (!isEdit) {
      this.setState({
        name: userCreate.name,
        password: userCreate.password,
        confirm: userCreate.confirm
      })
    }
  }
  updateInfo(type, value) {
    const { create, update, userCreate, detail, isEdit, id } = this.props
    switch (type) {
      case 'user':
        isEdit ? update(id, { ...detail, username: value })
          : create({ ...userCreate, username: value })
        this.setState({
          username: value
        })
        break
      case 'password':
        isEdit ? update(id, { ...detail, password: value })
          : create({ ...userCreate, password: value })
        this.setState({
          password: value
        })
        break
      case 'confirm':
        if (!isEdit) {
          create({ ...userCreate, confirm: value })
        }
        break
      default:
        break
    }
  }

  render() {
    const { username, password, confirm } = this.state
    const { isEdit } = this.props
    return (
      <div className='user-detail-page row'>
        <div className='col-lg-4 text-justify'>
          <p>User information include username and password, these field are provide for accession. After this user is created success, you can give these information for a person, so they can loged in.</p>
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
