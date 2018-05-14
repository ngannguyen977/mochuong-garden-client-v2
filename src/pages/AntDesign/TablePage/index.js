import React from 'react'
import Page from 'components/PageComponents'
import Helmet from 'react-helmet'
import TableItems from 'components/AntComponents/Table/index'

class TablePage extends React.Component {
  static defaultProps = {
    pathName: 'Table',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Clean UI - Table" />
        <TableItems />
      </Page>
    )
  }
}

export default TablePage
