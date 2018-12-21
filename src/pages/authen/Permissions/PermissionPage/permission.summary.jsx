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
    const { getList, userId,groupIds,getByUser } = this.props
    getList()
    getByUser(userId,groupIds.join())
  }
  componentDidUpdate() {
    const { selectedRowKeys, pagination } = this.state
    const { userPermissions, totalItems } = this.props
    if ( userPermissions && userPermissions.length > 0 && selectedRowKeys.length === 0) {
      console.log(userPermissions.map(x=>x.policyId))
      this.setState({
        selectedRowKeys: userPermissions.map(x=>x.policyId),
        ...pagination,
        total: totalItems
      })
    }
  }
  render() {
    const { summaryColumns, parent, userCreate, createUser, groupCreate, createGroup,data } = this.props
    const { pagination, loading ,selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
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
        rowKey={record => record.policyId}
        pagination={pagination}
        loading={loading}
        columns={summaryColumns}
        onChange={this.handleTableChange}
        dataSource={data} />
    )
  }
}
export default PermissionSummary