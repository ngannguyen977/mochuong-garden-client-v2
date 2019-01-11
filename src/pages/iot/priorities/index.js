import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ListPage from './ListPage'

class Priority extends React.Component {
  static defaultProps = {
    pathName: 'Priorities',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Priorities" />
        <ListPage history={props.history} location={props.location} />
      </Page>
    )
  }
}

export default Priority
