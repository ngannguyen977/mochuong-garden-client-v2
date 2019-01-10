import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'

class TemplateCreate extends React.Component {
  static defaultProps = {
    pathName: 'Alert',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Alert' />
      </Page>
    )
  }
}

export default TemplateCreate
