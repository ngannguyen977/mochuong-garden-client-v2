import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Confirm from './Confirm'

class ConfirmPage extends React.Component {
  static defaultProps = {
    pathName: 'Confirm Page',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Confirm Page" />
        <Confirm />
      </Page>
    )
  }
}

export default ConfirmPage
