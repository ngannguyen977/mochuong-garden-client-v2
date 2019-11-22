import React from 'react'
import { Pagination, Button } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import '../../../../resources/style.scss'
// import '../style.scss'
import ThingCard from '../../../components/ThingCard'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ListPage extends React.Component {
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
    const { location, getAllThing, detail, match } = this.props
    const { keyword, limit, sort, isAsc } = queryString.parse(location.search)
    getAllThing((detail || {}).uuid, match.params.name, keyword, limit, 0, sort, isAsc,undefined,undefined,undefined,true)
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
    getAllThing((detail || {}).uuid, match.params.name, keyword, limit, 0, sort, isAsc,undefined,undefined,undefined,true)
    this.setState({
      current: page,
    })
  }
  removePolicy(thingName) {
    const { destroyUserPolicy, detail } = this.props
    let userUuid = (detail || {}).uuid
    destroyUserPolicy(userUuid, thingName)
  }
  changePolicy = (type, thingName, value) => {
    const { createThingPolicy, removeThingPolicy, detail } = this.props
    let userUuid = (detail || {}).uuid
    if (value) {
      createThingPolicy(userUuid, thingName, type)
    } else {
      removeThingPolicy(userUuid, thingName, type)
    }
  }
  render() {
    const { match, type, thing, totalItems, userCreate, history } = this.props
    let permissions = userCreate.permissions || []
    return (
      <div className='thing'>
        <section className='card'>
          <div className='card-header'>
            <div className='utils__title'>
              <strong>Users Manage these thing</strong>
              <div className='text-right' style={{ marginTop: -25, marginBottom: 10 }}>
                <Button type='primary' onClick={() => history.push(`/users/${match.params.name}/things`)}>More Things</Button>
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
              {thing.things && thing.things.length > 0 &&
                thing.things.map(x => (
                  <div className='col-md-2' key={x.name}>
                    <ThingCard
                      data={x || {}}
                      type={type}
                      onMouseEnter={() => this.setState({ current: 0 })}
                      action={this.changePolicy}
                      permission={permissions.find(a => a.id === x.id) || {}}
                      remove={this.removePolicy}
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
              <LockScreenPage name=' Thing' link={`/things/register`} />
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default ListPage
