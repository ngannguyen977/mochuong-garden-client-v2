import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Table, Tag } from 'antd'
import helper from '../../../../helper'
@connect(
    mapStateToProps,
    mapDispathToProps,
)
export class ResourceList extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            pagination: {
                defaultCurrent: 1,
                total: -1,
                current: 1,
                pageSize: 10,
            }
        }
    }
    componentWillMount() {
        const { detail } = this.props
        this.setState({
            pagination: {
                total: ((detail || {}).resourceTypes || {}).length
            }
        })
    }
    render() {
        const column = [
            {
                title: 'Name',
                dataIndex: 'name',
                width: '20%',
            },
            {
                title: 'effect',
                dataIndex: 'effect',
                width: '10%',
            },
            {
                title: 'Actions',
                dataIndex: 'actions',
                width: '30%',
                render: tags => (
                    <span>
                        {tags.map(tag => <Tag color={helper.colorFull()} key={tag}>{tag}</Tag>)}
                    </span>
                ),
            },
            {
                title: 'Resources',
                dataIndex: 'resources',
                width: '30%',
                render: tags => (
                    <span>
                        {tags.map(tag => <Tag color={helper.colorFull()} key={tag}>{tag}</Tag>)}
                    </span>
                ),
            }
        ]
        const { detail } = this.props
        return (
            <Table
                rowKey={record => record.name}
                pagination={this.state.pagination}
                loading={this.state.loading}
                columns={column}
                onChange={this.handleTableChange}
                dataSource={detail.resourceTypes} />)
    }
}

export default ResourceList
