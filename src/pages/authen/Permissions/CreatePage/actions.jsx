import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Input, Checkbox, Button, Switch, Icon, message, Steps, Affix } from 'antd'
import ActionList from './action'
import './style.scss'
const Search = Input.Search;


@connect(
  mapStateToProps,
  mapDispathToProps,
)
class Actions extends React.Component {
  constructor() {
    super()
    this.changeTypePermission = this.changeTypePermission.bind(this)
    this.state = {
      current: 0,
      isAllowPermission: true
    }
  }
  changeTypePermission(value) {
    const { create, permissionCreate } = this.props
    create({ ...permissionCreate, isAllowPermission: value })
    this.setState({
      isAllowPermission: value
    })
  }
  render() {
    const chooseActionType = (index) => {
      this.setState({ current: index })
    }
    return (
      <div className='permission permission action-step row'>
        <div className='col-lg-2 text-justify'>
          <div className='permission__list'>
            <Affix offsetTop={20}>
              <a onClick={() => chooseActionType(0)} className={'permission__listItem ' + (this.state.current === 0 && 'permission__listItem--current')}>
                <span className='permission__listPercents'>
                  <span>30 actions</span>
                </span>
                <span className='permission__listActionTitle'>
                  <Checkbox >List</Checkbox>
                </span>
              </a>
              <a onClick={() => chooseActionType(1)} className={'permission__listItem ' + (this.state.current === 1 && 'permission__listItem--current')}>
                <span className='permission__listPercents'>
                  <span>30 actions</span>
                </span>
                <span className='permission__listActionTitle'>
                  <Checkbox >Read</Checkbox>
                </span>
              </a>
              <a onClick={() => chooseActionType(2)} className={'permission__listItem ' + (this.state.current === 2 && 'permission__listItem--current')}>
                <span className='permission__listPercents'>
                  <span>23 actions</span>
                </span>
                <span className='permission__listActionTitle'>
                  <Checkbox >Write</Checkbox>
                </span>
              </a>
              <a onClick={() => chooseActionType(3)} className={'permission__listItem ' + (this.state.current === 3 && 'permission__listItem--current')}>
                <span className='permission__listPercents'>
                  <span>130 actions</span>
                </span>
                <span className='permission__listActionTitle'>
                  <Checkbox >All actions</Checkbox>
                </span>
              </a>
            </Affix>
          </div>
        </div>
        <div className='col-lg-10'>
          <h2>Select actions</h2>
          <div className='row'>
            <div className='col-lg-8'>
              <Search
                placeholder='search actions'
                onSearch={value => console.log(value)}
              // style={{ width: 200 }}
              />
              <small className='font-italic text-right'>*We define permissions for an action regardless of the method that you use to perform the operation. For example, if a permission allows the GetUser action, then a user with that permission can get user information.</small>
            </div>

          </div>
          <div className='form-group'>
            <ActionList />
          </div>
        </div>

      </div>
    )
  }
}

export default Actions
