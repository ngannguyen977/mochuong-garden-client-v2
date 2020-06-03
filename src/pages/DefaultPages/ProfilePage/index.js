import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Profile from './Profile'

class ProfileAppPage extends React.Component {
  static defaultProps = {
    pathname: 'Profile',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Profile" />
        <Profile history={this.props.history} />
      </Page>
    )
  }
}

export default ProfileAppPage
