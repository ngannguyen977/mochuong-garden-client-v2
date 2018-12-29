import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ProjectPage from './ProjectPage'

class Project extends React.Component {
  static defaultProps = {
    pathName: 'Projects',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Projects" />
        <ProjectPage location={props.location} />
      </Page>
    )
  }
}

export default Project
