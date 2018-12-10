import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreatePage from './CreatePage'


class User extends React.Component {
  static defaultProps = {
    pathName: 'Users Create',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Users' />
        <CreatePage location={props.location}/>
      </Page>
    )
  }
}

export default User
