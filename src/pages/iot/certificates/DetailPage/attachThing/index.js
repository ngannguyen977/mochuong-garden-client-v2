import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import AttachPage from './attach'

class ThingDetail extends React.Component {
  static defaultProps = {
    pathName: 'Things Details',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Thing Details" />
        <AttachPage location={props.location} history={props.history} match={props.match} />
      </Page>
    )
  }
}

export default ThingDetail
