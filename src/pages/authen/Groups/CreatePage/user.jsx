import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Input,  Button } from 'antd'
import UserList from '../../Users/UserPage/user.summary'
const Search = Input.Search;

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class UserSummaryList extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {

    return (
      <div className='group-create add-users row'>
        <div className='col-lg-4 text-justify'>
          <p>A group can have one ore many users. </p>
          <p>Add users to group help you manage your users easier. You can add permission to many users by add permission to group instead.</p>
        </div>
        <div className='col-lg-8'>
          <h2>Add users to Group</h2>
          <div className='row'>
            <div className='col-lg-8'>
              <Search
                placeholder='search groups'
                onSearch={value => console.log(value)}
              // style={{ width: 200 }}
              />
              <small className='font-italic text-right'>*Add users to group help you manage your users easier. You can add permission to many users by add permission to group instead.</small>
            </div>
            <div className='col-lg-4 text-right'>
              <Button
                type='primary'
                className='text-capitalize'
                onClick={this.start}
                style={{ marginRight: '5px' }}
                href='#/users/create'
              >
                Create User
              </Button>
            </div>
          </div>
          <div className='form-group'>
          <UserList parent='group'/>
          </div>
        </div>

      </div>
    )
  }
}

export default UserSummaryList
