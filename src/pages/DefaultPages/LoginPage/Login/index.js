import React from 'react'
import LoginForm from './LoginForm'
import './style.scss'
import queryString from 'query-string'
import { message } from "antd"

class Login extends React.Component {
  state = { backgroundImage: 'url(resources/images/login/4.jpg)' }

  componentDidMount() {
    const params = queryString.parse(this.props.params)
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'

    if (params.error) {
      message.error(params.error)
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
        className='main-login main-login--fullscreen'
        style={{ backgroundImage: backgroundImage }}
      >
        <div className='main-login__block main-login__block--extended pb-0'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='main-login__block__promo text-white text-center'>
                <h1 className='mb-3 text-white'>
                  <strong>Welcome to OnSky Family</strong>
                </h1>
                <p>
                  At OnSky, Security – Safety is our top priority. By owning the best current
                  technology, we are confident to bring the most intelligent home experience to you
                  and your family.
                </p>
              </div>
              <div className='main-login__block__inner'>
                <div className='main-login__block__form'>
                  <LoginForm email={this.state.restoredEmail} params={this.props.params} />
                </div>
                <div className='main-login__block__sidebar'>
                  <h4 className='main-login__block__sidebar__title text-white'>
                    <strong>OnSky Application</strong>
                    <br />
                    <span>Intelligent Security</span>
                  </h4>
                  <div className='main-login__block__sidebar__item text-justify'>
                    OnSky was founded by Mr. Hung C. Nguyen and a team of experts in Internet of
                    Things (IoT).
                  </div>
                  <div className='main-login__block__sidebar__item text-justify'>
                    Holding over 35 patents, Mr. Nguyen desires to transform innovation and passion
                    to practical applications that canserve humanity for the better. OnSky is his
                    latest creation that aims to redefine smart home and security with IoT and
                    Artificial Intelligence (AI) technologies.
                  </div>
                  <div className='main-login__block__sidebar__place'>
                    <i className='icmn-location mr-3' />
                    Brainy, Happy, Family.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='main-login__footer text-center'>
          {/* <ul className='list-unstyled list-inline'>
            <li className='list-inline-item'>
              <a href='https://www.onskyinc.com'>Terms of Use</a>
            </li>
            <li className='active list-inline-item'>
              <a href='https://www.onskyinc.com'>Compliance</a>
            </li>
            <li className='list-inline-item'>
              <a href='https://www.onskyinc.com'>Confidential Information</a>
            </li>
            <li className='list-inline-item'>
              <a href='https://www.onskyinc.com'>Support</a>
            </li>
            <li className='list-inline-item'>
              <a href='https://www.onskyinc.com'>Contacts</a>
            </li>
          </ul> */}
        </div>
      </div>
    )
  }
}

export default Login
