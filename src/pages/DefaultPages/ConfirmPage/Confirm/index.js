import React from 'react'
import { Button } from 'antd'
import '../../LoginPage/Login/style.scss'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispathToProps } from './container'
import queryString from 'query-string'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class Confirm extends React.Component {
  state = { backgroundImage: 'url(resources/images/login/4.jpg)' }

  componentWillMount() {
    if (!this.props.isAccessible) {
      this.props.history.push('/login')
    }
  }
  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'

    const { code } = queryString.parse(this.props.location.search)
    if (code) {
      this.props.submit(code)
    }
  }

  componentWillUnmount() {
    const { restrictAccessConfirmPage, isAccessible } = this.props
    restrictAccessConfirmPage(isAccessible)

    document.getElementsByTagName('body')[0].style.overflow = ''
  }
  generateBackground = () => {
    let { backgroundImage } = this.state

    let min = 1
    let max = 5
    let picNumber = Math.floor(Math.random() * (max - min + 1)) + min
    backgroundImage = 'url(resources/images/login/' + picNumber + '.jpg)'
    this.setState({
      backgroundImage: backgroundImage,
    })
  }

  render() {
    const { backgroundImage } = this.state
    const params = queryString.parse(this.props.location.search)
    return (
      <div
        onLoad={() => this.generateBackground()}
        className="main-login main-login--fullscreen"
        style={{ backgroundImage: backgroundImage }}
      >
        <div className="main-login__block main-login__block--extended pb-0">
          <div className="row">
            <div className="col-xl-12">
              <div className="main-login__block__promo text-white text-center">
                <h1 className="mb-3 text-white">
                  <strong>Welcome to OnSky Family</strong>
                </h1>
                <p>
                  At OnSky, Security – Safety is our top priority. By owning the best current
                  technology, we are confident to bring the most intelligent home experience to you
                  and your family.
                </p>
              </div>
              <div className="main-login__block__inner">
                <div className="main-login__block__form text-center">
                    <p>
                    An {params.sent && <span>reset email</span> || <span>confirmation email</span> } has been sent to you. Please check your <strong>mailbox</strong> or <strong>spam</strong> then follow the
                    link to {params.sent && <span>retrieve</span> || <span>active</span>} your account.
                    </p>
                  <Button type="primary" href="/login">
                    Go to Login
                  </Button>
                </div>
                <div className="main-login__block__sidebar" />
              </div>
            </div>
          </div>
        </div>
        <div className="main-login__footer text-center">
          <ul className="list-unstyled list-inline">
            <li className="list-inline-item">
              <a href="https://www.onskyinc.com">Terms of Use</a>
            </li>
            <li className="active list-inline-item">
              <a href="https://www.onskyinc.com">Compliance</a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.onskyinc.com">Confidential Information</a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.onskyinc.com">Support</a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.onskyinc.com">Contacts</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Confirm
