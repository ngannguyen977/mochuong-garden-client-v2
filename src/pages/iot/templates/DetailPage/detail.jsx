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
      templatename: '',
      password: '',
      confirm: ''
    }
  }
  componentDidUpdate() {
    const { detail, isEdit } = this.props
    const { templatename } = this.state
    if (isEdit && detail && (!templatename || templatename !== detail.templatename)) {
      this.setState({
        templatename: detail.templatename,
        password: detail.password,
      })
    }
  }

  componentDidMount() {
    const { templateCreate, isEdit } = this.props
    if (!isEdit) {
      this.setState({
        name: templateCreate.name,
        password: templateCreate.password,
        confirm: templateCreate.confirm
      })
    }
  }
  updateInfo(type, value) {
    const { create, update, templateCreate, detail, isEdit, id } = this.props
    switch (type) {
      case 'template':
        isEdit ? update(id, { ...detail, templatename: value })
          : create({ ...templateCreate, templatename: value })
        this.setState({
          templatename: value
        })
        break
      case 'password':
        isEdit ? update(id, { ...detail, password: value })
          : create({ ...templateCreate, password: value })
        this.setState({
          password: value
        })
        break
      case 'confirm':
        if (!isEdit) {
          create({ ...templateCreate, confirm: value })
        }
        break
      default:
        break
    }
  }

  render() {
    const { templatename, password, confirm } = this.state
    const { isEdit } = this.props
    return (
      <div className='template-detail-page row'>
        <div className='col-lg-4 text-justify'>
          <p>Template information include templatename and password, these field are provide for accession. After this template is created success, you can give these information for a person, so they can loged in.</p>
          {!isEdit && (<p>About the permission, please go to the next step: SET PERMISSION.</p>)}
        </div>
        <div className='col-lg-8'>
          <div className='form-group'>
            <label htmlFor='templatename-edit-title'>Templatename</label>
            <Input
              id='templatename-edit-title'
              placeholder='cloud@onsky.com'
              value={templatename}
              disabled={isEdit}
              onChange={(evt) => this.updateInfo('template', evt.target.value)} />
            <small className='font-italic text-right'> *With most services, your templatename is a name you created, or that has been assigned to you. If you do not recall creating a templatename,
             (or don't remember the name you chose), try using your e-mail address as your templatename.
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
