import React from 'react'
import { Button } from 'antd'
import '../../LoginPage/Login/style.scss'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispathToProps } from './container'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class Confirm extends React.Component {
  state = { backgroundImage: 'url(resources/images/login/4.jpg)' }

  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    let hash = window.location.hash
    let code = hash.substring('#/customers/activate?code='.length, hash.length)
    if (code) {
      this.props.submit(code)
    }
  }

  componentWillUnmount() {
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
                  <strong>Welcome to OnSky Team</strong>
                </h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
              </div>
              <div className="main-login__block__inner">
                <div className="main-login__block__form">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s.
                  </p>
                  <Button type="primary" href="/#/login">
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
              <a href="javascript: void(0);">Terms of Use</a>
            </li>
            <li className="active list-inline-item">
              <a href="javascript: void(0);">Compliance</a>
            </li>
            <li className="list-inline-item">
              <a href="javascript: void(0);">Confidential Information</a>
            </li>
            <li className="list-inline-item">
              <a href="javascript: void(0);">Support</a>
            </li>
            <li className="list-inline-item">
              <a href="javascript: void(0);">Contacts</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Confirm
