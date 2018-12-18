import React from 'react'
import { Input, Table, Select, Button, Upload, Icon, message, Steps, Divider } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'

const columns = [
  {
    title: 'Service name',
    dataIndex: 'name',
    sorter: true,
    width: '33%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width: '60%',
  }
]

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ServiceList extends React.Component {
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
    if (!this.props.services || this.props.serviceTotal === 0) {
      this.props.getListService()
    }
  }
  componentDidMount(){
    const { permissionCreate,permission } = this.props
    if(permission.shortName){
      this.setState({
        selectedRowKeys: [permissionCreate.service.id]
      })
    }
  }
  render() {
    const { create, permissionCreate } = this.props
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        create({ ...permissionCreate, service: selectedRows[0] })
        this.setState({ selectedRowKeys })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled Permission', // Column configuration not to be checked
        name: record.name,
      }),
      type: 'radio'
    }
    if (this.state.pagination.total === 0 && this.props.actionTotal !== 0) {
      this.setState({ ...this.state, pagination: { ...this.state.pagination, total: this.props.serviceTotal } })
    }
    return (
      <Table
        rowSelection={rowSelection}
        rowKey={record => record.id}
        pagination={this.state.pagination}
        loading={this.state.loading}
        columns={columns}
        onChange={this.handleTableChange}
        dataSource={this.props.services} />
    )
  }
}
export default ServiceList