import React from 'react'
import { Pagination, Button } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../../DefaultPages/LockscreenPage/Lockscreen'
import '../../../../../resources/style.scss'
import '../../style.scss'
import ThingCard from '../../../../components/ThingCard'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ListPage extends React.Component {
  state = {
    current: 0,
  }
  componentWillMount() {
    const { limit, page, sort, isAsc } = queryString.parse(this.props.location.search)
    this.props.getThings(limit, page, sort, isAsc)
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
    const { limit, sort, isAsc } = queryString.parse(this.props.location.search)
    this.props.getThings(limit, page - 1, sort, isAsc)
    this.setState({
      current: page,
    })
  }
  render() {
    const { thing, destroy, data, type, history, attachThing, removeThing, match } = this.props
    const { totalItems, page, things } = thing

    return (
      <div className='thing'>
        <section className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-md-9'>
                <div className='utils__title'>
                  <strong>Things Management</strong>
                </div>
                <small>
                  Thing management allow admins can control all things. Administrators can create a
                  new thing, add a thing to several groups, attach some permission, change status or
                  delete things. You also view detail a thing, identify groups and permissions of a
                  thing.
                </small>
              </div>
              <div className='col-md-3 text-right'>
                <a href={`/#/certificates/${match.params.id}?tab=2`} >Cancel</a>
                <Button type='primary' style={{ marginLeft: "10px" }} onClick={() => history.push(`/certificates/${match.params.id}?tab=2`)}>
                  Done
                </Button>
              </div>
            </div>
          </div>
          <div className='card-body'>
            {totalItems && totalItems > 0 && (
              <div className='row'>
                {things &&
                  things.map(x => (
                    <div className='col-md-2' key={x.id}>
                      <ThingCard
                        data={x || {}}
                        type={type}
                        onMouseEnter={() => this.setState({ current: 0 })}
                        remove={removeThing}
                        push={history.push}
                        isAttach={true}
                        attachThing={attachThing}
                        removeThing={removeThing}
                        parentId={match.params.id}
                      />
                    </div>
                  ))}
                <div className='col-md-12 text-right'>
                  <Pagination
                    current={this.state.current}
                    onChange={this.onChange}
                    total={totalItems}
                    pageSize={18}
                  />
                </div>
              </div>
            )}
            {(!totalItems || totalItems <= 0) && (
              <LockScreenPage name='Thing' link='#/things/create' />
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default ListPage
