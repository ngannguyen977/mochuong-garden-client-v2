import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import helper from '../../../../helper'
import { Checkbox, Popover, Icon, Tag, Popconfirm, message, Table, Button } from 'antd'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class GroupPage extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    pagination: {
      defaultCurrent: 1,
      total: -1,
      current: 1,
      pageSize: 0,
    },
  }
  componentWillMount() {
    // if (!this.props.totalItems || this.props.totalItems <= 0) {
    const { limit, page, sort, isAsc } = queryString.parse(this.props.location.search)
    this.props.getList(limit, page, sort, isAsc)
    // }
  }
  componentDidMount() {
    this.setState({ ...this.state.pagination, total: this.props.totalItems })
  }
  handleTableChange = (pagination, filters, sorter) => {
    console.log('hanlde table change', (pagination, filters, sorter))
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    let params = {
      limit: pagination.pageSize,
      page: pagination.current,
      sort: sorter.field,
      isAsc: sorter.order,
      ...filters,
    }
    this.props.getList({ ...params })
  }
  render() {
    const columns = [
      {
        title: 'Group name',
        dataIndex: 'name',
        sorter: true,
        width: '30%',
        render: (text, record) => (
          <a className="link" href={`#/groups/detail/${record.id}`}>
            {record.name}
          </a>
        ),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        sorter: true,
        width: '50%',
      },
      {
        title: 'Status',
        dataIndex: 'active',
        sorter: true,
        width: '7%',
        render: (text, record) => (
          <Checkbox
            defaultChecked={true}
            // checked={record.active}
          />
        ),
      },
      {
        title: 'Create time',
        dataIndex: 'created_at',
        sorter: true,
        width: '15%',
        render: x => helper.formatDate(new Date(x)),
      },
    ]
    const { loading, selectedRowKeys, pagination } = this.state
    const { totalItems, page, data, type, destroy, changeStatus } = this.props
    const hasSelected = selectedRowKeys.length > 0
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
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
      if (!selectedRowKeys || selectedRowKeys.length === 0) {
        message.info('No group is selected!')
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
              <strong>Groups Management</strong>
            </div>
            <small>
              Managing access between an employee and their permissions on a one-to-many basis
              becomes more difficult as your organization grows in size and scope. There are too
              many users and too many permissions to control. Grouping your users and permissions is
              the smart and easy way to deal with this complexity by enabling greater employee
              onboarding efficiencies to grant, or revoke, access instantly with a click to remove
              them. Here are the things you can do with thing groups:
            </small>
            <ul className="list-unstyled">
              <ul>
                <li>
                  <small>Create, describe or delete a group.</small>
                </li>
                <li>
                  <small>
                    List the groups you have created and permissions, users inside them.
                  </small>
                </li>
                <li>
                  <small>Attach or detach a permissions to or from a group.</small>
                </li>
                <li>
                  <small>Add or remove a user to or from a group.</small>
                </li>
              </ul>
            </ul>
          </div>
          <div className="card-body">
            {totalItems && totalItems > 0 && (
              <div className="table-responsive">
                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                  <Button
                    type="primary"
                    loading={loading}
                    style={{ marginRight: '5px' }}
                    href="#/groups/create"
                  >
                    Create Group
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
                  pagination={pagination}
                  loading={loading}
                  columns={columns}
                  onChange={this.handleTableChange}
                  dataSource={data}
                />
              </div>
            )}
            {(!totalItems || totalItems <= 0) && (
              <LockScreenPage name="Group" link="#/groups/create" />
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default GroupPage
