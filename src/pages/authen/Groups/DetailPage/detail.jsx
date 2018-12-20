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
  componentDidUpdate() {
    const { detail, isEdit } = this.props
    const { name } = this.state
    if (isEdit && detail && detail.name && (!name || name !== detail.name)) {
      this.setState({
        name: detail.name,
        description: detail.description,
      })
    }
  }
  componentDidMount() {
    const { groupCreate, isEdit } = this.props
    if (!isEdit) {
      this.setState({
        name: groupCreate.name,
        description: groupCreate.description,
      })
    }
  }
  updateInfo(type, value) {
    const { create, update, groupCreate, detail, isEdit, id } = this.props
    switch (type) {
      case 'name':
        isEdit ? update(id, { ...detail, name: value })
          : create({ ...groupCreate, name: value })
        this.setState({
          name: value
        })
        break
      case 'description':
        isEdit ? update(id, { ...detail, description: value })
          : create({ ...groupCreate, description: value })
        this.setState({
          description: value
        })
        break
      default:
        break
    }

  }

  render() {
    const { name, description } = this.state
    const { isEdit } = this.props
    return (
      <div className='group-detail row'>
        <div className='col-lg-4 text-justify'>
          <p>Groups allow you to manage several things at once by categorizing them into groups. Group Information include name and description. Name is respresent grouped permissions, the name should be a name which you can known permissions or users that group have when you see the group name. </p>
          {!isEdit && (<div><p>You can add users and attach permissions for this group.</p><p> Go to next step: ADD USERS THIS FOR GROUP.</p></div>)}
        </div>
        <div className='col-lg-8'>
          <div className='form-group'>
            <label htmlFor='group-edit-title'>Group name</label>
            <Input
              id='group-edit-title'
              placeholder='Application Team'
              value={name}
              onChange={(evt) => this.updateInfo('name', evt.target.value)} />
            <small className='font-italic text-right'> *Name is respresent grouped permissions, the name should be a name which you can known permissions or users that group have when you see the group name.</small>
          </div>
          <div className='form-group'>
            <label htmlFor='group-edit-title'>Group description</label>
            <TextArea
              rows={4}
              placeholder='group description'
              value={description}
              onChange={(evt) => this.updateInfo('description', evt.target.value)} />
            <small className='font-italic text-right'>*Description is the pattern of narrative development that aims to make vivid a place, object, character, or group.[1] Description is one of four rhetorical modes (also known as modes of discourse), along with exposition, argumentation, and narration.[2] In practice it would be difficult to write literature that drew on just one of the four basic modes.</small>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailPage
