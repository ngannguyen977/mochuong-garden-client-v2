import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ListPage from './ListPage'


class Policy extends React.Component {
  static defaultProps = {
    pathName: 'Policies',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title='Policies' />
        <ListPage location={props.location}/>
      </Page>
    )
  }
}

export default Policy
