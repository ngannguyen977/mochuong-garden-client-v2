import React from 'react'
import { Table, Button } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import helper from '../../../../helper'
import { Checkbox, Popover, Icon, Popconfirm, message } from 'antd'
import '../../../../resources/style.scss'

@connect(
    mapStateToProps,
    mapDispathToProps,
)
class UserPage extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        pagination: {
            defaultCurrent: 1,
            total: -1,
            current: 1,
            pageSize: 10,
        },
    }
    componentWillMount() {
        const { limit, page, sort, isAsc } = queryString.parse(this.props.location.search)
        this.props.getUsers(limit, page, sort, isAsc)
    }
    componentWillReceiveProps() {
        const { totalItems } = this.props.user
        const { pagination } = this.state
        if (totalItems > 0 && pagination !== totalItems) {
            this.setState({
                pagination: {
                    total: totalItems,
                },
            })
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        this.setState({
            pagination: pager,
        })
        let params = {
            limit: pagination.pageSize,
            page: pagination.current - 1,
            sort: sorter.field,
            isAsc: sorter.order,
            ...filters,
        }
        this.props.getList(params.limit, params.page, params.sort, params.isAsc, filters)
    }
    render() {
        const columns = [
            {
                title: 'User',
                dataIndex: 'username',
                sorter: true,
                width: '40%',
                render: (name, record) => {
                    return (
                        <a className='link' href={`#/users/${record.id}`}>
                            {record.username}
                        </a>
                    )
                },
            },
            {
                title: 'Role',
                dataIndex: 'role.name',
                sorter: true,
                width: '30%',
              },
              {
                title: 'Status',
                dataIndex: 'active',
                sorter: true,
                width: '10%',
                render: record => <Checkbox defaultChecked={record} checked={record} />,
              },
            {
                title: 'Control',
                dataIndex: 'active',
                sorter: true,
                width: '10%',
                render: record => <Checkbox defaultChecked={record}  />,
            },
            {
                title: 'View Only',
                dataIndex: 'active',
                sorter: true,
                width: '10%',
                render: record => <Checkbox defaultChecked={record}  />,
            },
        ]
        const { loading, selectedRowKeys } = this.state
        const { totalItems, users, page } = this.props.user
        const hasSelected = selectedRowKeys.length > 0
        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: selectedRowKeys => {
                this.setState({
                    selectedRowKeys,
                })
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        }



        return (
            <div>
                <section className='card'>
                    <div className='card-header'>
                        <div className='utils__title'>
                            <strong>Users Manage this thing</strong>
                        </div>
                        <small>
                            User management allow admins can control all users. Administrators can create a new
                            user, add a user to several groups, attach some permission, change status or delete
                            users. You also view detail a user, identify groups and permissions of a user.
            </small>
                    </div>
                    <div className='card-body'>
                        {totalItems > 0 && (
                            <div className='table-responsive'>
                                <Table
                                    rowSelection={rowSelection}
                                    rowKey={record => record.id}
                                    pagination={this.state.pagination}
                                    loading={this.state.loading}
                                    columns={columns}
                                    onChange={this.handleTableChange}
                                    dataSource={users}
                                />
                            </div>
                        )}
                        {(!totalItems || totalItems <= 0) && (
                            <LockScreenPage name='User' link='#/users/create' />
                        )}
                    </div>
                </section>
            </div>
        )
    }
}

export default UserPage
