import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import OrderDetail from './orderDetail'

class DefaultPage extends React.Component {
  static defaultProps = {
    pathName: 'Things',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Things" />
        <OrderDetail history={props.history} location={props.location} />
      </Page>
    )
  }
}

export default DefaultPage
