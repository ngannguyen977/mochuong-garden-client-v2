import React from 'react'
import { Input, Table, Select, Button, Upload, Icon, message, Steps, Divider } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { onlyUnique } from '../../../../helper'

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
    const { create, actions, actionTotal, policy, policyCreate, getListActionOfService } = this.props
    if (policyCreate && policyCreate.service && (!actions || actionTotal === 0
      || policy.shortName !== 'iot')) {
      create({ ...policyCreate, actions: [],resourceType:[] })
      this.setState({
        selectedRowKeys: []
      })
    }
  }
  componentDidMount() {
    const { policyCreate } = this.props
    if (policyCreate.actions) {
      this.setState({
        selectedRowKeys: policyCreate.actions.map(x=>x.name)
      })
    }
  }
  render() {
    const { create, policyCreate } = this.props
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      type:'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        create({ ...policyCreate, actions: selectedRows,resourceType:selectedRows.map(x=>x.resourceType).filter(onlyUnique) })
        this.setState({ selectedRowKeys })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled Policy', // Column configuration not to be checked
        name: record.name,
      }),
    }
    if (this.state.pagination.total === 0 && this.props.actionTotal !== 0) {
      this.setState({ ...this.state, pagination: { ...this.state.pagination, total: this.props.actionTotal } })
    }
    return (
      <Table
        rowSelection={rowSelection}
        rowKey={record => record.name}
        pagination={this.state.pagination}
        loading={this.state.loading}
        columns={this.props.actionColumns}
        dataSource={this.props.actions} />
    )
  }
}
export default ActionList