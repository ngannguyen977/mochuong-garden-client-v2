import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Detail from './detail'

class DetailPage extends React.Component {
  static defaultProps = {
    pathName: 'Details',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Details" />
        <Detail isEdit={true} location={props.location} match={props.match} />
      </Page>
    )
  }
}

export default DetailPage
