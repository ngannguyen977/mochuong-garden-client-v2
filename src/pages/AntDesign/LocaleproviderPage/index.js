import React from 'react'
import Page from 'components/PageComponents'
import Helmet from 'react-helmet'
import LocaleproviderItems from 'components/AntComponents/Localeprovider/index'

class LocaleproviderPage extends React.Component {
  static defaultProps = {
    pathName: 'Localeprovider',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Clean UI - Localeprovider" />
        <LocaleproviderItems />
      </Page>
    )
  }
}

export default LocaleproviderPage
