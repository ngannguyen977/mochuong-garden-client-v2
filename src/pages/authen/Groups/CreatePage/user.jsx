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
          <p>With most services, your groupname is a name you created, or that has been assigned to you. If you do not recall creating a groupname,
               (or don't remember the name you chose), try using your e-mail address as your groupname.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
          <p>With most services, your groupname is a name you created, or that has been assigned to you. If you do not recall creating a groupname,
          (or don't remember the name you chose), try using your e-mail address as your groupname.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
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
              <small className='font-italic text-right'>*Add group to groups help you manage your groups easier. You can add permission to many groups by add permission to group instead.</small>
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
          <UserList />
          </div>
        </div>

      </div>
    )
  }
}

export default UserSummaryList
