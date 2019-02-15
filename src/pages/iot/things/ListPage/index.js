import React from 'react'
import { Pagination, Button } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import '../../../../resources/style.scss'
import '../style.scss'
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
    // if (!this.props.totalItems || this.props.totalItems <= 0) {
    const { limit, page, sort, isAsc } = queryString.parse(this.props.location.search)
    this.props.getList(limit, page, sort, isAsc)
    // }
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
    this.props.getList(limit, page - 1, sort, isAsc)
    this.setState({
      current: page,
    })
  }
  render() {
    const { totalItems, destroy, data, type, history } = this.props

    return (
      <div className="thing">
        <section className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-md-10">
                <div className="utils__title">
                  <strong>Things Management</strong>
                </div>
                <small>
                  Thing management allow admins can control all things. Administrators can create a
                  new thing, add a thing to several groups, attach some permission, change status or
                  delete things. You also view detail a thing, identify groups and permissions of a
                  thing.
                </small>
              </div>
              <div className="col-md-2 thing__btn-create">
                <Button type="primary" onClick={() => history.push('/things/register')}>
                  Register Thing
                </Button>
              </div>
            </div>
          </div>
          <div className="card-body">
            {totalItems > 0 && (
              <div className="row">
                {data &&
                  data.map(x => (
                    <div className="col-md-2" key={x.id}>
                      <ThingCard
                        data={x || {}}
                        type={type}
                        onMouseEnter={() => this.setState({ current: 0 })}
                        remove={destroy}
                        push={history.push}
                      />
                    </div>
                  ))}
                <div className="col-md-12 text-right">
                  <Pagination
                    current={this.state.current}
                    onChange={this.onChange}
                    total={totalItems}
                    pageSize={18}
                  />
                </div>
              </div>
            )}
            {totalItems <= 0 && <LockScreenPage name="Thing" link="#/things/register" />}
          </div>
        </section>
      </div>
    )
  }
}

export default ListPage
