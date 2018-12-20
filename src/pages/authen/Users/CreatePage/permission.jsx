import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Input, Button, Switch } from 'antd'
import GroupList from '../../Groups/GroupPage/group.summary'
import PermissionList from '../../Permissions/PermissionPage/permission.summary'
const Search = Input.Search;

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class PermissionPage extends React.Component {
  constructor() {
    super()
    this.state = {
      mode: 'group',
      title: 'Add user to groups',
      description: '*Add user to groups help you manage your users easier. You can add permission to many users by add permission to group instead.'
    }
  }
  componentDidMount() {
    const { userCreate, type } = this.props
    const { mode } = this.state
    switch (mode) {
      case type.group:
        if (userCreate.groups) {
          this.setState({
            selectedRowKeys: userCreate.groups.map(x => x.id)
          })
        }
        break
      case type.permission:
        if (userCreate.permissions) {
          this.setState({
            selectedRowKeys: userCreate.permissions.map(x => x.id)
          })
        }
        break
      default:
        break
    }
  }
  handleMode(groupMode) {
    const { type,userCreate,create } = this.props
    if (!groupMode) {
      this.setState({
        mode: type.permission,
        title: 'Attach permission',
        description: '*Add user to groups help you manage your users easier. You can add permission to many users by add permission to group instead.'
      })
      create({ ...userCreate,groups:null })
    } else {
      this.setState({
        mode: type.group,
        title: 'Add user to groups',
        description: '*Add user to groups help you manage your users easier. You can add permission to many users by add permission to group instead.'
      })
      create({ ...userCreate,permissions:null })
    }
  }
  render() {
    const { mode, title, description } = this.state
    return (
      <div className='user-create-step-2 row'>
        <div className='col-lg-4 text-justify'>
          <div className='form-group'>
            <Switch size='large' defaultChecked onChange={(value) => this.handleMode(value)} />
            <span>{'  ' + title}</span>
          </div>
          <p>User permissions specify what tasks users can perform and what features users can access. For example, users with the “Handle Device is sense in third floor” permission can view Devices pages, and users can access any in third floor is sense.</p>
          <p>You can add this user to groups, then this user will have all permissions in these groups. Another way, you can set permissions for this user explicit by click on button switch to change to attach permission mode. </p>
          <p>You only can set permissions for a user by add this user to groups or attach permissions for this user on create user page. If you switch to attach permission mode, all groups you choose will be release. If you switch back to add user to groups mode, all permissions you choose will be release else.</p>
        </div>
        <div className='col-lg-8'>
          <h2>{title}</h2>
          <div className='row'>
            <div className='col-lg-8'>
              <Search
                placeholder='search groups'
                onSearch={value => console.log(value)}
              // style={{ width: 200 }}
              />
              <small className='font-italic text-right'>{description}</small>
            </div>
            <div className='col-lg-4 text-right'>
              <Button
                type='primary'
                className='text-capitalize'
                onClick={this.start}
                style={{ marginRight: '5px' }}
                href={'#/' + mode + '/create'}
              >
                Create&ensp;{mode}
              </Button>
            </div>
          </div>
          <div className='form-group'>
            {mode === 'group' && <GroupList parent='user' />}
            {mode === 'permission' && <PermissionList parent='user' />}
          </div>
        </div>

      </div>
    )
  }
}

export default PermissionPage
