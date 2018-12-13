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
class PermissionPage extends React.Component {
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
  componentDidMount() {
    if (!this.props.totalItems || this.props.totalItems === 0) {
      const { limit, page, sort, isAsc } = queryString.parse(this.props.location.search)
      this.props.getList(limit, page, sort, isAsc)
    }
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
        title: 'Permission name',
        dataIndex: 'name',
        sorter: true,
        width: '30%',
        render: (text, record) => (
          <a className="link" href={`#/permissions/detail/${record.id}`}>
            {record.name}
          </a>
        ),
      },
      {
        title: 'Type',
        dataIndex: 'type',
        sorter: true,
        width: '20%',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        sorter: true,
        width: '50%',
      },
    ]
    const { loading, selectedRowKeys } = this.state
    const { totalItems, page, data, type } = this.props
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
    const hasSelected = selectedRowKeys.length > 0
    const handleActions = (actionType, status = true) => {
      if (!selectedRowKeys || selectedRowKeys.length === 0) {
        message.info('No group is selected!')
      } else {
        switch (actionType) {
          case type.del:
            if (status) {
              this.props.destroy(selectedRowKeys, status)
            } else {
              message.info('canceled delete')
            }
            break
          case type.changeStatus:
            this.props.changeStatus(selectedRowKeys, status)
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
          Attach POLICIES(comein soon)
        </p>
        <p className="link" onClick={() => handleActions(type.addToGroup)}>
          Add to GROUPS(comein soon)
        </p>
      </div>
    )
    return (
      <div>
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Permissions Management</strong>
            </div>
            <small>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
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
                    href="#/permissions/create"
                  >
                    Create Permission
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
            {(!totalItems || totalItems === 0) && (
              <LockScreenPage name="Permission" link="#/permissions/create" />
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default PermissionPage
