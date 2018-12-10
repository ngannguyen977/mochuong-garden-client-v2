import React from 'react'
import { Table, Button } from 'antd'
import { mapStateToProps, mapDispathToProps } from './container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import helper from '../../../../helper'
import { Checkbox, Popover,Icon } from 'antd'

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
    }
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }
  componentDidMount() {
    const { limit, page, sort, isAsc } = queryString.parse(this.props.location.search);
    this.props.getList(limit, page, sort, isAsc)
    this.setState({ ...this.state.pagination, total: this.props.totalItems })
  }
  handleTableChange = (pagination, filters, sorter) => {
    console.log('hanlde table change', (pagination, filters, sorter))
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager
    })
    let params = {
      limit: pagination.pageSize,
      page: pagination.current,
      sort: sorter.field,
      isAsc: sorter.order,
      ...filters,
    }
    this.props.getList({ ...params });
  }
  changeStatus = (id, status) => {
    // this.props.changeStatus(id, !status)
    console.log('status', id, status)
  }
  render() {
    const columns = [
      // {
      //   title: 'Id',
      //   dataIndex: 'id',
      //   hidden: true,
      // },
      {
        title: 'Groupname',
        dataIndex: 'username',
        sorter: true,
        width: '20%',
      },
      {
        title: 'Customer',
        dataIndex: 'customer.alias',
        sorter: true,
        width: '20%',
      },
      {
        title: 'Role',
        dataIndex: 'role.name',
        sorter: true,
        width: '20%',
      },
      {
        title: 'Group',
        dataIndex: 'groups',
        sorter: true,
        width: '10%',
      },
      {
        title: 'Status',
        dataIndex: 'active',
        sorter: true,
        width: '7%',
        render: (text, record) => (
          <Checkbox
            defaultChecked={record.active}
            onClick={this.changeStatus(record.id, record.active)}
          ></Checkbox>
        ),
      },
      {
        title: 'Last Activity',
        dataIndex: 'last_login',
        sorter: true,
        width: '15%',
        render: (x => helper.formatDate(new Date(x)))
      },
      {
        title: 'Create time',
        dataIndex: 'created_at',
        sorter: true,
        width: '15%',
        render: (x => helper.formatDate(new Date(x)))
      },
    ]
    const { loading, selectedRowKeys } = this.state
    const { totalItems, page, data } = this.props
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0
    const text = <span>Actions</span>;
    const content = (
      <div>
        <p>Delete users</p>
        <p>Change users STATUS</p>
        <p>Change users POLICIES</p>
        <p>Change users GROUPS</p>
      </div>
    );
    return (
      <div>
        <section className='card'>
          <div className='card-header'>
            <div className='utils__title'>
              <strong>Groups Management</strong>
            </div>
          </div>
          <div className='card-body'>
            <p>
              While Bootstrap uses aaa<code>em</code>s or <code>rem</code>s for defining most sizes,{' '}
              <code>px</code>s are used for grid breakpoints and container widths. This is because
              the viewport width is in pixels and does not change with the{' '}
              <a href='https://drafts.csswg.org/mediaqueries-3/#units'>font size</a>.
            </p>
            <p>
              See how aspects of the Bootstrap grid system work across multiple devices with a handy
              table.
            </p>
            <br />
            {(totalItems && totalItems > 0) &&
              (<div className='table-responsive'>
                <div style={{ marginBottom: 16,textAlign:"right" }}>
                <Button
                      type='primary'
                      onClick={this.start}
                      loading={loading}
                      style={{ marginRight:'5px' }}
                      href='#/users/create'
                    >
                      Create Group
                    </Button>
                  <Popover placement='bottomRight' title={text} content={content} trigger='click'>
                    <Button
                      type='primary'
                      onClick={this.start}
                      disabled={!hasSelected}
                      loading={loading}
                    >
                      Actions <Icon type='exclamation-circle' theme='filled' />
                    </Button>
                  </Popover>

                  <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                  </span>
                </div>
                <Table
                  rowSelection={rowSelection}
                  rowKey={record => record.id}
                  pagination={this.state.pagination}
                  loading={this.state.loading}
                  columns={columns}
                  onChange={this.handleTableChange}
                  dataSource={data} />
              </div>)
            }
            {(!totalItems || totalItems === 0)
              && (<LockScreenPage name='Group' link='#/groups/create'/>)}

          </div>
        </section>
      </div>
    )
  }
}

export default GroupPage
