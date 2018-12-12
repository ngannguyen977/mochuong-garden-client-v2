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
      title: 'Add user to groups',
      mode: 'group'
    }
  }
  handleMode(isAttachPolicies) {
    if(isAttachPolicies){
      this.setState({ title: 'Add user to groups', mode: 'group' })
    }else{
      this.setState({ title: 'Attach permission', mode: 'permission' })
    }
  }
  render() {
    const { title,mode } = this.state
    return (
      <div className='user-create-step-2 row'>
        <div className='col-lg-4 text-justify'>
          <div className='form-group'>
            <Switch size='large' defaultChecked onChange={(value) => this.handleMode(value)} />
            <span>{'  ' + title}</span>
          </div>
          <p>With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
               (or don't remember the name you chose), try using your e-mail address as your username.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
          <p>With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
          (or don't remember the name you chose), try using your e-mail address as your username.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
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
              <small className='font-italic text-right'>*Add user to groups help you manage your users easier. You can add permission to many users by add permission to group instead.</small>
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
            {mode === 'group' && <GroupList />}
            {mode === 'permission' && <PermissionList />}
          </div>
        </div>

      </div>
    )
  }
}

export default PermissionPage
