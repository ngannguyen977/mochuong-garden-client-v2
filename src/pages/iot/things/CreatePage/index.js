import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreatePage from './create'

class ThingCreate extends React.Component {
  static defaultProps = {
    pathName: 'Things Create',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Things" />
        <CreatePage location={props.location} match={props.match} history={props.history} />
      </Page>
    )
  }
}

export default ThingCreate
