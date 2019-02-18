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
  state = {
    current: 0,
  }
  componentWillMount() {
    const { getThings, match, location } = this.props
    const { limit, page, sort, isAsc } = queryString.parse(location.search)
    getThings(limit, page, sort, isAsc)
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
  onChange = page => {
    const { getThings, location } = this.props
    const { limit, sort, isAsc } = queryString.parse(location.search)
    getThings(limit, page - 1, sort, isAsc)
    this.setState({
      current: page,
    })
  }
  setPermission = (thing, isControl, isView) => {
    const { create, userCreate } = this.props
    let permissions = userCreate.permissions || []

    let permission = permissions.find(x => x.id === thing.id)
    if (permission) {
      if (isControl !== undefined)
        permission.isControl = isControl
      if (isView !== undefined)
        permission.isView = isView
      if (!permission.isView && !permission.isControl) {
        permissions.pop(permission)
      }
    } else {
      permissions.push({
        isControl, id: thing.id, name: thing.name, imageUrl: thing.imageUrl, isView
      })
    }
    create({ ...userCreate, permissions })
  }
  render() {
    const { match, data, type, thing, detail, totalItems, removeThing, userCreate } = this.props
    let permissions = userCreate.permissions || []
    return (
      <div className='thing'>
        <section className='card'>
          <div className='card-header'>
          </div>
          <div className='card-body'>
            <div className='row'>
              {thing.things && thing.things.length > 0 &&
                thing.things.map(x => (
                  <div className='col-md-2' key={x.id}>
                    <ThingCard
                      data={x || {}}
                      type={type}
                      onMouseEnter={() => this.setState({ current: 0 })}
                      action={this.setPermission}
                      permission={permissions.find(a => a.id === x.id) || {}}
                      isEdit
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
      </div>
    )
  }
}

export default ListPage
