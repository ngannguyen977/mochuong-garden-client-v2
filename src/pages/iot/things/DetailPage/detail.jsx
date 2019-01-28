import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Input, Menu, Dropdown, Icon, Button } from 'antd'
import UploadImage from '../../../components/upload'

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
        template: detail.template,
        type: type.find(x => x.id === detail.template.type),
        isLoaded: true
      })
    }
  }

  updateInfo(type, value) {
    const { create, update, createModel, detail, isEdit, id, getPropertiesByTemplate } = this.props
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
      case 'template':
        if (!isEdit) {
          getPropertiesByTemplate('template', value.id, 100)
          create({ ...createModel, template: value })
          this.setState({
            template: value
          })
        }
        break
      default:
        break
    }
  }
  uploadSuccess = (image) => {
    const { create, createModel } = this.props
    message.info('upload deeeee')
    console.log(image)
    create({ ...createModel, image })
    this.setState({
      image
    })
  }
  render() {
    const { name, description,  project, template } = this.state
    const { isEdit } = this.props

    let projects = this.props.projects.map(x => (
      <Menu.Item key={x.id}>
        <a href='javascript:void(0)' onClick={() => this.updateInfo('project', x)}>{x.name}</a>
      </Menu.Item>
    ))
    let templates = this.props.templates.map(x => (
      <Menu.Item key={x.id}>
        <a href='javascript:void(0)' onClick={() => this.updateInfo('template', x)}>{x.name}</a>
      </Menu.Item>
    ))

    return (
      <div className='thing-detail-page row'>
        <div className='col-lg-4 text-justify'>
          <p>Thing information include name and password, these field are provide for accession. After this thing is created success, you can give these information for a person, so they can loged in.</p>
          {!isEdit && (<p>About the permission, please go to the next step: SET PERMISSION.</p>)}
          <div className='upload-image text-center'>
            <UploadImage onSuccess={this.uploadSuccess} token={this.props.token} imageUrl={(this.state.image || {}).url} />
            <label>Upload Image</label>
          </div>
        </div>
        <div className='col-lg-8'>
          <div className='form-group'>
            <label htmlFor='name-edit-title'>Thing name</label>
            <Input
              id='name-edit-title'
              placeholder='thing name'
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
              placeholder='thing description'
              value={description}
              onChange={(evt) => this.updateInfo('description', evt.target.value)} />
            <small className='font-italic text-right'>*Description is the pattern of narrative development that aims to make vivid a place, object, character, or group.[1] Description is one of four rhetorical modes (also known as modes of discourse), along with exposition, argumentation, and narration.[2] In practice it would be difficult to write literature that drew on just one of the four basic modes.</small>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='template-thing'>Thing Template</label>
              <div>
                <Dropdown disabled={isEdit} overlay={<Menu>{templates}</Menu>} trigger={['click']}>
                  <Button>
                    {template ? template.name : 'Please choose a template'}<Icon type='down' />
                  </Button>
                </Dropdown>
              </div>
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='thing-thing-type'>Project</label>
              <div>
                <Dropdown disabled={isEdit} overlay={<Menu>{projects}</Menu>} trigger={['click']}>
                  <Button>
                    {project ? project.name : 'Please choose a project'}<Icon type='down' />
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
