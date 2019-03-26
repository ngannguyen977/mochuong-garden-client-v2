import React from 'react'
import { Pagination, Input, Button } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../../DefaultPages/LockscreenPage/Lockscreen'
import '../../../../../resources/style.scss'
// import '../style.scss'
import ThingCard from '../../../../components/ThingCard'

const { Search } = Input
@connect(
    mapStateToProps,
    mapDispathToProps,
)
class ListPage extends React.Component {
    state = {
        current: 0,
    }
    componentWillMount() {
        const { location, getAllThing, detail, match } = this.props
        const { keyword, limit, sort, isAsc } = queryString.parse(location.search)
        getAllThing((detail || {}).uuid, match.params.name, keyword, limit, 0, sort, isAsc)
    }
    componentWillReceiveProps() {
        const { totalItems } = this.props
        const { pagination } = this.state
        if (totalItems > 0 && pagination !== totalItems) {
            this.setState({
                pagination: {
                    total: totalItems,
                },
            })
        }
    }
    onChange = (page, keyword) => {
        const { location, getAllThing, detail, match } = this.props
        const { limit, sort, isAsc } = queryString.parse(location.search)
        getAllThing((detail || {}).uuid, match.params.name, keyword, limit, 0, sort, isAsc)
        this.setState({
            current: page,
        })
    }

    setPermission = (type, thingName, value) => {
        const { createThingPolicy, removeThingPolicy, detail } = this.props
        let userUuid = (detail || {}).uuid
        if (value) {
            createThingPolicy(userUuid, thingName, type)
        } else {
            removeThingPolicy(userUuid, thingName, type)
        }
    }
    render() {
        const { type, thing, totalItems, userCreate, match } = this.props
        let permissions = userCreate.permissions || []
        return (
            <div className='thing'>
                <section className='card'>
                    <div className='card-header'>
                        <div className='utils__title'>
                            <strong>Users Manage these thing</strong>
                        </div>
                        <small>
                            User management allow admins can control all users. Administrators can create a new
                            user, add a user to several groups, attach some permission, change status or delete
                            users. You also view detail a user, identify groups and permissions of a user.
                        </small>
                    </div>

                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-8 search-box'>
                                <Search
                                    placeholder='input search text'
                                    onSearch={value => this.onChange(this.state.current, value)}
                                    // onBlur={value => this.onChange(this.state.current, value)}
                                    style={{ width: 600 }}
                                />
                            </div>

                            {thing.things && thing.things.length > 0 &&
                                <div className='col-md-4 text-right' style={{ marginBottom: 10 }}>
                                    <Pagination
                                        current={this.state.current}
                                        onChange={this.onChange}
                                        total={totalItems}
                                        pageSize={18}
                                    />
                                </div>
                            }
                        </div>
                        <div className='row'>
                            {thing.things && thing.things.length > 0 &&
                                thing.things.map(x => (
                                    <div className='col-md-2' key={x.name}>
                                        <ThingCard
                                            data={x || {}}
                                            type={type}
                                            onMouseEnter={() => this.setState({ current: 0 })}
                                            action={this.setPermission}
                                            permission={permissions.find(a => a.id === x.id) || {}}
                                        />
                                    </div>
                                ))}

                            {thing.things && thing.things.length > 0 &&
                                (<div className='col-md-12 text-right'>
                                    <Pagination
                                        current={this.state.current}
                                        onChange={this.onChange}
                                        total={totalItems}
                                        pageSize={18}
                                    />
                                </div>)
                            }
                        </div>
                        {!thing.things && (
                            <LockScreenPage name=' Thing' link={`/#/things/register`} />
                        )}
                    </div>
                </section>
                <div className='search-box text-right'>
                    <Button
                        type='default'
                        className='text-capitalize'
                        style={{ marginRight: '15px' }}
                        href={`#/users/${match.params.name}`}
                    >
                        Back
                                  </Button>
                </div>
            </div>
        )
    }
}

export default ListPage
