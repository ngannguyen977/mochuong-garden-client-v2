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
    this.changeTypePolicy = this.changeTypePolicy.bind(this)
    this.state = {
      current: 0,
      isAllowPolicy: true
    }
  }
  componentWillMount() {
    const { getListActionOfService } = this.props
    getListActionOfService('iot')
  }
  changeTypePolicy(value) {
    const { create, policyCreate } = this.props
    create({ ...policyCreate, isAllowPolicy: value })
    this.setState({
      isAllowPolicy: value
    })
  }
  render() {
    const chooseActionType = (index) => {
      this.setState({ current: index })
    }
    return (
      <div className='policy policy action-step row'>
        <div className=' col-md-4 text-justify'>
          <div className='policy__list'>
            <Affix offsetTop={20}>
              <a onClick={() => chooseActionType(0)} className={'policy__listItem ' + (this.state.current === 0 && 'policy__listItem--current')}>
                <span className='policy__listPercents'>
                  <span>30 actions</span>
                </span>
                <span className='policy__listActionTitle'>
                  <Checkbox >List</Checkbox>
                </span>
              </a>
              <a onClick={() => chooseActionType(1)} className={'policy__listItem ' + (this.state.current === 1 && 'policy__listItem--current')}>
                <span className='policy__listPercents'>
                  <span>30 actions</span>
                </span>
                <span className='policy__listActionTitle'>
                  <Checkbox >Read</Checkbox>
                </span>
              </a>
              <a onClick={() => chooseActionType(2)} className={'policy__listItem ' + (this.state.current === 2 && 'policy__listItem--current')}>
                <span className='policy__listPercents'>
                  <span>23 actions</span>
                </span>
                <span className='policy__listActionTitle'>
                  <Checkbox >Write</Checkbox>
                </span>
              </a>
              <a onClick={() => chooseActionType(3)} className={'policy__listItem ' + (this.state.current === 3 && 'policy__listItem--current')}>
                <span className='policy__listPercents'>
                  <span>130 actions</span>
                </span>
                <span className='policy__listActionTitle'>
                  <Checkbox >All actions</Checkbox>
                </span>
              </a>
            </Affix>
          </div>
        </div>
        <div className='col-md-8'>
          <h2>Select actions</h2>
          <Search
            placeholder='search actions'
            onSearch={value => console.log(value)}
          // style={{ width: 200 }}
          />
          <small className='font-italic text-right'>*We define policies for an action regardless of the method that you use to perform the operation. For example, if a policy allows the GetUser action, then a user with that policy can get user information.</small>
          <div className='form-group'>
            <ActionList />
          </div>
        </div>

      </div>
    )
  }
}

export default Actions
