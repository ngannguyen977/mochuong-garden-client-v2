import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import { Popover, Icon, Popconfirm, message, Table, Button } from 'antd'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class PropertyPage extends React.Component {
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
    console.log('hanlde table change', (pagination, filters, sorter))
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
        title: 'Property name',
        dataIndex: 'name',
        sorter: true,
        width: '30%',
        render: (text, record) => (
          <a className='link' href={`#/properties/${record.id}`}>
            {record.name}
          </a>
        ),
      },
      {
        title: 'Color',
        dataIndex: 'color',
        sorter: true,
        width: '20%',
      },
      {
        title: 'Project',
        dataIndex: 'project',
        sorter: true,
        width: '50%',
        render: (text, record) => (
          <a className='link' href={`#/project/${record.projectId}`}>
            {record.projectId ? record.projectId : 'No Project'}
          </a>
        ),
      },
    ]
    const { loading, selectedRowKeys } = this.state
    const { totalItems, page, data, type, destroy } = this.props
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
        message.info('No row is selected!')
      } else {
        switch (actionType) {
          case type.del:
            if (status) {
              destroy(selectedRowKeys)
            } else {
              message.info('cancel deleted')
            }
            break
          default:
            break
        }
      }
    }
    const content = (
      <div>
        <Popconfirm
          title='Are you sure delete these properties? You cannot rollback.'
          onConfirm={() => handleActions(type.del)}
          onCancel={() => handleActions(type.del, false)}
          okText='Yes, I confirm'
          cancelText="No, I don't"
        >
          <p className='link'>Delete PRIORITIES</p>
        </Popconfirm>
      </div>
    )
    return (
      <div>
        <section className='card'>
          <div className='card-header'>
            <div className='utils__title'>
              <strong>Properties Management</strong>
            </div>
            <small>
              You manage access for users by creating properties and attaching them to users or
              groups. A property is an object, when associated with an entity or resource, defines
              their properties. We evaluates these properties when a principal, such as a user, makes a
              request. Properties in the properties determine whether the request is allowed or denied.
              Most properties are stored in cloud as JSON documents.
            </small>
            <p>
              <small>
                We define properties for an action regardless of the method that you use to perform
                the operation. For example, if a property allows the GetUser action, then a user with
                that property can get user information. When you create a user, you can set up the
                user to allow console or programmatic access. The user can sign in to the console
                using a user name and password. Or they can use access keys to work on the website.
              </small>
            </p>
          </div>
          <div className='card-body'>
            {totalItems && totalItems > 0 && (
              <div className='table-responsive'>
                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                  <Button
                    type='primary'
                    loading={loading}
                    style={{ marginRight: '5px' }}
                    href='#/properties/create'
                  >
                    Create Property
                  </Button>
                  <Popover placement='bottomRight' content={content} trigger='click'>
                    <Button type='primary' disabled={!hasSelected} loading={loading}>
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
                  dataSource={data}
                />
              </div>
            )}
            {(!totalItems || totalItems <= 0) && (
              <LockScreenPage name='Property' link='#/properties/create' />
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default PropertyPage
