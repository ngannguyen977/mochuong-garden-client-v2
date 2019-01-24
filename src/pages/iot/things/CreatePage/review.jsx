import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Table, Tag, Checkbox, Input, Divider } from 'antd'
import Avatar from 'components/CleanComponents/Avatar'
import helper from '../../../../helper'

@connect(
    mapStateToProps,
    mapDispathToProps,
)
export class Review extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
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
        const { createModel, inheritCreateProperties, dataTypes } = this.props
        const { pagination, loading, data } = this.state
        const reviewColumns = [
            { title: 'Property name', dataIndex: 'name' },
            { title: 'Type', dataIndex: 'type' },
            {
                title: 'Persistent', dataIndex: 'isPersistent',
                render: (text, record) => (
                    <Checkbox defaultChecked={record.isPersistent} checked={record.isPersistent} />
                ),
            },
            {
                title: 'Logged', dataIndex: 'isLogged',
                render: (text, record) => (
                    <Checkbox defaultChecked={record.isLogged} checked={record.isLogged} />
                ),
            },
            {
                title: 'Read Only', dataIndex: 'isReadOnly',
                render: (text, record) => (
                    <Checkbox defaultChecked={record.isReadOnly} checked={record.isReadOnly} />
                ),
            },
            { title: 'Value', dataIndex: 'value' }
        ]
        const expandedRowRender = (row) => {
            const columns = [
                { title: 'Priority', dataIndex: 'priority' },
                { title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Operator', dataIndex: 'operator' },
                { title: 'Value', dataIndex: 'value' },
            ]
            let dataSource = row.alerts || []
            return (
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    rowKey={record => record.name}
                    size={'small'}
                />
            )
        }
        const getDataTypeName = (id) => {
            let dataType = dataTypes.find(x => x.id === id)
            if (!dataType) {
                return 'String'
            }
            return dataType.name
        }
        return (
            <div className='user-create-step-1 row'>
                <div className='col-lg-4 text-justify'>
                    <div className={`userCard px-3 py-5 userCard--typed bg-`}>
                        <Avatar
                            src={'resources/iot/gateway-onsky.png'}
                            border={true}
                            borderColor='white'
                            size='90'
                        />
                        <div className='my-3 text-center'>
                            <div className='userCard__userName font-size-18'>{createModel.name || 'No name'}</div>
                            <div className='userCard__post'>{createModel.description || (<i>empty description</i>)}</div>
                        </div>
                        <div className='text-center'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Project</th>
                                        <th>Template</th>
                                    </tr>
                                    <tr>
                                        <td><Tag color={helper.colorFull()}> {(createModel.project || {}).name}</Tag></td>
                                        <td><Tag color={helper.colorFull()}>{(createModel.template || {}).name}</Tag></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-lg-8'>
                    <div className='inherit-property'>
                        <h4>Inherit Properties</h4>
                        {inheritCreateProperties.length > 0 && <table className='inherit-properties'>
                            <tbody>
                                <tr>
                                    <th>Property Name</th>
                                    <th>Data Type</th>
                                    <th>Property Value</th>
                                </tr>
                            </tbody>
                            {inheritCreateProperties.map(x => (
                                <tbody key={x.id}>
                                    <tr>
                                        <td><Input name='property-name' disabled={true} value={x.name} /></td>
                                        <td><Input name='property-type' disabled={true} value={getDataTypeName(x.dataType)} /></td>
                                        <td><Input name='property-value' disabled={true} value={x.defaultValue} /></td>
                                    </tr>
                                    <tr>
                                        <td> <Checkbox className='check-box' name='property-isPersistent' checked={x.isPersistent}>Persistent</Checkbox></td>
                                        <td> <Checkbox className='check-box' name='property-isLogged' checked={x.isLogged}>Logged</Checkbox></td>
                                        <td> <Checkbox className='check-box' name='property-isReadOnly' checked={x.isReadOnly}>ReadOnly</Checkbox></td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>}
                        {inheritCreateProperties.length <= 0 && <h6><i>No inherit properties</i></h6>}
                    </div>
                    <Divider />
                    <div className='form-group'>
                        <h4>Custom Properties</h4>
                        <Table
                            rowKey={record => record.name}
                            pagination={pagination}
                            scroll={{ y: 240 }}
                            loading={loading}
                            columns={reviewColumns}
                            onChange={this.handleTableChange}
                            expandedRowRender={expandedRowRender}
                            dataSource={createModel.properties} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Review
