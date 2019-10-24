import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Recovery from './Recovery'
import queryString from 'query-string'

class RecoveryPage extends React.Component {
  
  componentWillMount() {
    const params = queryString.parse(this.props.location.search)
    if (!params.alias || !params.username || !params.token)
      this.props.history.push('/login')
    this.setState({
      params
    })
    
  }

  render() {
    const { match, ...props } = this.props
    return (
      <Page {...props}>
        <Helmet title='Recovery Password' />
        <Recovery match={match} params={this.state.params}/>
      </Page>
    )
  }
}

export default RecoveryPage
