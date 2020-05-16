import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import List from './list'

class DefaultPage extends React.Component {
  static defaultProps = {
    pathName: 'Things',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Things" />
        <List history={props.history} location={props.location} />
      </Page>
    )
  }
}

export default DefaultPage
