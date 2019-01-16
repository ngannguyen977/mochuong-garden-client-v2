import React from 'react'
import { Table } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ThingSummaryList extends React.Component {
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
    const { getList, isEdit, getThingsByGroup, groupId } = this.props
    getList()
    if (groupId) {
      getThingsByGroup(groupId)
    }
  }
  componentWillReceiveProps(){
    const { thingsInGroup, totalItems } = this.props
    if(!thingsInGroup || thingsInGroup.length===0){
      return
    }
    const { selectedRowKeys, pagination } = this.state
      if (thingsInGroup && thingsInGroup.length > 0 && selectedRowKeys.length === 0) {
        let thingIds = thingsInGroup.map(x => x.id)
        if (thingIds !== selectedRowKeys) {
          this.setState({
            selectedRowKeys: thingIds,
            ...pagination,
            total: totalItems
          })
        }
      }
  }

  render() {
    const { summaryColumns, isEdit, groupId, parent, groupCreate, createGroup, data, changeThingsForGroup } = this.props
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
              changeThingsForGroup(groupId,selectedRowKeys)
            } else {
              createGroup({ ...groupCreate, things: selectedRows })
            }
            break
          default:
            break
        }
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled Thing', // Column configuration not to be checked
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
export default ThingSummaryList