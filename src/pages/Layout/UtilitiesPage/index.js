import React from 'react'
import Page from 'components/PageComponents'
import Helmet from 'react-helmet'
import Utilities from './Utilities'

class UtilitiesPage extends React.Component {
  static defaultProps = {
    pathName: 'Utilities',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Clean UI - Utilities" />
        <Utilities />
      </Page>
    )
  }
}

export default UtilitiesPage
