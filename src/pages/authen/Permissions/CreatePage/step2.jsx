import React from 'react'
import { mapStateToProps, mapDispathToProps } from './container'
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
class Step2 extends React.Component {
  constructor() {
    super()
    this.state = {
      modeTitle: 'Add permission to groups',
      mode: 'group'
    }
  }

  render() {

    return (
      <div className='permission permission-step-2 row'>
      <div className='col-lg-2 text-justify'>
      <div className='permission__list'>
          <Affix offsetTop={20}>
            <a href='javascript: void(0);' className='permission__listItem permission__listItem--current'>
              <span className='permission__listPercents'>
                <span>30 actions</span>
              </span>
              <span className='permission__listActionTitle'>
              <Checkbox >List</Checkbox>
              </span>
            </a>
            <a href='javascript: void(0);' className='permission__listItem permission__listItem'>
              <span className='permission__listPercents'>
                <span>30 actions</span>
              </span>
              <span className='permission__listActionTitle'>
              <Checkbox >Read</Checkbox>
              </span>
            </a>
            <a href='javascript: void(0);' className='permission__listItem permission__listItem'>
              <span className='permission__listPercents'>
                <span>23 actions</span>
              </span>
              <span className='permission__listActionTitle'>
              <Checkbox >Write</Checkbox>
              </span>
            </a>
            <a href='javascript: void(0);' className='permission__listItem permission__listItem'>
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
            <small className='font-italic text-right'>*Add permission to groups help you manage your permissions easier. You can add permission to many permissions by add permission to group instead.</small>
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

export default Step2
