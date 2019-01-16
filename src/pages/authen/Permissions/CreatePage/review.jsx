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
            },
            reviewData: {}
        }
    }
    componentWillMount() {
        // prepare data for review
        const { permissionCreate } = this.props
        let _actions = permissionCreate.actions.map(x => {
            let _resource = permissionCreate.resources.find(a => a.type === x.resourceType)
            return { ...x, resource: _resource.value }
        })
        let reviewData = {
            serviceName: permissionCreate.service.name,
            name: permissionCreate.name,
            description: permissionCreate.description,
            actions: _actions
        }
        this.setState({
            reviewData
        })
    }
    render() {
        const { reviewColumns } = this.props
        const { reviewData } = this.state
        return (
            <div className='permission-create-step-1 row'>
                <div className='col-lg-4 text-justify'>
                    <div className='form-group'>
                        <strong>Permission Name</strong>
                        <h5 className='text-black'><strong>{reviewData.name}</strong></h5>
                    </div>
                    <div className='form-group'>
                        <strong>Service</strong>
                        <h5 className='text-black'><strong>{reviewData.serviceName}</strong></h5>
                    </div>
                    <div className='form-group'>
                        <strong>Description</strong>
                        <p className='text-muted'>  {reviewData.description}</p>
                    </div>
                </div>
                <div className='col-lg-8'>
                    <div className='form-group'>
                        <Table
                            rowKey={record => record.name}
                            pagination={this.state.pagination}
                            loading={this.state.loading}
                            columns={reviewColumns}
                            onChange={this.handleTableChange}
                            dataSource={reviewData.actions} />
                    </div>
                </div>
            </div>)
    }
}

export default Review
