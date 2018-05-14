import React from 'react'
import Page from 'components/PageComponents'
import Helmet from 'react-helmet'
import Documentation from './Documentation'

class DocumentationPage extends React.Component {
  static defaultProps = {
    pathName: 'Documentation',
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Clean UI - Documentation" />
        <Documentation />
      </Page>
    )
  }
}

export default DocumentationPage
