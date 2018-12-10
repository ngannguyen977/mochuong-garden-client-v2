import React from 'react'
import { mapStateToProps, mapDispathToProps } from './container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Input, Table, Button, Switch, Icon, message, Steps, Divider } from 'antd'
import GroupList from './group'
import PolicyList from './policies'
const Search = Input.Search;

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class Step2 extends React.Component {
  constructor() {
    super()
    this.state = {
      modeTitle: 'Add user to groups',
      mode: 'group'
    }
  }
  handleMode(isAttachPolicies) {
    switch (isAttachPolicies) {
      case false:
        this.setState({ modeTitle: 'Attach policies', mode: 'policy' })
        break;
      default:
        this.setState({ modeTitle: 'Add user to groups', mode: 'group' })
        break;
    }
  }
  render() {

    return (
      <div className='user-create-step-2 row'>
        <div className='col-lg-4 text-justify'>
          <div className='form-group'>
            <Switch size='large' defaultChecked onChange={(value) => this.handleMode(value)} />
            <span>{'  ' + this.state.modeTitle}</span>
          </div>
          <p>With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
               (or don't remember the name you chose), try using your e-mail address as your username.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
          <p>With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
          (or don't remember the name you chose), try using your e-mail address as your username.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
        </div>
        <div className='col-lg-8'>
          <h2>{this.state.modeTitle}</h2>
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
                href={'#/' + this.state.mode + '/create'}
              >
                Create&ensp;{this.state.mode}
              </Button>
            </div>
          </div>
          <div className='form-group'>
            {this.state.mode === 'group' && <GroupList />}
            {this.state.mode === 'policy' && <PolicyList />}
          </div>
        </div>

      </div>
    )
  }
}

export default Step2
