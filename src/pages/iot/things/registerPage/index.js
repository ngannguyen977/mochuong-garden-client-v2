import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Register from './register'

class registerPage extends React.Component {
  static defaultProps = {
    pathName: 'Things Register',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Things' />
        <Register location={props.location} match={props.match} history={props.history} />
      </Page>
    )
  }
}

export default registerPage
