import React from 'react'
import { mapStateToProps, mapDispathToProps } from './container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Input, Table, Button, Switch, Icon, message, Steps, Divider } from 'antd'
import ServiceList from './service'
import PolicyList from './policies'
const Search = Input.Search;

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class Step1 extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {

    return (
      <div className='permission-create-step-1 row'>
        <div className='col-lg-4 text-justify'>
          <div className='form-group'>
          </div>
          <p>With most services, your permissionname is a name you created, or that has been assigned to you. If you do not recall creating a permissionname,
               (or don't remember the name you chose), try using your e-mail address as your permissionname.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
          <p>With most services, your permissionname is a name you created, or that has been assigned to you. If you do not recall creating a permissionname,
          (or don't remember the name you chose), try using your e-mail address as your permissionname.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
        </div>
        <div className='col-lg-8'>
          <h2>Choose a Service</h2>
          <div className='row'>
            <div className='col-lg-8'>
              <Search
                placeholder='search groups'
                onSearch={value => console.log(value)}
              // style={{ width: 200 }}
              />
              <small className='font-italic text-right'>*Add permission to groups help you manage your permissions easier. You can add permission to many permissions by add permission to group instead.</small>
            </div>
          </div>
          <div className='form-group'>
            <ServiceList />
          </div>
        </div>

      </div>
    )
  }
}

export default Step1
