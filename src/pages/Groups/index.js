import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import GroupPage from './GroupPage'

class Group extends React.Component {
  static defaultProps = {
    pathName: 'Groups',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Groups" />
        <GroupPage/>
      </Page>
    )
  }
}

export default Group
