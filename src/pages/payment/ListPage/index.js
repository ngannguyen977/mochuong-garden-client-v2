import React from 'react'
import Helmet from 'react-helmet'
import Payment from './payment'

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
        <Payment history={props.history} location={props.location} />
      </div>
    )
  }
}

export default DefaultPage
