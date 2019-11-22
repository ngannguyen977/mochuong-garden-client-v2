import React from 'react'
import { Button } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import { Checkbox } from 'antd'
import '../../../../resources/style.scss'
import UserCard from '../../../components/UserCard'

@connect(
    mapStateToProps,
    mapDispathToProps,
)
class UserPage extends React.Component {
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
            },
            totalItems: 0,
            users: []
        }
        this.changePolicy = this.changePolicy.bind(this)
        this.removePolicy = this.removePolicy.bind(this)
    }
    componentWillMount() {
        const { match, getUsers, location } = this.props
        const { limit, page, sort, isAsc } = queryString.parse(location.search)
        getUsers(match.params.name, limit, page, sort, isAsc)
    }
    getParams = (totalItems, users) => {
        this.setState({
            users,
            totalItems,
            loading: true
        })
    }
    componentWillReceiveProps() {
        const { pagination } = this.state
        const { totalItems } = this.props.user
        this.setState({
            loading: false,
        })
        if (totalItems > 0 && pagination !== totalItems) {
            this.setState({
                pagination: {
                    total: totalItems,
                },
            })
        }
    }
    componentDidUpdate() {
        const { totalItems, users } = this.props.user
        const { loading } = this.state
        if (!loading && users) {
            this.getParams(totalItems, users)
        }
    }
    changePolicy(userUuid, type, value) {
        const { match, createThingPolicy, removeThingPolicy } = this.props
        let name = match.params.name
        if (value) {
            createThingPolicy(userUuid, name, type)
        } else {
            removeThingPolicy(userUuid, name, type)
        }
    }
    removePolicy(userUuid) {
        const { match, deleteThingPolicy } = this.props
        deleteThingPolicy(userUuid, match.params.name)
    }
    render() {
        const { pagination, loading, totalItems, users } = this.state
        const { match, history } = this.props
        return (
            <div className='thing-detail__user'>
                <section className='card'>
                    <div className='card-header'>
                        <div className='utils__title'>
                            <strong>Users Manage this thing</strong>
                            <div className='text-right' style={{ marginTop: -25, marginBottom: 10 }}>
                                <Button type='primary' onClick={() => history.push(`/things/${match.params.name}/users`)}>More Users</Button>
                            </div>
                        </div>
                        <small>
                            User management allow admins can control all users. Administrators can create a new
                            user, add a user to several groups, attach some permission, change status or delete
                            users. You also view detail a user, identify groups and permissions of a user.
            </small>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            {totalItems > 0 && users.map(x =>
                                <div className='col-md-4 col-xs-6 user-card' key={x.id}>
                                    <UserCard
                                        user={x}
                                        action={this.changePolicy}
                                        remove={this.removePolicy}
                                        history={history}
                                    />
                                </div>)}
                        </div>

                        {(!totalItems || totalItems <= 0) && (
                            <LockScreenPage name='User' link={`things/${match.params.name}/users`} />
                        )}
                    </div>
                </section>
            </div>
        )
    }
}

export default UserPage
