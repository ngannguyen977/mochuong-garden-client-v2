import React from 'react'
import { Button, Tabs, Upload, Icon, Input, Dropdown, Modal } from 'antd'
import data from './data.json'
import './style.scss'
import Avatar from 'components/CleanComponents/Avatar'
import Donut from 'components/CleanComponents/Donut'
import Chat from 'components/CleanComponents/Chat'
import SettingsForm from './SettingsForm/customize'
import ChangePassword from './ChangePassword';
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'

const TabPane = Tabs.TabPane
const { TextArea } = Input

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ProfileApp extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      nickname: '',
      photo: '',
      background: '',
      post: '',
      postsCount: '',
      followersCount: '',
      lastActivity: '',
      status: '',
      drawer: false,
      modalEditVisible: false,
      newValue: "",
    }
    this.updatePassword = this.updatePassword.bind(this)
    this.updatePhones = this.updatePhones.bind(this)
  }


  componentWillMount() {
    const userState = JSON.parse(window.localStorage.getItem('app.userState'))
    this.setState({
      id: userState.id,
      name: userState.username,
      nickname: userState.username,
      photo: data.photo,
      background: data.background,
    })
  }
  setModalEditVisible(isShowModal) {
    this.setState({
      modalEditVisible: isShowModal,
      newValue: "",
    })
  }
  updatePassword(data){
    const {id} = this.state
    const {changePassword} = this.props
    changePassword(id,data)
  }
  updatePhones(masterPhone,phoneNumber1,phoneNumber2){
    const {addSetting} = this.props
    addSetting({masterPhone,phoneNumber1,phoneNumber2})
  }
  render() {
    let {
      name,
      nickname,
      photo,
      background,
      post,
      postsCount,
      followersCount,
      lastActivity,
      posts,
    } = this.state
    const{history,phone} =this.props
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
                  <br />
                  <Button.Group size="default">
                    <Button style={{ width: 150 }} onClick={() => this.setModalEditVisible(true)}>Change Password</Button>
                    <Button
                      style={{ width: 150 }}
                      onClick={() => this.props.history.push('/things')}
                    >
                      Manage Things
                    </Button>
                  </Button.Group>
                  <br />
                  <p className="text-white mt-2">{'Last activity: ' + lastActivity}</p>
                  <p className="text-white mt-2">
                    <Donut type="success" name="Online" />
                  </p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="mb-3 text-black">
                  <strong>Actions</strong>
                </h5>
                <div className="profile__actions">
                  <Button
                    style={{ display: 'block', width: '100%' }}
                    onClick={() => this.props.history.push('/things')}
                  >
                    Manage Things
                  </Button>
                  <Button
                    style={{ display: 'block', width: '100%' }}
                    onClick={() => this.props.history.push('/users')}
                  >
                    Manage Users
                  </Button>
                  <Button style={{ display: 'block', width: '100%' }} onClick={() => this.setModalEditVisible(true)}>Change Password</Button>
                  <Button style={{ display: 'block', width: '100%' }}>Access History</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card profile__social-info">
              <div className="profile__social-name">
                <h2>
                  <span className="text-black mr-2">
                    <strong>{name}</strong>
                  </span>
                  <small className="text-muted">@{nickname}</small>
                </h2>
                <p className="mb-1">{post}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                      <span>
                        <i className="icmn-cog" /> Settings
                      </span>
                    }
                    key="1"
                  >
                    <SettingsForm history={history} phone={phone} updatePhones={this.updatePhones}/>
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
                        <i className="icmn-menu" /> Notifications
                      </span>
                    }
                    key="3"
                  >
                    Come in soon
                    <hr />
                   
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        {/* edit modal */}
        <Modal
          title={'Update a new password for '+ name}
          centered
          visible={this.state.modalEditVisible}
          footer={null}
          onCancel={() => this.setModalEditVisible(false)}
        >
          <ChangePassword
            submit={this.updatePassword}
          />
        </Modal>
      </div>
    )
  }
}

export default ProfileApp
