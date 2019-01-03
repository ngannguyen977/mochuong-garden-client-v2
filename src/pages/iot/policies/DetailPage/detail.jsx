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
    if (isEdit && detail && (!name || name !== detail.name)) {
      this.setState({
        name: detail.name,
        description: detail.description,
      })
    }
  }

  componentDidMount() {
    const { policyCreate, isEdit } = this.props
    if (!isEdit) {
      this.setState({
        name: policyCreate.name,
        description: policyCreate.description,
      })
    }
  }
  updateInfo(type, value) {
    const { create, update, policyCreate, detail, isEdit, policyId } = this.props
    switch (type) {
      case 'name':
        isEdit ? update(policyId, { ...detail, name: value })
          : create({ ...policyCreate, name: value })
        this.setState({
          name: value
        })
        break
      case 'description':
        isEdit ? update(policyId, { ...detail, description: value })
          : create({ ...policyCreate, description: value })
        this.setState({
          description: value
        })
        break
      default:
        break
    }
  }

  render() {
    return (
      <div className='user-detail-page row'>
        <div className='col-lg-4 text-justify'>

          <p> You manage access for users by creating policies and attaching them to users or groups. A policy is an object, when associated with an entity or resource, defines their policies. We evaluates these policies when a principal, such as a user, makes a request. Policies in the policies determine whether the request is allowed or denied. Most policies are stored in cloud as JSON documents.</p>
          <p>
            We define policies for an action regardless of the method that you use to perform the operation. For example, if a policy allows the GetUser action, then a user with that policy can get user information. When you create a user, you can set up the user to allow console or programmatic access. The user can sign in to the console using a user name and password. Or they can use access keys to work on the website.
            </p>
        </div>
        <div className='col-lg-8'>
          <div className='form-group'>
            <label htmlFor='policy-edit-title'>Name</label>
            <Input
              id='policy-edit-title'
              placeholder='eg. Read all list IoT'
              value={this.state.name}
              onChange={(evt) => this.updateInfo('name', evt.target.value)} />
            <small className='font-italic text-right'> *For example, if a policy allows the GetUser action, then a user with that policy can get user information..</small>
          </div>
          <div className='form-group'>
            <label htmlFor='policy-edit-title'>Description</label>
            <TextArea
              id='policy-edit-title'
              value={this.state.description}
              row={4}
              onChange={(evt) => this.updateInfo('description', evt.target.value)} />
            <small className='font-italic text-right'>*Please describe a short text for this policy, it's very helpful for your users, they will easy to understand policies you defined.</small>
          </div>
        </div>
      </div>)
  }
}

export default DetailPage
