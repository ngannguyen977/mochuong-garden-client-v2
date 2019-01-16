import React from 'react'
import { Table } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class TemplateSummaryList extends React.Component {
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
    const { getList, isEdit, getTemplatesByGroup, groupId } = this.props
    getList()
    if (groupId) {
      getTemplatesByGroup(groupId)
    }
  }
  componentWillReceiveProps(){
    const { templatesInGroup, totalItems } = this.props
    if(!templatesInGroup || templatesInGroup.length===0){
      return
    }
    const { selectedRowKeys, pagination } = this.state
      if (templatesInGroup && templatesInGroup.length > 0 && selectedRowKeys.length === 0) {
        let templateIds = templatesInGroup.map(x => x.id)
        if (templateIds !== selectedRowKeys) {
          this.setState({
            selectedRowKeys: templateIds,
            ...pagination,
            total: totalItems
          })
        }
      }
  }

  render() {
    const { summaryColumns, isEdit, groupId, parent, groupCreate, createGroup, data, changeTemplatesForGroup } = this.props
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
              changeTemplatesForGroup(groupId,selectedRowKeys)
            } else {
              createGroup({ ...groupCreate, templates: selectedRows })
            }
            break
          default:
            break
        }
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled Template', // Column configuration not to be checked
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
export default TemplateSummaryList