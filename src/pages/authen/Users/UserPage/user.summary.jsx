import React from 'react'
import { Table } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class UserSummaryList extends React.Component {
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
      }
    }
  }
  componentWillMount() {
    const { getList, isEdit, getUsersByGroup, groupId } = this.props
    getList()
    if (groupId) {
      getUsersByGroup(groupId)
    }
  }
  componentDidUpdate() {
    const { selectedRowKeys, pagination } = this.state
    const { usersInGroup, totalItems } = this.props
    if (usersInGroup && usersInGroup.length > 0 && selectedRowKeys.length === 0) {
      let userIds = usersInGroup.map(x => x.id)
      console.log('select',selectedRowKeys,userIds,userIds !== selectedRowKeys)
      if (userIds !== selectedRowKeys) {
        this.setState({
          selectedRowKeys: userIds,
          ...pagination,
          total: totalItems
        })
      }
    }
  }

  render() {
    const { summaryColumns, isEdit, groupId, parent, groupCreate, createGroup, data, changeUsersForGroup } = this.props
    const { pagination, loading ,selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
        })
        switch (parent) {
          case 'group':
            if (isEdit) {
              console.log('changeUsersForGroup in group summary')
              changeUsersForGroup(groupId,selectedRowKeys)
            } else {
              createGroup({ ...groupCreate, users: selectedRows })
            }
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
        rowKey={record => record.id}
        pagination={pagination}
        loading={loading}
        columns={summaryColumns}
        onChange={this.handleTableChange}
        dataSource={data} />
    )
  }
}
export default UserSummaryList