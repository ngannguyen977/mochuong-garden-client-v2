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
    const { getList, userUuid,getByUser,groupUuid,getByGroup } = this.props
    getList()
    if(userUuid){
      getByUser(userUuid)
    }
    if(groupUuid){
      getByGroup(groupUuid)
    }
  }
  componentDidUpdate() {
    const { selectedRowKeys, pagination } = this.state
    const { userPermissions,groupPermissions, totalItems,groupUuid,userUuid } = this.props
    console.log('user permission',userPermissions)
    let _permissions
    if(groupUuid){
      _permissions =  groupPermissions
    }
    if(userUuid){
      _permissions =  userPermissions
    }
    if ( _permissions && _permissions.length > 0 && selectedRowKeys.length === 0) {
      this.setState({
        selectedRowKeys: _permissions.map(x=>x.policyId),
        ...pagination,
        total: totalItems
      })
    }
  }
  render() {
    const { summaryColumns, parent, userCreate, createUser, groupCreate, createGroup,data,userUuid,isEdit,changePermissionsForUser } = this.props
    const { pagination, loading ,selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
        })
        switch (parent) {
          case 'user':
          if (isEdit) {
            console.log('change group for user in group summary',selectedRowKeys)
            changePermissionsForUser(selectedRowKeys, userUuid)
          } else {
            createUser({ ...userCreate, permissions: selectedRows })
          }
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