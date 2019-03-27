import React from 'react'
import { Input, Divider } from 'antd'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispathToProps } from '../container'
import Quagga from 'quagga'

const Search = Input.Search


@connect(
    mapStateToProps,
    mapDispathToProps,
)
class register extends React.Component {
    constructor() {
        super()
        this.state = {
            isSubmit: false,
            focusImage: false
        }
    }
    submit(value) {
        this.props.registerGateway(value)
    }
    componentDidMount(){
        Quagga.init({
          inputStream : {
            name : 'Live',
            type : 'LiveStream',
            target: document.querySelector('#scanner')    // Or '#yourElement' (optional)
          },
          decoder : {
            readers : ['code_128_reader','ean_reader','ean_8_reader','code_39_reader','code_39_vin_reader','codabar_reader','upc_reader','upc_e_reader','i2of5_reader','2of5_reader','code_93_reader']
          }
        }, function(err) {
            if (err) {
                console.log(err)
                return
            }
            console.log('Initialization finished. Ready to start')
            Quagga.start()
        })
      }
    render() {
        let defaultImage = 'resources/iot/goi12.png'
        let rotateImage = 'resources/iot/gateway2.webp'
        return (
            <div className='register-thing'>
                <div id='scanner'></div>
                <section className='card'>
                    <div className='card-header'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='utils__title'>
                                    <strong>Register a new Thing</strong>
                                </div>
                                <small>
                                    Thing management allow admins can control all things. Administrators can create a
                                    new thing, add a thing to several groups, attach some permission, change status or
                                    delete things. You also view detail a thing, identify groups and permissions of a
                                    thing.
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className='card-body text-center'>
                        <div className='utils__title'>
                            <strong>Please drop your gateway serial</strong>
                        </div>
                        <Search
                            placeholder='893123456789'
                            enterButton='ENTER'
                            size='large'
                            onSearch={value => this.submit(value)}
                            autoFocus
                        />
                        <div className='btn-handle-back text-right text-underline'>
                            <a href='/#/things'>Back to Thing page</a>
                        </div>
                    </div>
                </section>
                <section className='card'>
                    <div className='card-header'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='utils__title'>
                                    <strong>What's the serial number?</strong>
                                </div>
                                <p>
                                    The serial number of device is allow admins can control all things. Administrators can create a
                                    new thing, add a thing to several groups, attach some permission, change status or
                                    delete things. You also view detail a thing, identify groups and permissions of a
                                    thing.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='card-body text-center'
                     onMouseEnter={() => this.setState({ focusImage: true })}
                     onMouseLeave={() => this.setState({ focusImage: false })}
                    >
                        <img
                            className='img-responsive product-img'
                            src={this.state.focusImage ? rotateImage : defaultImage}
                            alt='' />
                    </div>
                </section>
            </div>
        )
    }
}
export default register