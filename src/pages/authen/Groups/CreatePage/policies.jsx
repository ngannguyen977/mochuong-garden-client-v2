import React from 'react'
import { Input, Table, Select, Button, Upload, Icon, message, Steps, Divider } from 'antd'
import { mapStateToProps, mapDispathToProps } from './container'
import { connect } from 'react-redux'

const columns = [
  {
    title: 'Policy name',
    dataIndex: 'name',
    sorter: true,
    width: '33%',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    sorter: true,
    width: '33%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width: '33%',
  }
]

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class PolicyList extends React.Component {
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
  componentDidMount() {
    if(!this.props.groups){
      this.props.getGroupList(100, 0)
      this.setState({ ...this.state.pagination, total: this.props.totalItems })
    }
  }
  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled Group', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <Table
        rowSelection={rowSelection}
        rowKey={record => record.id}
        pagination={this.state.pagination}
        loading={this.state.loading}
        columns={columns}
        onChange={this.handleTableChange}
        dataSource={this.props.data} />
    )
  }
}
export default PolicyList