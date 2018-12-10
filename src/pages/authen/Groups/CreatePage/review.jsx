import React from 'react'
import { mapStateToProps, mapDispathToProps } from './container'
import { connect } from 'react-redux'
import { Table, TreeSelect, Tag, Button, Upload, Icon, message, Steps, Divider } from 'antd'

const columns = [
    {
        title: 'Policy name',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        width: '10%',
    },
    {
        title: 'Groups',
        dataIndex: 'groups',
        width: '20%',
        render: tags => (
            <span>
                {tags.map(tag => <Tag color='blue' key={tag.id}>{tag.name}</Tag>)}
            </span>
        ),
    },
    {
        title: 'Description',
        dataIndex: 'description',
        width: '30%',
    }
]

@connect(
    mapStateToProps,
    mapDispathToProps,
)
export class Review extends React.Component {
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
    render() {
        return (
            <div className='group-create-step-1 '>
                <div className='text-justify'>
                    <div className=' font-size-16 row'>
                        <div className='form-group col-lg-6'>
                            <label htmlFor='product-edit-title'>Group name:</label>
                            <p id='product-edit-title' > {this.props.groupCreate.group || 'group name is missing'}</p>
                        </div>
                        <div className='form-group col-lg-6'>
                            <label htmlFor='product-edit-title'>Description:</label>
                            <p id='product-edit-title' >  {this.props.groupCreate.description || 'description is missing'}</p>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='form-group'>
                            <Table
                                title={() => 'Users in Group'}
                                rowKey={record => record.id}
                                pagination={this.state.pagination}
                                loading={this.state.loading}
                                columns={columns}
                                onChange={this.handleTableChange}
                                dataSource={this.props.data} />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='form-group'>
                            <Table
                                title={() => 'Policies for Group'}
                                rowKey={record => record.id}
                                pagination={this.state.pagination}
                                loading={this.state.loading}
                                columns={columns}
                                onChange={this.handleTableChange}
                                dataSource={this.props.data} />
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default Review
