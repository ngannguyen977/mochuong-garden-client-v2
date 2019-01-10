import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import DetailTabPage from './detailTab'

class TemplateDetail extends React.Component {
  static defaultProps = {
    pathName: 'Templates Details',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Template Details' />
        <DetailTabPage location={props.location} history={props.history} match={props.match} />
      </Page>
    )
  }
}

export default TemplateDetail
