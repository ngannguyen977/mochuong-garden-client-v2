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
    const { policyCreate, create } = this.props
    const { resources } = this.state
    this.setState({
      resources: ((policyCreate || {}).resourceType || []).map(x => ({
        type: x,
        isAllowPolicy: true
      }))
    })
    create({ ...policyCreate, resources: resources })
  }
  changeTypePolicy(resourceType, value) {
    const { policyCreate, create } = this.props
    const { resources } = this.state
    resources.find(x => x.type === resourceType).isAllowPolicy = value
    this.setState({
      resources
    })
    create({ ...policyCreate, resources: resources })
  }
  addResource(type, value, isAny) {
    const { policyCreate, create } = this.props
    const { resources } = this.state
    let resource = resources.find(x => x.type === type)
    resource.value = value
    resource.isAny = isAny
    this.setState({
      resources
    })
    create({ ...policyCreate, resources: resources })
  }
  updateValue() {

  }

  render() {
    const { policyCreate } = this.props
    const { resources } = this.state
    return (
      <div className='policy policy-step-2 row'>
        <div className='col-lg-2 text-justify'>
          <div className='policy__list'>
            <Affix offsetTop={20}>
              <a href='javascript: void(0);' className='policy__listItem policy__listItem--current'>
                <span className='policy__listPercents'>
                  <span>manual add resources</span>
                </span>
                <span className='policy__listActionTitle'>
                  <Radio >Specific</Radio>
                </span>
              </a>
              <a href='javascript: void(0);' className='policy__listItem policy__listItem'>
                <span className='policy__listPercents'>
                  <span>130 resources</span>
                </span>
                <span className='policy__listActionTitle'>
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
                  id='policy-edit-title'
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
                  onChange={(e) => this.changeTypePolicy(x.type, e)} />
                {x.isAllowPolicy ? ' Allow Policy ' : ' Deny Policy '}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ResourcePage
