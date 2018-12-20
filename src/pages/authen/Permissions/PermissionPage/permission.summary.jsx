import React from 'react'
import { Table } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class PermissionSummary extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      pagination: {
        defaultCurrent: 1,
        total: -1,
        current: 1,
        pageSize: 0,
      },
      data: []
    }
  }
  componentWillMount() {
    const { permission, getList, userId, userPermission, getByUser, getByGroup, isEdit, userCreatePermission, groupIds } = this.props
    if (isEdit) {
      if (userId && !userPermission) {
        getByUser(userId)
      }
      if (groupIds && !userCreatePermission) {
        getByGroup(groupIds)
      }
    }
    else if (!permission || permission.totalItems === -1) {
      getList()
    }
  }
  componentDidMount() {
    this.setState({ ...this.state.pagination, total: this.props.totalItems })
  }
  componentDidUpdate() {
    const { userId, userPermission, userCreatePermission, groupIds, isEdit, permission } = this.props
    if (isEdit) {
      if (userId && userPermission && userPermission.length > 0 && this.state.data.length === 0) {
        this.setState({
          data: userPermission
        })
      }
      if (groupIds && userCreatePermission && userCreatePermission.length > 0 && this.state.data.length === 0) {
        this.setState({
          data: userCreatePermission
        })
      }
    } else if (permission && permission.totalItems > 0 && permission.permissions
      && permission.permissions.length>0 && this.state.data.length === 0) {
      this.setState({
        data: permission.permissions
      })
    }
  }
  render() {
    const { summaryColumns, parent, userCreate, createUser, groupCreate, createGroup } = this.props
    const { pagination, loading, data } = this.state
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
        })
        switch (parent) {
          case 'user':
            createUser({ ...userCreate, permissions: selectedRows })
            break
          case 'group':
            createGroup({ ...groupCreate, permissions: selectedRows })
            break
          default:
            break
        }
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <Table
        rowSelection={rowSelection}
        rowKey={record => record.name}
        pagination={pagination}
        loading={loading}
        columns={summaryColumns}
        onChange={this.handleTableChange}
        dataSource={data} />
    )
  }
}
export default PermissionSummary