import React from 'react'
import { Table, Button } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import helper from '../../../../helper'
import { Checkbox, Popover, Icon, Popconfirm, message } from 'antd'
import '../../../../resources/style.scss'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class UserPage extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    pagination: {
      defaultCurrent: 1,
      total: -1,
      current: 1,
      pageSize: 10,
    },
  }
  componentWillMount() {
    // if (!this.props.totalItems || this.props.totalItems <= 0) {
    const { limit, page, sort, isAsc } = queryString.parse(this.props.location.search)
    this.props.getList(limit, page, sort, isAsc)
    // }
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

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    let params = {
      limit: pagination.pageSize,
      page: pagination.current - 1,
      sort: sorter.field,
      isAsc: sorter.order,
      ...filters,
    }
    this.props.getList(params.limit, params.page, params.sort, params.isAsc, filters)
  }
  render() {
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
        sorter: true,
        width: '30%',
        render: (record) => (
          <a className="link" href={`#/users/detail/${record.id}`}>
            {record.username}
          </a>
        ),
      },
      {
        title: 'Role',
        dataIndex: 'role.name',
        sorter: true,
        width: '30%',
      },
      {
        title: 'Status',
        dataIndex: 'active',
        sorter: true,
        width: '7%',
        render: (record) => (
          <Checkbox defaultChecked={record.active} checked={record.active} />
        ),
      },
      {
        title: 'Last Activity',
        dataIndex: 'last_login',
        sorter: true,
        width: '15%',
        render: x => helper.formatDate(new Date(x)),
      },
      {
        title: 'Create time',
        dataIndex: 'created_at',
        sorter: true,
        width: '15%',
        render: x => helper.formatDate(new Date(x)),
      },
    ]
    const { loading, selectedRowKeys } = this.state
    const { totalItems, data, type } = this.props
    const hasSelected = selectedRowKeys.length > 0
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.setState({
          selectedRowKeys,
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    }
    const handleActions = (actionType, status = true) => {
      const { selectedRowKeys } = this.state
      const { destroy, changeStatus } = this.props

      if (!selectedRowKeys || selectedRowKeys.length === 0) {
        message.info('No user is selected!')
      } else {
        switch (actionType) {
          case type.del:
            if (status) {
              destroy(selectedRowKeys)
            } else {
              message.info('canceled delete')
            }
            break
          case type.changeStatus:
            changeStatus(selectedRowKeys, status)
            break
          case type.attachPolicy:
            break
          case type.addToGroup:
            break
          default:
            break
        }
      }
    }
    const content = (
      <div>
        <Popconfirm
          title="Are you sure delete these users? You cannot rollback."
          onConfirm={() => handleActions(type.del)}
          onCancel={() => handleActions(type.del, false)}
          okText="Yes, I confirm"
          cancelText="No, I don't"
        >
          <p className="link">Delete USERS</p>
        </Popconfirm>
        <Popconfirm
          title="Are you sure change status these users?"
          onConfirm={() => handleActions(type.changeStatus)}
          onCancel={() => handleActions(type.changeStatus, false)}
          okText="Active"
          cancelText="Deactive"
        >
          <p className="link">Change STATUS</p>
        </Popconfirm>
        <p className="link" onClick={() => handleActions(type.attachPolicy)}>
          Attach POLICIES(come in soon)
        </p>
        <p className="link" onClick={() => handleActions(type.addToGroup)}>
          Add to GROUPS(come in soon)
        </p>
      </div>
    )

    return (
      <div>
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Users Management</strong>
            </div>
            <small>
              User management allow admins can control all users. Administrators can create a new
              user, add a user to several groups, attach some permission, change status or delete
              users. You also view detail a user, identify groups and permissions of a user.
            </small>
          </div>
          <div className="card-body">
            {totalItems && totalItems > 0 && (
              <div className="table-responsive">
                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                  <Button
                    type="primary"
                    loading={loading}
                    style={{ marginRight: '5px' }}
                    href="#/users/create"
                  >
                    Create User
                  </Button>
                  <Popover placement="bottomRight" content={content} trigger="click">
                    <Button type="primary" disabled={!hasSelected} loading={loading}>
                      Actions <Icon type="down-circle" theme="filled" />
                    </Button>
                  </Popover>
                </div>
                <span style={{ marginLeft: 8 }}>
                  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                <Table
                  rowSelection={rowSelection}
                  rowKey={record => record.id}
                  pagination={this.state.pagination}
                  loading={this.state.loading}
                  columns={columns}
                  onChange={this.handleTableChange}
                  dataSource={data}
                />
              </div>
            )}
            {(!totalItems || totalItems <= 0) && (
              <LockScreenPage name="User" link="#/users/create" />
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default UserPage
