import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ListPage from './list'

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
        <ListPage history={props.history} location={props.location} />
      </Page>
    )
  }
}

export default DefaultPage
