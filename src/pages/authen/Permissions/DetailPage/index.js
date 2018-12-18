import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import DetailTabPage from './detailTab'

class PermissionDetail extends React.Component {
  static defaultProps = {
    pathName: 'Permissions Details',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Permission Details' />
        <DetailTabPage location={props.location} match={props.match}/>
      </Page>
    )
  }
}

export default PermissionDetail
