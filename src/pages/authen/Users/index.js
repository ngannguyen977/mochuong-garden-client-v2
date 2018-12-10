import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import UserPage from './UserPage'


class User extends React.Component {
  static defaultProps = {
    pathName: 'Users',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Users' />
        <UserPage location={props.location}/>
      </Page>
    )
  }
}

export default User
