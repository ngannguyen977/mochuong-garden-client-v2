import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Input, Radio, Button, Switch, Icon, message, Checkbox, Affix } from 'antd'
import './style.scss'
const Search = Input.Search;


@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ResourcePage extends React.Component {
  constructor() {
    super()
    this.state = {
      resources: [],
    }
  }
  componentWillMount() {
    const { permissionCreate, create } = this.props
    const { resources } = this.state
    this.setState({
      resources: ((permissionCreate || {}).resourceType || []).map(x => ({
        type: x,
        isAllowPermission: true
      }))
    })
    create({ ...permissionCreate, resources: resources })
  }
  changeTypePermission(resourceType, value) {
    const { permissionCreate, create } = this.props
    const { resources } = this.state
    resources.find(x => x.type === resourceType).isAllowPermission = value
    this.setState({
      resources
    })
    create({ ...permissionCreate, resources: resources })
  }
  addResource(type, value, isAny) {
    const { permissionCreate, create } = this.props
    const { resources } = this.state
    let resource = resources.find(x => x.type === type)
    resource.value = value
    resource.isAny = isAny
    this.setState({
      resources
    })
    create({ ...permissionCreate, resources: resources })
  }
  updateValue() {

  }

  render() {
    const { permissionCreate } = this.props
    const { resources } = this.state
    return (
      <div className='permission permission-step-2 row'>
        <div className='col-lg-2 text-justify'>
          <div className='permission__list'>
            <Affix offsetTop={20}>
              <a href='javascript: void(0);' className='permission__listItem permission__listItem--current'>
                <span className='permission__listPercents'>
                  <span>manual add resources</span>
                </span>
                <span className='permission__listActionTitle'>
                  <Radio >Specific</Radio>
                </span>
              </a>
              <a href='javascript: void(0);' className='permission__listItem permission__listItem'>
                <span className='permission__listPercents'>
                  <span>130 resources</span>
                </span>
                <span className='permission__listActionTitle'>
                  <Radio >All Resources</Radio>
                </span>
              </a>
            </Affix>
          </div>
        </div>
        <div className='col-lg-10'>
          <h2>Select resources</h2>
          <small className='font-italic text-right'>*Describes a resource associated with a resource share. You can describe more than one resource by type comma between them. Using * for describe all resource.</small>
          <div className='resource-list'>
            {resources.map(x => (
              <div className='form-group' key={x.type}>
                <h5 className='text-black text-capitalize'><strong>{x.type}</strong></h5>
                <Input
                  id='permission-edit-title'
                  placeholder='orn:[partition]:[service]:[region]:[account-id]:resource_type/name'
                  defaultValue={x.value}
                  onBlur={(e) => this.addResource(x.type, e.target.value, false)}
                  addonAfter={<Checkbox onChange={(e) => this.addResource(x.type, `orn:*:*:*:*:${x.type}/*`, e.target.checked)}>Any</Checkbox>}
                />
                <Switch defaultChecked
                  size='small'
                  className='d-inline'
                  checkedChildren={<Icon type='check' />}
                  unCheckedChildren={<Icon type='close' />}
                  onChange={(e) => this.changeTypePermission(x.type, e)} />
                {x.isAllowPermission ? ' Allow Permission ' : ' Deny Permission '}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ResourcePage
