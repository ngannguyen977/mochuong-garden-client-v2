import React from 'react'
import { Table } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class GroupSummaryList extends React.Component {
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
    const { getList } = this.props
    getList()
  }

  componentDidMount() {
    const { selectedRowKeys, pagination } = this.state
    const { groupIds, totalItems } = this.props
    if (groupIds && groupIds.length > 0 && selectedRowKeys.length === 0) {
      this.setState({
        selectedRowKeys: groupIds,
        ...pagination,
        total: totalItems
      })
    }
  }

  render() {
    const { summaryColumns, data, parent, userCreate, createUser, isEdit, changeGroupsForUser, userUpdate, userId } = this.props
    const { pagination, loading, selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
        })
        switch (parent) {
          case 'user':
            if (isEdit) {
              changeGroupsForUser(selectedRowKeys, userId)
            } else {
              createUser({ ...userCreate, groups: selectedRowKeys,fullGroups: selectedRows })
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
export default GroupSummaryList