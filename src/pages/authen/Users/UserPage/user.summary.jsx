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
      },
      data: []
    }
  }
  componentWillMount() {
    const { totalItems, getList, isEdit, getUsersByGroup, usersInGroup, groupId } = this.props
    if (isEdit) {
      if (groupId && !usersInGroup) {
        getUsersByGroup(groupId)
      }
    }
    else if (totalItems === -1) {
      getList()
    }
  }
  componentDidMount() {
    this.setState({ ...this.state.pagination, total: this.props.totalItems })
  }
  componentDidUpdate() {
    const { totalItems, data, getList, isEdit, getUsersByGroup, usersInGroup, groupId } = this.props
    if (isEdit) {
      console.log(groupId,usersInGroup,this.state.data)
      if (groupId && usersInGroup && usersInGroup.users.length > 0 && this.state.data.length === 0) {
        let _users = usersInGroup.users.filter(x => x.groupId === groupId)
        console.log(groupId,usersInGroup,this.state.data,_users)
        if (_users)
          this.setState({
            data: _users
          })
      }
    } else if (totalItems > 0 && data
      && data.length > 0 && this.state.data.length === 0) {
      this.setState({
        data
      })
    }
  }
  render() {
    const { summaryColumns, parent, groupCreate, createGroup } = this.props
    const { pagination, loading, data } = this.state
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
        })
        switch (parent) {
          case 'group':
            createGroup({ ...groupCreate, users: selectedRows })
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