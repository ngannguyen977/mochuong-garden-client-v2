import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreatePage from './create'

class PropertyCreate extends React.Component {
  static defaultProps = {
    pathName: 'Properties Create',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Properties' />
        <CreatePage location={props.location} />
      </Page>
    )
  }
}

export default PropertyCreate
