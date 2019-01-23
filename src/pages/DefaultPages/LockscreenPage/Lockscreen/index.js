import React from 'react'
import { Button, Divider, Icon } from 'antd'
import Avatar from 'components/CleanComponents/Avatar'
import './style.scss'

class Lockscreen extends React.Component {
  state = {
    backgroundImage: 'url(resources/images/login/1.jpg)',
    fullSize: false,
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
    const { backgroundImage, fullSize } = this.state

    return (
      <div
        onLoad={() => this.generateBackground()}
        className='login'
      // style={{ backgroundImage: backgroundImage }}
      >
        {/* <div className="login__header">
          <div className="row">
            <div className="col-lg-8">
              <div className="login__header__logo">
                <a href="javascript: void(0);">
                  <img src="resources/images/login/logo.png" alt="Clean UI Admin Template" />
                </a>
              </div>
            </div>
          </div>
        </div> */}
        <div className='login__block mb-5'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='login__block__inner'>
                <div className='login__block__form'>
                  <form id='form-validation' name='form-validation' method='POST' className='text-center'>
                    <div className='text-center mb-3'>
                      <Avatar src='resources/images/avatars/1.jpg' border='true' size='90' />
                    </div>
                    <h2 style={{ color: '#514d6a' }} className='text-center'>
                      <i className='icmn-lock' />
                      <strong>Empty {this.props.name}</strong>
                    </h2>
                    <br />
                    <Divider />
                    <Button type='primary' href={this.props.link} onClick={() => this.props.action()}>
                      Create&nbsp;{this.props.name}<Icon type='right' />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Lockscreen
