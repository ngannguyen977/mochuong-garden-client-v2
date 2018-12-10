import React from 'react'
import { Table, Button } from 'antd'
import { mapStateToProps, mapDispathToProps } from './container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import helper from '../../../../helper'
import { Checkbox, Popover, Icon, Tag } from 'antd'
import '../../../../resources/style.scss'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class UserPage extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    actionsVisible: false,
    pagination: {
      defaultCurrent: 1,
      total: -1,
      current: 1,
      pageSize: 0,
    }
  }

  componentDidMount() {
    if (!this.props.totalItems || this.props.totalItems === 0) {
      const { limit, page, sort, isAsc } = queryString.parse(this.props.location.search);
      this.props.getList(limit, page, sort, isAsc)
    }
    this.setState({ ...this.state.pagination, total: this.props.totalItems })
  }
  handleActions = (type,id)=>{
    console.log('type',type,id)
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
  }
  render() {
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
        sorter: true,
        width: '20%',
      },
      {
        title: 'Customer',
        dataIndex: 'customer',
        sorter: true,
        width: '20%',
        render: (record) => (<span>{record.alias} - {record.first_name} {record.last_name}</span>)
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
        render: tags => (
          <span>
            {tags.map(tag => <Tag color='blue' key={tag.id}>{tag.name}</Tag>)}
          </span>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'active',
        sorter: true,
        width: '7%',
        render: (text, record) => (
          <Checkbox
            defaultChecked={record.active}
            checked={record.active}
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
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    const hasSelected = selectedRowKeys.length > 0
    const content = (
      <div>
        <p className='link' onClick={this.handleActions('del')}>Delete users</p>
        <p className='link' onClick={this.handleActions('change-status')}>Change users STATUS</p>
        <p className='link' onClick={this.handleActions('policy')}>Change users POLICIES</p>
        <p className='link' onClick={this.handleActions('group')}>Change users GROUPS</p>
      </div>
    );
    return (
      <div>
        <section className='card'>
          <div className='card-header'>
            <div className='utils__title'>
              <strong>Users Management</strong>
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
                <div style={{ marginBottom: 16, textAlign: "right" }}>
                  <Button
                    type='primary'
                    loading={loading}
                    style={{ marginRight: '5px' }}
                    href='#/users/create'
                  >
                    Create User
                    </Button>
                  <Popover
                  placement='bottomRight'
                  content={content}
                  trigger='click'>
                    <Button
                      type='primary'
                      disabled={!hasSelected}
                      loading={loading}
                    >
                      Actions <Icon type='down-circle' theme='filled' />
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
                  dataSource={data} />
              </div>)
            }
            {(!totalItems || totalItems === 0)
              && (<LockScreenPage name='User' link='#/users/create' />)}

          </div>
        </section>
      </div>
    )
  }
}

export default UserPage
