import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreatePage from './create'

class ProjectCreate extends React.Component {
  static defaultProps = {
    pathName: 'Projects Create',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Projects" />
        <CreatePage location={props.location} />
      </Page>
    )
  }
}

export default ProjectCreate
