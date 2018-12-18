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
  constructor() {
    super()
    this.state = {
      name: '',
      description: ''
    }
  }

  componentWillMount() {
    const { detail, isEdit } = this.props

    if (isEdit) {
      if (!detail) {
        setTimeout(() => {
          this.setState({
            name: (detail || {}).name,
            description: (detail || {}).description,
          })
        }, 3000)
      } else {
        this.setState({
          name: (detail || {}).name,
          description: (detail || {}).description,
        })
      }
    }
    console.log('reace', detail)
  }
  componentDidMount() {
    const { permissionCreate, isEdit } = this.props
    if (!isEdit) {
      this.setState({
        name: permissionCreate.name,
        description: permissionCreate.description,
      })
    }
  }
  updateInfo(type, value) {
    const { create, update, permissionCreate, detail, isEdit, policyId } = this.props
    switch (type) {
      case 'name':
        isEdit ? update(policyId, { ...detail, name: value })
          : create({ ...permissionCreate, name: value })
        this.setState({
          name: value
        })
        break
      case 'description':
        isEdit ? update(policyId, { ...detail, description: value })
          : create({ ...permissionCreate, description: value })
        this.setState({
          description: value
        })
        break
      default:
        break
    }
  }

  render() {
    console.log(this.props.detail)
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
            <label htmlFor='permission-edit-title'>Name</label>
            <Input
              id='permission-edit-title'
              placeholder='eg. Read all list IoT'
              value={this.state.name}
              onChange={(evt) => this.updateInfo('name', evt.target.value)} />
            <small className='font-italic text-right'> *With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
             (or don't remember the name you chose), try using your e-mail address as your username.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</small>
          </div>
          <div className='form-group'>
            <label htmlFor='permission-edit-title'>Description</label>
            <TextArea
              id='permission-edit-title'
              value={this.state.description}
              row={4}
              onChange={(evt) => this.updateInfo('description', evt.target.value)} />
            <small className='font-italic text-right'>*The Password is require at least 8 characters, inclusion of both uppercase,lowercase and special characters. Use of at least one number</small>
          </div>
        </div>
      </div>)
  }
}

export default DetailPage
