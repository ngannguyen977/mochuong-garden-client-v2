import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Table, Radio } from 'antd'
import Avatar from 'components/CleanComponents/Avatar'
import { changeStepProgressBar } from '../../../components/buttonStep'

const { Group, Button } = Radio

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
    componentWillMount() {
        const { getPermissionByGroup, userCreate } = this.props
        if (userCreate.groups) {
            getPermissionByGroup(userCreate.groups.join())

        } else {
            this.setState({
                data: userCreate.permissions
            })
        }

    }
    componentDidUpdate() {
        const { userCreate, userCreatePermission } = this.props
        if (userCreate.groups && !userCreate.permissions && !this.state.data) {
            this.setState({
                data: userCreatePermission
            })
        }
    }
    changePassword(changeStepState, steps) {
        changeStepProgressBar(0, steps)
        changeStepState(0)
    }
    render() {
        const { reviewColumns, userCreate,  changeStepState, steps } = this.props
        const { pagination, loading, data } = this.state
        return (
            <div className='user-create-step-1 row'>
                <div className='col-lg-4 text-justify'>
                    <div className={`userCard px-3 py-5 userCard--typed bg-`}>
                        <Avatar
                            src={'resources/images/avatars/1.jpg'}
                            border={true}
                            borderColor='white'
                            size='90'
                        />
                        <div className='my-3 text-center'>
                            <div className='userCard__userName font-size-18'>{userCreate.username || 'No name'}</div>
                            <div className='userCard__post'>Password: {userCreate.password || (<i>password is missing</i>)}</div>
                        </div>
                        <div className='text-center'>
                            <div className='btn-group text-center'>
                                <Group size='small'>
                                    <Button onClick={() => this.changePassword(changeStepState, steps)}>Change</Button>
                                </Group>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-8'>
                    <div className='form-group'>
                        <Table
                            rowKey={record => record.name}
                            pagination={pagination}
                            loading={loading}
                            columns={reviewColumns}
                            onChange={this.handleTableChange}
                            dataSource={data} />
                    </div>
                </div>
            </div>)
    }
}

export default Review
