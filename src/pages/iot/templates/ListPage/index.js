import React from 'react'
import { Pagination, Button } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import helper from '../../../../helper'
import '../../../../resources/style.scss'
import '../style.scss'
import TemplateCard from '../../../components/TemplateCard'

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
  onChange = (page) => {
    const { limit, sort, isAsc } = queryString.parse(this.props.location.search)
    this.props.getList(limit, page - 1, sort, isAsc)
    this.setState({
      current: page,
    });
  }
  render() {
    const { totalItems, destroy, data, type, history } = this.props

    return (
      <div className='template'>
        <section className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-md 10'>
                <div className='utils__title'>
                  <strong>Templates Management</strong>
                </div>
                <small>
                  Template management allow admins can control all templates. Administrators can
                  create a new template, add a template to several groups, attach some permission,
                  change status or delete templates. You also view detail a template, identify
                  groups and permissions of a template.
                </small>
              </div>
              <div className='col-md-2 template__btn-create'>
                <Button type='primary' onClick={() => history.push('/templates/create')}>
                  Create New Template
                </Button>
              </div>
            </div>
          </div>
          <div className='card-body'>
            {totalItems && totalItems > 0 && (
              <div className='row'>
                {data &&
                  data.map(x => (
                    <div className='col-md-2' key={x.id}>
                      <TemplateCard
                        data={x || {}}
                        type={type}
                        onMouseEnter={() => this.setState({ current: 0 })}
                        remove={destroy}
                        push={history.push}
                      />

                    </div>
                  ))}
                <div className='col-md-12 text-right'>
                  <Pagination current={this.state.current} onChange={this.onChange} total={totalItems} pageSize={18} />
                </div>
              </div>
            )}
            {(!totalItems || totalItems <= 0) && (
              <LockScreenPage name='Template' link='#/templates/create' />
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default ListPage
