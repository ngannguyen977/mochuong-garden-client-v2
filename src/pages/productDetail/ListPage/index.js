import React from 'react'
// import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ProductDetail from './product-detail'

class DefaultPage extends React.Component {
  static defaultProps = {
    pathname: 'Things',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    // console.log('xxxx')
    return (
      <div {...props}>
        <Helmet title="Things" />
        <ProductDetail history={props.history} location={props.location} match = {props.match}/>
      </div>
    )
  }
}

export default DefaultPage
