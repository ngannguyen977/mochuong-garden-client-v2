import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import DetailTabPage from './detailTab'


class UserDetail extends React.Component {
  static defaultProps = {
    pathName: 'Users Details',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='User Details' />
        <DetailTabPage location={props.location}/>
      </Page>
    )
  }
}

export default UserDetail
