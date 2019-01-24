import React from 'react'
import { Table } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../../container'
import { connect } from 'react-redux'
import { onlyUnique } from '../../../../../helper'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ActionList extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      pagination: {
        defaultCurrent: 1,
        total: 0,
        pageSize: 10,
      }
    }
  }
  componentWillMount() {
    const { create, policyCreate } = this.props
    create({ ...policyCreate, actions: [], resourceType: [] })
    this.setState({
      selectedRowKeys: []
    })
  }
  componentDidMount() {
    const { policyCreate } = this.props
    if (policyCreate.actions) {
      this.setState({
        selectedRowKeys: policyCreate.actions.map(x => x.name)
      })
    }
  }
  render() {
    const { create, policyCreate, actionColumns, iotActions } = this.props
    const { selectedRowKeys, pagination, loading } = this.state
    const rowSelection = {
      selectedRowKeys,
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        create({ ...policyCreate, actions: selectedRows, resourceType: selectedRows.map(x => x.resourceType).filter(onlyUnique) })
        this.setState({ selectedRowKeys })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled Policy', // Column configuration not to be checked
        name: record.name,
      }),
    }

    return (
      <Table
        rowSelection={rowSelection}
        rowKey={record => record.name}
        loading={loading}
        columns={actionColumns}
        dataSource={iotActions} />
    )
  }
}
export default ActionList