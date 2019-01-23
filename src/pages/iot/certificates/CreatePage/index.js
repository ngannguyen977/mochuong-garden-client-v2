import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreatePage from './create'

class CertificateCreate extends React.Component {
  static defaultProps = {
    pathName: 'Certificates Create',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Certificates" />
        <CreatePage location={props.location} />
      </Page>
    )
  }
}

export default CertificateCreate
