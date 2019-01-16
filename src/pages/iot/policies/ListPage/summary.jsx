import React from 'react'
import { Table } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class SummaryPage extends React.Component {
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
    const { userPolicies,groupPolicies, totalItems,groupUuid,userUuid } = this.props
    let _policies
    if(groupUuid){
      _policies =  groupPolicies
    }
    if(userUuid){
      _policies =  userPolicies
    }
    if ( _policies && _policies.length > 0 && selectedRowKeys.length === 0) {
      this.setState({
        selectedRowKeys: _policies.map(x=>x.policyId),
        ...pagination,
        total: totalItems
      })
    }
  }
  render() {
    const { summaryColumns, parent, userCreate, createUser, groupCreate, createGroup,data,userUuid,isEdit,changePoliciesForUser } = this.props
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
            changePoliciesForUser(selectedRowKeys, userUuid)
          } else {
            createUser({ ...userCreate, policies: selectedRows })
          }
            break
          case 'group':
            createGroup({ ...groupCreate, policies: selectedRows })
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
export default SummaryPage