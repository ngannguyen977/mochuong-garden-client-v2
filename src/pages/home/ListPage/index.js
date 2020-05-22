import React from 'react'
// import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ListPage from './list'

class DefaultPage extends React.Component {
  static defaultProps = {
    pathName: 'Things',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <div {...props}>
        <Helmet title="Things" />
        <ListPage history={props.history} location={props.location} />
      </div>
    )
  }
}

export default DefaultPage
