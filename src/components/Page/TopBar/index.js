import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import ProfileMenu from './ProfileMenu'
import IssuesHistory from './IssuesHistory'
import ProjectManagement from './ProjectManagement'
import BitcoinPrice from './BitcoinPrice'
import HomeMenu from './HomeMenu'
import LiveSearch from './LiveSearch'
import './style.css'

const mapStateToProps = (state, props) => ({})

@connect(mapStateToProps)
class TopBar extends React.Component {
  render() {
    return (
      <div className="topbar">
        <div className="topbar__left">
          <IssuesHistory />
          <ProjectManagement />
          <LiveSearch />
        </div>
        <div className="topbar__right">
          <a href="http://google.com" target="_blank" rel="noopener noreferrer" className="mr-4">
            <Button type="danger">Buy Now 25$</Button>
          </a>
          <BitcoinPrice />
          <HomeMenu />
          <ProfileMenu />
        </div>
      </div>
    )
  }
}

export default TopBar