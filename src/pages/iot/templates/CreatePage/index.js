import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreatePage from './create'

class TemplateCreate extends React.Component {
  static defaultProps = {
    pathName: 'Templates Create',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Templates' />
        <CreatePage location={props.location} match={props.match} history={props.history} />
      </Page>
    )
  }
}

export default TemplateCreate
