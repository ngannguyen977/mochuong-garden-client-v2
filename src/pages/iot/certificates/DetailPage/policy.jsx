import React from 'react'
import { Pagination, Button } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import '../../../../resources/style.scss'
import '../style.scss'
import PolicyCard from '../../../components/ThingCard'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ListPage extends React.Component {
  state = {
    current: 0,
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
    const { getPolicyChildrenList, match, location } = this.props
    const { limit, sort, isAsc } = queryString.parse(location.search)
    getPolicyChildrenList(match.params.id, limit, page - 1, sort, isAsc)
    this.setState({
      current: page,
    })
  }
  render() {
    const { match, data, type, history, detail, totalItems, removePolicy } = this.props
    const remove = (id) => {
      removePolicy(match.params.id, id)
    }
    return (
      <div className="policy">
        <section className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-md 10">
                <div className="utils__title">
                  <strong>Policies Management</strong>
                </div>
                <small>
                  Policy management allow admins can control all policies. Administrators can create a
                  new policy, add a policy to several groups, attach some permission, change status or
                  delete policies. You also view detail a policy, identify groups and permissions of a
                  policy.
                </small>
              </div>
              <div className="col-md-2 policy__btn-create">
                <Button type="primary" onClick={() => history.push(`/certificates/${(detail || {}).id}/attach-policies`)}>
                  Attach Policy
                </Button>
              </div>
            </div>
          </div>
          <div className="card-body">
              <div className="row">
                {detail && detail.policies && detail.policies.length > 0 &&
                  detail.policies.map(x => (
                    <div className="col-md-2" key={x.id}>
                      <PolicyCard
                        data={x || {}}
                        type={type}
                        onMouseEnter={() => this.setState({ current: 0 })}
                        remove={remove}
                        push={history.push}
                        dontEdit={true}
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
            {(!detail || !detail.policies || detail.policies.length <= 0) && (
              <LockScreenPage name=" Policy" link={`/#/policies/${(detail || {}).id}/attach`} />
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default ListPage
