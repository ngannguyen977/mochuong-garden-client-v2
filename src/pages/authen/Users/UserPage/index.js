import React from "react"
import { Table, Button, Pagination } from "antd"
import { mapStateToProps, mapDispathToProps } from "../container"
import { connect } from "react-redux"
import queryString from "query-string"
import LockScreenPage from "../../../DefaultPages/LockscreenPage/Lockscreen"
import helper from "../../../../helper"
import { Checkbox, Popover, Icon, Popconfirm, message } from "antd"
import "../../../../resources/style.scss"
import UserCard from '../../../components/UserCard'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class UserPage extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      current: 0,
      pagination: {
        defaultCurrent: 1,
        total: -1,
        current: 1,
        pageSize: 10,
      },
      totalItems: 0,
      users: []
    }
    this.handleActions = this.handleActions.bind(this)
  }

  componentWillMount() {
    const { limit, page, sort, isAsc } = queryString.parse(this.props.location.search)
    this.props.getList(limit, page, sort, isAsc)
  }
  componentWillReceiveProps() {
    const { totalItems } = this.props
    const { pagination } = this.state
    if (totalItems > 0 && pagination !== totalItems) {
      this.setState({
        pagination: {
          total: totalItems,
        },
      })
    }
  }
  onChange = (page, keyword) => {
    const { limit, sort, isAsc } = queryString.parse(this.props.location.search)
    this.props.getList(limit, page > 0 ? page - 1 : page, sort, isAsc)
    this.setState({
      current: page,
      keyword,
    })
  }
  handleActions = (type, username, status) => {
    const { destroy, changeStatus } = this.props
    switch (type) {
      case 'DELETE':
        destroy(username)
        break
      case 'STATUS':
        changeStatus(username, status)
        break
      default:
        break
    }
  }
  render() {
    const { loading, selectedRowKeys } = this.state
    const { totalItems, data, type, match } = this.props


    return (
      <div className='user-page'>
        <section className='card'>
          <div className='card-header'>
            <div className='utils__title'>
              <strong>Users Management</strong>
            </div>
            <small>
              User management allow admins can control all users. Administrators can create a new
              user, add a user to several groups, attach some permission, change status or delete
              users. You also view detail a user, identify groups and permissions of a user.
            </small>
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
              <Button
                type='primary'
                loading={loading}
                style={{ marginRight: '5px' }}
                href='#/users/create'
              >
                Create User
                  </Button>
            </div>
            {totalItems > 0 && <div className='text-right' style={{ marginBottom: 10, marginRight: 15 }}>
              <Pagination
                current={this.state.current}
                onChange={page => this.onChange(page)}
                total={totalItems}
                pageSize={9}
              />
            </div>}
          </div>
          <div className='card-body'>
            <div className='row thing-detail__user'>
              {totalItems > 0 && data.map(x =>
                <div className='col-md-4 col-xs-6 user-card' key={x.id}>
                  <UserCard
                    user={x}
                    userPageAction={this.handleActions}
                  />
                </div>)}
            </div>

            {(!totalItems || totalItems <= 0) && (
              <LockScreenPage name='User' link={`#/users/create`} />
            )}
            {totalItems > 0 && <div className='text-right' style={{ marginTop: 10, marginRight: 15 }}>
              <Pagination
                current={this.state.current}
                onChange={page => this.onChange(page)}
                total={totalItems}
                pageSize={9}
              />
            </div>}
          </div>
        </section>
      </div>
    )
  }
}

export default UserPage
