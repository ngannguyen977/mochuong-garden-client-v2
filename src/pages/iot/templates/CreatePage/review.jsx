import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Table, TreeSelect, Tag, Button, Upload, Icon, message, Steps, Divider } from 'antd'

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
    componentDidMount() {

    }
    render() {
        const { reviewPermissionColumns, reviewUserColumns, templateCreate } = this.props
        const { pagination, loading } = this.state
        return (
            <div className='template-review'>
                <div className='text-justify'>
                    <div className=' font-size-16 row'>
                        <div className='form-group col-lg-6'>
                            <h5 className='text-black'><strong>Template Name</strong></h5>
                            <p id='product-edit-title' > {templateCreate.name || 'Template name is missing'}</p>
                        </div>
                        <div className='form-group col-lg-6'>
                            <h5 className='text-black'><strong>Template Description</strong></h5>
                            <p id='product-edit-title' >  {templateCreate.description || 'Template description is missing'}</p>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='form-group'>
                            <Table
                                title={() => 'Users in Group'}
                                rowKey={record => record.id}
                                pagination={pagination}
                                loading={loading}
                                columns={reviewUserColumns}
                                onChange={this.handleTableChange}
                                dataSource={templateCreate.users} />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='form-group'>
                            <Table
                                title={() => 'Permission for Group'}
                                rowKey={record => record.id}
                                pagination={pagination}
                                loading={loading}
                                columns={reviewPermissionColumns}
                                onChange={this.handleTableChange}
                                dataSource={templateCreate.permissions} />
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default Review
