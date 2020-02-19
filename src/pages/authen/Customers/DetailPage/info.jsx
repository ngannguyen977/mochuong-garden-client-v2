import React from 'react'
import { Button, Tabs, Upload, Icon, Input, Menu, Dropdown, message, Tag, Divider } from 'antd'
import './style.scss'
import queryString from "query-string"
import Avatar from 'components/CleanComponents/Avatar'
import Donut from 'components/CleanComponents/Donut'
import Chat from 'components/CleanComponents/Chat'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import data from './data.json'
import TimeAgo from "react-timeago"
import { getFullName } from '../../../../helper'
import MapComponent from './maps/map'
import html2canvas from 'html2canvas';
import SettingForm from './SettingsForm/customize'

const TabPane = Tabs.TabPane
const { TextArea } = Input
const AnyReactComponent = ({ text }) => <div>{text}</div>;

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ProfileApp extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  constructor() {
    super()
    this.state = {
      name: '',
      nickname: '',
      photo: data.photo,
      background: data.background,
      post: { comments: [] },
      postsCount: '',
      followersCount: '',
      lastActivity: data.lastActivity,
      status: '',
      drawer: false,
      modalEditVisible: false,
      newValue: "",
      to: undefined,
      phone:{}
    }
    this.sendEmail = this.sendEmail.bind(this)

  }
  setModalEditVisible(isShowModal) {
    this.setState({
      modalEditVisible: isShowModal,
      newValue: "",
    })
  }
  componentDidMount() {
    // setTimeout(() => {
    //   let element = document.getElementsByClassName('info-body')
    //   console.log('capturing...')

    //   html2canvas(element[0], {
    //     useCORS: true,
    //     allowTaint: true,
    //     ignoreElements: (node) => {
    //       return node.nodeName === 'IFRAME';
    //     }
    //   }).then(function (canvas) {
    //     let image = canvas.toDataURL('image/png');
    //     window.localStorage.setItem("map", image)
    //   });
    // }, 1000 * 5);
  }
  sendEmail(event) {
    if (event && event.key !== 'Enter') {
      return
    }
    let { to } = this.state
    if (!to) {
      message.warn('please input your securities email')
      return
    }
    const { sendEmail } = this.props
    sendEmail(to)
    // TODO:
    // save image to storage
    // disable button in 1 minutes
    // call send email with TO and imageURL
  }
  getGatewayStatus(cn) {
    let defaultStatus = {
      securityStatus: 0,
      safetyStatus: 1
    }
    if (!cn) {
      return defaultStatus
    }
    let things = JSON.parse(window.localStorage.getItem("app.things"))

    if (!things || !Array.isArray(things) || things.length === 0) {
      console.log('fail 2')
      return defaultStatus
    }
    //  TODO: get all status of all gateway
    let gateway = things.find(x => x.templateName === 'OnSky gateway' && x.customerNumber == cn)
    if (!gateway || !gateway.properties || !Array.isArray(gateway.properties) || gateway.properties.length === 0) {
      console.log('fail 4')
      return defaultStatus
    }
    let securityProp = gateway.properties.find(x => x.name === 'sec_mode' || (x.template && x.template.name === 'sec_mode'))
    let safetyProp = gateway.properties.find(x => x.name === 'safety_mode' || (x.template && x.template.name === 'safety_mode'))
    let securityStatus = (securityProp || {}).value || ((securityProp || {}).template || {}).value
    let safetyStatus = (safetyProp || {}).value || ((safetyProp || {}).template || {}).value

    return {
      securityStatus,
      safetyStatus,
      serial: gateway.serial
    }
  }
  changeSecurityStatus(type, serial, value) {
    // get gateway serial
    const { gatewayStatus, match } = this.props
    let propertyName = ''
    let propertyCommand = ''
    let isGateway = true
    let payload = ''
    switch (type) {
      case 'safety':
        if (value > 0) {
          value = 0
        } else {
          value = 1
        }
        propertyCommand = 'safetymode'
        propertyName = 'safety_mode'
        payload = `<?xml version='1.0' encoding='UTF-8' standalone='yes' ?><MQTTPayload><req_type>PUT</req_type><safety_sec_mode><safety_sec_mode_value>${value}</safety_sec_mode_value></safety_sec_mode></MQTTPayload>`
        break
      case 'security':
        if (value < 2) {
          value = +value + 1
        } else {
          value = 0
        }
        propertyCommand = 'homesecmode'
        propertyName = 'sec_mode'
        payload = `<?xml version='1.0' encoding='UTF-8' standalone='yes' ?><MQTTPayload><req_type>PUT</req_type><home_sec_mode><home_sec_mode_value>${value}</home_sec_mode_value></home_sec_mode></MQTTPayload>`
      default:
        break;
    }
    this.props.commandThing(match.params.cn, serial, propertyCommand, propertyName, isGateway, payload)
  }
  getSecurityStatus(type, value) {
    switch (type) {
      case 'safety':
        if (value == 0) {
          return {
            color: '#237804',
            text: 'ENABLE',
            value
          }
        }
        return {
          color: '#f5222d',
          text: 'DISABLE',
          value
        }
      case 'security':
      default:
        if (value == 2) {
          return {
            color: '#237804',
            text: 'ARM AWAY',
            value
          }
        }
        if (value == 1) {
          return {
            color: '#237804',
            text: 'ARM HOME',
            value
          }
        }
        return {
          color: '#f5222d',
          text: 'DISARM',
          value
        }
    }
  }
  render() {
    const { detail, observer, match,phone } = this.props
    let {
      name,
      nickname,
      photo,
      background,
      post,
      postsCount,
      followersCount,
      lastActivity,
    } = this.state
    const gatewayStatus = this.getGatewayStatus(match.params.cn)
    let securityStatus = this.getSecurityStatus('security', gatewayStatus.securityStatus)
    let safetyStatus = this.getSecurityStatus('safety', gatewayStatus.safetyStatus)
    console.log('gatewayStatus', gatewayStatus)
    return (
      <div className="profile">
        <div className="row">
          <div className="col-xl-4">
            <div
              className="card profile__header"
              style={{ backgroundImage: 'url(' + background + ')' }}
            >
              <div className="profile__header-card">
                <div className="card-body text-center">
                  <Avatar src={photo} size="110" border="true" borderColor="white" />
                  <br />
                  {/* <br />
                  <Button.Group size="default">
                    <Button style={{ width: 150 }} onClick={() => this.setModalEditVisible(true)}>Send Email</Button>
                    <Button
                      style={{ width: 150 }}
                      onClick={() => this.props.history.push('/things')}
                    >
                      Manage Things
                    </Button>
                  </Button.Group>
                  <br /> */}
                  <p className="text-yellow text-bold mt-2">Last activity: <TimeAgo date={detail.updated_at} /></p>
                  <p className="text-white mt-2">
                    <Donut type="success" name="Online" />
                  </p>
                </div>
              </div>
            </div>
            <div className="card profile__social-info">
              <div className="profile__social-name">
                <h2>
                  <small className="text-muted">@</small>
                  <span className="text-black mr-2">
                    <strong>{getFullName(detail.firstName, detail.lastName)}</strong>
                  </span>
                </h2>
                <p className="mb-1">{detail.address1}</p>
              </div>
              {/* <div className="profile__social-counts">
                <div className="text-center mr-3">
                  <h2>{1}</h2>
                  <p className="mb-0">Gateways</p>
                </div>
                <div className="text-center">
                  <h2>{20}</h2>
                  <p className="mb-0">Devices</p>
                </div>
              </div> */}
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card profile__social-info text-center">
                  <h5>Security Status</h5>
                  <Tag className='security-status' color={securityStatus.color} >{securityStatus.text}</Tag>
                  <Button className='security-status security-operation' type='primary' onClick={() => this.changeSecurityStatus('security', gatewayStatus.serial, securityStatus.value)}>Change</Button>
                </div>
              </div>
              <div className="col-md-6 text-right">
                <div className="card profile__social-info text-center">
                  <h5>Safety Status</h5>
                  <Tag className='security-status' color={safetyStatus.color} >{safetyStatus.text}</Tag>
                  <Button className='security-status security-operation' type='primary' onClick={() => this.changeSecurityStatus('safety', gatewayStatus.serial, safetyStatus.value)}>Change</Button>
                </div>
              </div>
            </div>


            {/* <div className="card">
              <div className="card-body">
                <h5 className="mb-3 text-black">
                  <strong>Actions</strong>
                </h5>
                <div className="profile__actions">
                  <Button
                    style={{ display: 'block', width: '100%' }}
                  >
                    Notifications
                  </Button>
                  <Button
                    style={{ display: 'block', width: '100%' }}
                  >
                    Devices List
                  </Button>
                  <Button style={{ display: 'block', width: '100%' }}>Activity Log</Button>
                </div>
              </div>
            </div> */}
            <div className="card profile__social-info send-email-wrap">
              <div className="profile__social-name text-center">
                <Input size="large" placeholder="@securities email" value={this.state.to} onChange={(e) => this.setState({
                  to: e.target.value
                })} onKeyPress={this.sendEmail} />
                <Button className='send-email-btn' type='primary' style={{ display: 'block', width: '100%' }} onClick={() => this.sendEmail()}>Send Email</Button>
              </div>
              {/* <div className="profile__social-counts">
                <div className="text-center mr-3">
                  <h2>{1}</h2>
                  <p className="mb-0">Gateways</p>
                </div>
                <div className="text-center">
                  <h2>{20}</h2>
                  <p className="mb-0">Devices</p>
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-xl-8 info-body">
            <div className="card">
              <div className="card-body">
                <Tabs defaultActiveKey="1">
                  <TabPane tab={
                    <span>
                      <i className="icmn-menu" /> Map
                      </span>
                  } key="1">
                    <MapComponent origin={(observer.customer || {}).address1} destination={detail.address1} />
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <i className="icmn-bubbles" /> Messages
                      </span>
                    }
                    key="2"
                  >
                    Come in soon
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <i className="icmn-cog" /> Settings
                      </span>
                    }
                    key="3"
                  >
                    <SettingForm history={history} phone={phone} updatePhones={this.updatePhones} />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileApp
