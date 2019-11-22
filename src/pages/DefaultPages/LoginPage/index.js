import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Login from './Login'

class LoginPage extends React.Component {
  render() {
    const { match, ...props } = this.props
    return (
      <Page {...props}>
        <Helmet title='Login' />
        <Login match={match} params={(props.location||{}).search}/>
      </Page>
    )
  }
}

export default LoginPage
