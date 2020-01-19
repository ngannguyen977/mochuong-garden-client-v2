import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Table, Radio, Checkbox } from 'antd'
import Avatar from 'components/CleanComponents/Avatar'
import { changeStepProgressBar } from '../../../components/buttonStep'
import '../style.scss'

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
        if (userCreate.fullGroups) {
            getPermissionByGroup((userCreate.fullGroups || []).map(x => x.uuid).join())

        } else {
            this.setState({
                data: userCreate.permissions
            })
        }

    }
    componentDidUpdate() {
        const { userCreate, userCreatePermission } = this.props
        if (userCreate.groups && !userCreate.permissions && !this.state.data
            && this.state.data !== userCreatePermission) {
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
        const { userCreate, changeStepState, steps } = this.props
        const { pagination, loading, data } = this.state
        let defaultImage = 'resources/iot/camera-onsky.png'
        const reviewColumns = [
            {
                title: 'Image',
                dataIndex: 'imageUrl',
                width: '10%',
                render: (name, record) => {
                    return (
                        <img className='review-img img-responsive' src={name || defaultImage} alt=''/>
                    )
                },
            },
            {
                title: 'Thing',
                dataIndex: 'name',
                width: '40%',
            },
            {
                title: 'Permission',
                dataIndex: 'type',
                width: '50%',
                render: (name, record) => {
                    return (<p>
                        <Checkbox checked={record.isControl}>Control</Checkbox>
                        <Checkbox checked={record.isView}>View Only</Checkbox>
                    </p>)
                },
            }
        ]
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
