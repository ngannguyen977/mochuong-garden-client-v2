import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import DetailTabPage from './detailTab'
import ThingPage from './things'

class UserDetail extends React.Component {
  static defaultProps = {
    pathName: 'Customer Details',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Customer Details' />
        <ThingPage location={props.location} match={props.match} history={props.history} />
      </Page>
    )
  }
}

export default UserDetail
