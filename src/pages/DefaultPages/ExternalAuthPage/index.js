import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ChildPage from './page'

class DefaultPage extends React.Component {
  static defaultProps = {
    pathName: 'External Authentication Page',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='External Authentication Page' />
        <ChildPage location={props.location} history={props.history}  />
      </Page>
    )
  }
}

export default DefaultPage
