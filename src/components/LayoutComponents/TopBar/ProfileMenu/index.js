import React from 'react'
import { connect } from 'react-redux'
import { logout } from 'reducers/app'
import { Menu, Dropdown, Avatar, Badge } from 'antd'
import { Link } from 'react-router-dom'

const mapDispatchToProps = dispatch => ({
  logout: event => {
    event.preventDefault()
    dispatch(logout())
  },
})

const mapStateToProps = (state, props) => ({
  userState: state.app.userState,
})

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class ProfileMenu extends React.Component {
  state = {
    count: 7,
  }

  addCount = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }

  render() {
    const { count } = this.state
    const { userState, logout } = this.props
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <div className='rfq__widget__system-status__item'>
            <strong>Hello {userState.username}</strong>
            <div>
              <strong>Role:</strong> {(userState.role || {}).name}
            </div>
            <div className='rfq__widget__system-status__item'>
              <strong>Email:</strong> {(userState.customer || {}).email}
            </div>
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link to='/profile'>
            <i className='topbar__dropdownMenuIcon icmn-man' /> Edit Profile
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/users'>
            <i className='topbar__dropdownMenuIcon icmn-man-woman' /> Manage Users
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href='#;' onClick={logout}>
            <i className='topbar__dropdownMenuIcon icmn-exit' /> Logout
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className='topbar__dropdown d-inline-block'>
        <Dropdown
          overlay={menu}
          trigger={['click']}
          placement='bottomRight'
          onVisibleChange={this.addCount}
        >
          <a className='ant-dropdown-link' href='/'>
            <Badge count={count}>
              <Avatar className='topbar__avatar' shape='square' size='large' icon='user' />
            </Badge>
          </a>
        </Dropdown>
      </div>
    )
  }
}

export default ProfileMenu
