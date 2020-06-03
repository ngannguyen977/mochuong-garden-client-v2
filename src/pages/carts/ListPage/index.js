import React from 'react'
// import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ShoppingCart from './shopping-cart'

class DefaultPage extends React.Component {
  static defaultProps = {
    pathname: 'Things',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <div {...props}>
        <Helmet title="Things" />
        <ShoppingCart history={props.history} location={props.location} />
      </div>
    )
  }
}

export default DefaultPage
