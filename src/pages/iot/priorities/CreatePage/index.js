import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreatePage from './create'

class PriorityCreate extends React.Component {
  static defaultProps = {
    pathName: 'Priorities Create',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Priorities' />
        <CreatePage location={props.location} />
      </Page>
    )
  }
}

export default PriorityCreate
