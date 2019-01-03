import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ListPage from './ListPage'


class Template extends React.Component {
  static defaultProps = {
    pathName: 'Templates',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    console.log(this)
    return (
      <Page {...props}>
        <Helmet title='Templates' />
        <ListPage history={props.history  } location={props.location} />
      </Page>
    )
  }
}

export default Template
