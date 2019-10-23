import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Confirm from './Confirm'
import queryString from 'query-string'

class ConfirmPage extends React.Component {
  static defaultProps = {
    pathName: 'Confirm Page',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    const params = queryString.parse(props.location.search)
    return (
      <Page {...props}>
        <Helmet title={params.sent && 'Forgot Password' || 'Confirmation Page'} />
        <Confirm location={props.location} history={props.history}/>
      </Page>
    )
  }
}

export default ConfirmPage
