import React from 'react'
import { Table, Button } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import helper from '../../../../helper'
import { Checkbox, Popover, Icon, Tag, Popconfirm, message } from 'antd'
import '../../../../resources/style.scss'
import ProjectCard from '../../../components/ProjectCard'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ProjectPage extends React.Component {
  state = {
    current: 0
  }
  componentWillMount() {
    const { getList } = this.props
    getList()
  }

  render() {
    const { data,totalItems } = this.props
    const { current } = this.state

    return (
      <div className='row'>
        {data && data.map(x => (
          <div className='col-md-3' key={x.id}>
            <ProjectCard project={x || {}} type={current === 0 ? 'primary' : ''} onMouseEnter={() => this.setState({ current: 0 })} />
          </div>
        ))}
         {(!totalItems || totalItems <= 0) && (
              <LockScreenPage name='Project' link='#/projects/create' />
            )}
      </div>
    )
  }
}

export default ProjectPage
