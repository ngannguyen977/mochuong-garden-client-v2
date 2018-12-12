import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Table, TreeSelect, Tag, Button, Upload, Icon, message, Steps, Divider } from 'antd'

const columns = [
    {
        title: 'Permission name',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        width: '10%',
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
            <div className='permission-create-step-1 row'>
                <div className='col-lg-4 text-justify'>
                    <div className='form-group font-size-20'>
                        <label htmlFor='product-edit-title'>Permissionname:</label>
                        <code id='product-edit-title' > {this.props.permissionCreate.permission || 'permissionname is missing'}</code>
                    </div>
                    <div className='form-group font-size-20'>
                        <label htmlFor='product-edit-title'>Password:</label>
                        <code id='product-edit-title' >  {this.props.permissionCreate.password || 'password is missing'}</code>
                    </div>
                </div>
                <div className='col-lg-8'>
                    <div className='form-group'>
                        <Table
                            rowKey={record => record.id}
                            pagination={this.state.pagination}
                            loading={this.state.loading}
                            columns={columns}
                            onChange={this.handleTableChange}
                            dataSource={this.props.data} />
                    </div>
                </div>
            </div>)
    }
}

export default Review
