import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import { Popover, Icon, Popconfirm, message, Table, Button, Tag, Checkbox } from 'antd'
import helper from '../../../../helper';

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class PolicyPage extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    selectedRows: {},
    loading: false,
    pagination: {
      defaultCurrent: 1,
      total: -1,
      current: 1,
      pageSize: 10,
    },
  }
  componentWillMount() {
    const { totalItems, location, getList } = this.props
    // if (!totalItems || totalItems <= 0) {
    const { keyword, keysort, types, skip, limit, isAsc } = queryString.parse(location.search)
    getList(keyword, keysort, types, skip, limit, isAsc)
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
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        width: '20%',
        render: (text, record) => (
          <a className="link" href={`#/policies/detail/${record.policyId}`}>
            {record.name}
          </a>
        ),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: '25%',
      },
      {
        title: 'Effect',
        dataIndex: 'effect',
        sorter: true,
        width: '7%',
        render: (text, record) => (
          <Checkbox defaultChecked={record.effect} checked={record.effect} />
        ),
      },
      {
        title: 'Action',
        dataIndex: 'action',
        sorter: true,
        width: '20%',
      }, {
        title: 'Resource',
        dataIndex: 'resources',
        sorter: true,
        width: '23%',
        render: (text, record) => (record.resources || []).map(x => (<Tag key={x} color={helper.colorFull()}>{x}</Tag>))
      },
    ]
    const { loading, selectedRowKeys, selectedRows } = this.state
    const { totalItems, page, data, type } = this.props
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    }
    const hasSelected = selectedRowKeys.length > 0
    const handleActions = (actionType) => {
      if (!selectedRowKeys || selectedRowKeys.length === 0) {
        message.info('No row is selected!')
      } else {
        switch (actionType) {
          case type.del:
            if (selectedRows && Array.isArray(selectedRows) && selectedRows.length > 0) {
              this.props.destroy(selectedRows[0].id)
            }
            break
          case type.cancel:
            message.info('canceled delete')
            break
          case type.addToUser:
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
          title="Are you sure delete these policies? You cannot rollback."
          onConfirm={() => handleActions(type.del)}
          onCancel={() => handleActions(type.cancel)}
          okText="Yes, I confirm"
          cancelText="No, I don't"
        >
          <p className="link">Delete POLICIES</p>
        </Popconfirm>
        <p className="link" onClick={() => handleActions(type.addToUser)}>
          Add to USERS(come in soon)
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
              <strong>Policies Management</strong>
            </div>
            <small>
              You manage access for users by creating policies and attaching them to users or
              groups. A policy is an object, when associated with an entity or resource, defines
              their policies. We evaluates these policies when a principal, such as a user, makes a
              request. Policies in the policies determine whether the request is allowed or denied.
              Most policies are stored in cloud as JSON documents.
            </small>
            <p>
              <small>
                We define policies for an action regardless of the method that you use to perform
                the operation. For example, if a policy allows the GetUser action, then a user with
                that policy can get user information. When you create a user, you can set up the
                user to allow console or programmatic access. The user can sign in to the console
                using a user name and password. Or they can use access keys to work on the website.
              </small>
            </p>
          </div>
          <div className="card-body">
            {totalItems && totalItems > 0 && (
              <div className="table-responsive">
                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                  <Button
                    type="primary"
                    loading={loading}
                    style={{ marginRight: '5px' }}
                    href="#/policies/create"
                  >
                    Create Policy
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
                  rowKey={record => record.policyId}
                  pagination={this.state.pagination}
                  loading={this.state.loading}
                  columns={columns}
                  onChange={this.handleTableChange}
                  dataSource={data}
                />
              </div>
            )}
            {(!totalItems || totalItems <= 0) && (
              <LockScreenPage name="Policy" link="#/policies/create" />
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default PolicyPage
