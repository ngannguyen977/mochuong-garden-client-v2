import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Input, Button, Tabs, Icon } from 'antd'
const { TextArea } = Input

@connect(
  mapStateToProps,
  mapDispathToProps,
)
export class Detail extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: ''
    }
  }
  componentWillMount() {
    const { match, getOne,isEdit } = this.props
    if(isEdit){
      getOne(match.params.id)
    }
  }

  componentDidUpdate() {
    const { detail, isEdit } = this.props
    const { name,description } = this.state
    if (isEdit && detail && !name) {
      this.setState({
        name: detail.name,
        description: detail.description,
      })
    }
  }
  update(type, value, isChange) {
    const { isEdit, create, update, detail } = this.props
    const { name, description } = this.state
    switch (type) {
      case 'name':
        this.setState({
          name: value,
        })
        break
      case 'description':
        this.setState({
          description: value,
        })
        break
      default:
        break
    }
    if (isChange) {
      isEdit ? update(detail.id,name, description) : create(name, description)
    }
  }
  render() {
    const { name, description } = this.state
    const { isEdit,detail } = this.props

    return (
      <div className='user-detail-page row'>
        <div className='col-lg-4 text-justify'>
          <p>Project management is the application of processes, methods, knowledge, skills and experience to achieve the project objectives.</p>
        </div>
        <div className='col-lg-8'>
          <div className='form-group'>
            <label htmlFor='name-edit-title'>Name</label>
            <Input
              id='name-edit-title'
              placeholder='OnSky Smarthome'
              value={name}
              onChange={(evt) => this.update('name', evt.target.value)} />
            <small className='font-italic text-right'> *With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
             (or don't remember the name you chose), try using your e-mail address as your username.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</small>
          </div>
          <div className='form-group'>
            <label htmlFor='group-edit-title'>Project description</label>
            <TextArea
              rows={4}
              value={description}
              onChange={(evt) => this.update('description', evt.target.value)} />
            <small className='font-italic text-right'>*Description is the pattern of narrative development that aims to make vivid a place, object, character, or group.[1] Description is one of four rhetorical modes (also known as modes of discourse), along with exposition, argumentation, and narration.[2] In practice it would be difficult to write literature that drew on just one of the four basic modes.</small>
          </div>
          <div className='text-right'>
            <Button
              type='default'
              className='text-capitalize'
              style={{ marginRight: '15px' }}
              href='#/projects'
            >
              Cancel
                        </Button>
            <Button
              disabled={!name || !description}
              type='primary'
              className='text-capitalize'
              style={{ marginRight: '25px' }}
              onClick={() => this.update(null,null,true)}
            >
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </div>)
  }
}

export default Detail
