import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
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
class ServicePage extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {

    return (
      <div className='permission-create sevice-step row'>
        <div className='col-lg-4 text-justify'>
          <div className='form-group'>
          </div>
          <p>We have many many actions on our system. Therefore, we split them into services, example : IoT, Storage, Authentication,etc. On service IoT, we have list actions about IoT such as manage Devices, Monitor gateways,etc.</p>
          <p>Please choose a service then you can see the list actions of that service. You only choose 1 service for a permission. Go to the next step: SELECT ACTIONS.</p>
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
              <small className='font-italic text-right'>*A service is represent by a list actions.</small>
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

export default ServicePage
