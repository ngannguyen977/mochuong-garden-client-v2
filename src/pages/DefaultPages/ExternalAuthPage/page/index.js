import React from 'react'
import '../../LoginPage/Login/style.scss'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispathToProps } from './container'
import queryString from 'query-string'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class DefaultPage extends React.Component {

  componentDidMount() {
    const params = queryString.parse((this.props.location||{}).search)
    this.props.externalAuth(params,(this.props.location||{}).search)
  }
  render() {
    return (
      <div />
    )
  }
}

export default DefaultPage
