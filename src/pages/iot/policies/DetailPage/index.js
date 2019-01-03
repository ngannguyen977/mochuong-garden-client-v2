import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import DetailTabPage from './detailTab'

class PolicyDetail extends React.Component {
  static defaultProps = {
    pathName: 'Policies Details',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Policy Details' />
        <DetailTabPage location={props.location} match={props.match} />
      </Page>
    )
  }
}

export default PolicyDetail
