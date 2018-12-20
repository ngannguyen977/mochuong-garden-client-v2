import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Input, Table, Button, Switch, Icon, message, Steps, Divider } from 'antd'
import PermissionList from '../../Permissions/PermissionPage/permission.summary'

const Search = Input.Search;

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class PermissionSummaryList extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {

    return (
      <div className='group-create permission-step row'>
        <div className='col-lg-4 text-justify'>
          <p>Group permissions specify what tasks groups can perform and what features groups can access. For example, groups with the “Handle Device is sense in third floor” permission can view Devices pages, and groups can access any in third floor is sense.</p>
          <p>You can add users to a group, then this user will have all permissions in this groups. Everything seem ok, go to the last step!</p>
        </div>
        <div className='col-lg-8'>
          <h2>Attach Permission for Group</h2>
          <div className='row'>
            <div className='col-lg-8'>
              <Search
                placeholder='search permission'
                onSearch={value => console.log(value)}
              // style={{ width: 200 }}
              />
              <small className='font-italic text-right'>*Add group to groups help you manage your groups easier. You can add permission to many groups by add permission to group instead.</small>
            </div>
            <div className='col-lg-4 text-right'>
              <Button
                type='primary'
                className='text-capitalize'
                onClick={this.start}
                style={{ marginRight: '5px' }}
                href='#/permissions/create'
              >
                Create Permissions
              </Button>
            </div>
          </div>
          <div className='form-group'>
            <PermissionList parent='group' />
          </div>
        </div>

      </div>
    )
  }
}

export default PermissionSummaryList
