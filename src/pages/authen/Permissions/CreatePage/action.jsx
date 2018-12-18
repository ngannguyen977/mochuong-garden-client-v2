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
    const { create, actions, actionTotal, permission, permissionCreate, getListActionOfService } = this.props
    if (permissionCreate && permissionCreate.service && (!actions || actionTotal === 0
      || permission.shortName !== permissionCreate.service.shortName)) {
      create({ ...permissionCreate, actions: [],resourceType:[] })
      this.setState({
        selectedRowKeys: []
      })
      getListActionOfService(permissionCreate.service.shortName)
    }
  }
  componentDidMount() {
    const { permissionCreate } = this.props
    if (permissionCreate.actions) {
      this.setState({
        selectedRowKeys: permissionCreate.actions.map(x=>x.name)
      })
    }
  }
  render() {
    const { create, permissionCreate } = this.props
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        create({ ...permissionCreate, actions: selectedRows,resourceType:selectedRows.map(x=>x.resourceType).filter(onlyUnique) })
        this.setState({ selectedRowKeys })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled Permission', // Column configuration not to be checked
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