import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreatePage from './create'

class Create extends React.Component {
  static defaultProps = {
    pathName: 'Permission Create',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Permission' />
        <CreatePage location={props.location} />
      </Page>
    )
  }
}

export default Create
