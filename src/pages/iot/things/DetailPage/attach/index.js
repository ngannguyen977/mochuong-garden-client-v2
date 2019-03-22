import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import DetailTabPage from './user'

class ThingDetail extends React.Component {
  static defaultProps = {
    pathName: 'Things Details',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Thing Details' />
        <DetailTabPage location={props.location} history={props.history} match={props.match} />
      </Page>
    )
  }
}

export default ThingDetail
