import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Input, Menu, Dropdown, Icon, Button } from 'antd'

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
      isLoaded: false
    }
  }

  componentDidUpdate() {
    const { detail, isEdit, type } = this.props
    const { name, isLoaded } = this.state
    if (!isLoaded && isEdit && detail && (!name || name !== detail.name)) {
      this.setState({
        name: detail.name,
        description: detail.description,
        project: detail.project,
        parent: detail.parent_id,
        type: type.find(x => x.id === detail.templateType),
        isLoaded: true
      })
    }
  }

  updateInfo(type, value) {
    const { create, update, createModel, detail, isEdit, id, getPropertiesByTemplate } = this.props
    console.log(isEdit)
    switch (type) {
      case 'name':
        isEdit ? update(id, { ...detail, name: value })
          : create({ ...createModel, name: value })
        this.setState({
          name: value
        })
        break
      case 'description':
        isEdit ? update(id, { ...detail, description: value })
          : create({ ...createModel, description: value })
        this.setState({
          description: value
        })
        break
      case 'type':
        isEdit ? update(id, { ...detail, type: value })
          : create({ ...createModel, type: value })
        this.setState({
          type: value
        })
        break
      case 'project':
        isEdit ? update(id, { ...detail, project: value })
          : create({ ...createModel, project: value })
        this.setState({
          project: value
        })
        break
      case 'parent':
        if (!isEdit) {
          getPropertiesByTemplate('template', value.id, 100)
          create({ ...createModel, parent: value })
          this.setState({
            parent: value
          })
        }
        break
      default:
        break
    }
  }

  render() {
    const { name, description, type, project, parent } = this.state
    const { isEdit, data } = this.props
    let types = this.props.type.map(x => (
      <Menu.Item key={x.id}>
        <a href='javascript:void(0)' onClick={() => this.updateInfo('type', x)}>{x.text}</a>
      </Menu.Item>
    ))
    let projects = this.props.projects.map(x => (
      <Menu.Item key={x.id}>
        <a href='javascript:void(0)' onClick={() => this.updateInfo('project', x)}>{x.name}</a>
      </Menu.Item>
    ))
    let noParent = { id: null, name: 'No Parent Template' }
    let templates = data.map(x => (
      <Menu.Item key={x.id}>
        <a href='javascript:void(0)' onClick={() => this.updateInfo('parent', x)}>{x.name}</a>
      </Menu.Item>
    ))
    templates.unshift(<Menu.Item key={noParent.id}>
      <a href='javascript:void(0)' onClick={() => this.updateInfo('parent', noParent)}>{noParent.name}</a>
    </Menu.Item>)

    return (
      <div className='template-detail-page row'>
        <div className='col-lg-4 text-justify'>
          <p>Template information include name and password, these field are provide for accession. After this template is created success, you can give these information for a person, so they can loged in.</p>
          {!isEdit && (<p>About the permission, please go to the next step: SET PERMISSION.</p>)}
        </div>
        <div className='col-lg-8'>
          <div className='form-group'>
            <label htmlFor='name-edit-title'>Template name</label>
            <Input
              id='name-edit-title'
              placeholder='thing template name'
              value={name}
              onChange={(evt) => this.updateInfo('name', evt.target.value)} />
            <small className='font-italic text-right'> *With most services, your name is a name you created, or that has been assigned to you. If you do not recall creating a name,
             (or don't remember the name you chose), try using your e-mail address as your name.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</small>
          </div>
          <div className='form-group'>
            <label htmlFor='description-edit-title'>Description</label>
            <TextArea
              rows={4}
              placeholder='template description'
              value={description}
              onChange={(evt) => this.updateInfo('description', evt.target.value)} />
            <small className='font-italic text-right'>*Description is the pattern of narrative development that aims to make vivid a place, object, character, or group.[1] Description is one of four rhetorical modes (also known as modes of discourse), along with exposition, argumentation, and narration.[2] In practice it would be difficult to write literature that drew on just one of the four basic modes.</small>
          </div>
          <div className='form-group'>
            <label htmlFor='project-template'>Project</label>
            <div>
              <Dropdown disabled={isEdit} overlay={<Menu>{projects}</Menu>} trigger={['click']}>
                <Button>
                  {project ? project.name : 'Please choose a project'}<Icon type='down' />
                </Button>
              </Dropdown>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='parent-template'>Parent Template</label>
              <div>
                <Dropdown disabled={isEdit} overlay={<Menu>{templates}</Menu>} trigger={['click']}>
                  <Button>
                    {parent ? parent.name : 'Please choose a parent template'}<Icon type='down' />
                  </Button>
                </Dropdown>
              </div>
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='thing-template-type'>Template Type</label>
              <div>
                <Dropdown disabled={isEdit} overlay={<Menu>{types}</Menu>} trigger={['click']}>
                  <Button>
                    {type ? type.text : 'Please choose a type for this template'}<Icon type='down' />
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
}

export default DetailPage
