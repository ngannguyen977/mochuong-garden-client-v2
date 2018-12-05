import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import UserPage from './UserPage'
import { mapStateToProps, mapDispathToProps } from './container'
import { connect } from 'react-redux'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class User extends React.Component {
  static defaultProps = {
    pathName: 'Users',
    roles: ['agent', 'administrator'],
  }
  componentDidMount() {
    console.log(this.props.location)
  
  }
  render() {
    const props = this.props
    console.log('propsss',this.props)
    return (
      <Page {...props}>
        <Helmet title="Users" />
        <UserPage />
      </Page>
    )
  }
}

export default User
