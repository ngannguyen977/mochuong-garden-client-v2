import React from 'react'
import { Button, Pagination } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../../DefaultPages/LockscreenPage/Lockscreen'
import { Checkbox } from 'antd'
import '../../../../../resources/style.scss'
import UserCard from '../../../../components/UserCard'

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
            current: 0,
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
    }
    componentWillMount() {
        const { match, getAllUsers, location } = this.props
        const { limit, page, sort, isAsc } = queryString.parse(location.search)
        getAllUsers(match.params.name, limit, page, sort, isAsc)
    }
    getParams = (totalItems, users) => {
        this.setState({
            users,
            totalItems,
            loading: true
        })
    }
    componentWillUnmount(){
        this.setState({
            loading: false,
        })
    }
    componentWillReceiveProps() {
        const { pagination } = this.state
        const { totalItems } = this.props.user
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
        if (!loading && users && users.length > 0) {
            this.getParams(totalItems, users)
        }
    }
    changePolicy(userUuid, type, value) {
        console.log(userUuid, type, value)
        const { match, createThingPolicy, removeThingPolicy } = this.props
        let name = match.params.name
        if (value) {
            createThingPolicy(userUuid, name, type)
        } else {
            removeThingPolicy(userUuid, name, type)
        }
    }
    onChange = (page) => {
        const { match, getAllUsers, location } = this.props
        const { limit, sort, isAsc } = queryString.parse(location.search)
        getAllUsers(match.params.name, limit, page, sort, isAsc)
        this.setState({
            current: page,
        })
    }
    render() {
        const { pagination, loading, totalItems } = this.state
        const { users, history } = this.props.user
        console.log(users)
        return (
            <div className='thing-detail__user'>
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
                    <div className='text-right' style={{ marginBottom: 10, marginRight: 15 }}>
                        <Pagination
                            current={this.state.current}
                            onChange={page => this.onChange(page)}
                            total={totalItems}
                            pageSize={9}
                        />
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            {totalItems > 0 && users && users.map(x =>
                                <div className='col-md-4 col-xs-6 user-card' key={x.id}>
                                    <UserCard
                                        user={x}
                                        action={this.changePolicy}
                                        history={history}
                                    />
                                </div>)}
                        </div>

                        {(!totalItems || totalItems <= 0) && (
                            <LockScreenPage name='User' link='#/users/create' />
                        )}
                    </div>
                </section>
                <div className='text-right' style={{ marginBottom: 10, marginRight: 15 }}>
                    <Pagination
                        current={this.state.current}
                        onChange={page => this.onChange(page)}
                        total={totalItems}
                        pageSize={9}
                    />
                </div>
                <div className='text-right'>
                    <Button
                        type='default'
                        className='text-capitalize'
                        style={{ marginRight: 15 }}
                        href={`#/things/${this.props.match.params.name}`}
                    >
                        Back
                        </Button>
                </div>
            </div >
        )
    }
}

export default UserPage
