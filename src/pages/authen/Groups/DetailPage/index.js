import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import DetailTabPage from './detailTab'

class GroupDetail extends React.Component {
  static defaultProps = {
    pathName: 'Groups Details',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Group Details" />
        <DetailTabPage location={props.location} />
      </Page>
    )
  }
}

export default GroupDetail
