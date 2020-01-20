import React from 'react'
import { Button } from 'antd'
import ProfileMenu from './ProfileMenu'
import IssuesHistory from './IssuesHistory'
import ProjectManagement from './ProjectManagement'
import BitcoinPrice from './BitcoinPrice'
import HomeMenu from './HomeMenu'
import LiveSearch from './LiveSearch'
import './style.scss'

class TopBar extends React.Component {
  render() {
    let { userState } = this.props
    return (
      <div className='topbar'>
        <div className='topbar__left'>
          {/* <IssuesHistory />
          <ProjectManagement />
          <LiveSearch /> */}
        </div>
        <div className='topbar__right'>
          <a
            href='#'
            target='_blank'
            rel='noopener noreferrer'
            className='mr-4 d-none d-sm-inline'
          />
          {/* <BitcoinPrice /> */}
          <HomeMenu />
          <ProfileMenu />
        </div>
      </div>
    )
  }
}

export default TopBar
