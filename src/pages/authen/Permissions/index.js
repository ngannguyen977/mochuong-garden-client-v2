import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import PermissionPage from './PermissionPage'


class Permission extends React.Component {
  static defaultProps = {
    pathName: 'Permissions',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Permissions' />
        <PermissionPage location={props.location}/>
      </Page>
    )
  }
}

export default Permission
