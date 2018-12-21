import React from 'react'
import { Menu, Dropdown } from 'antd'

class HomeMenu extends React.Component {
  render() {
    const menu = (
      <Menu selectable={false}>
        <div className="topbar__activity">
          <div className="topbar__activity__item">
            <i className="topbar__activity__icon icmn-star-full" />
            <div className="topbar__activity__inner">
              <div className="topbar__activity__title">
                <span className="pull-right">now</span>
                <a href="javascript: void(0);">
                  Security Calling: <span className="badge badge-danger">New</span>
                </a>
              </div>
              <div className="topbar__activity__descr">
                <span className="text-danger"> Security breach has been detected </span>
              </div>
              <div className="topbar__activity__descr">
                <span className="text-danger"> at meeting room in OS Vietnam Showroom. </span>
              </div>
            </div>
          </div>
          <div className="topbar__activity__item">
            <i className="topbar__activity__icon icmn-stack" />
            <div className="topbar__activity__inner">
              <div className="topbar__activity__title">
                <span className="pull-right">24 min ago</span>
                <a href="javascript: void(0);">Income</a>
              </div>
              <div className="topbar__activity__descr">Front Door motion detected.</div>
            </div>
          </div>
          <div className="topbar__activity__item">
            <i className="topbar__activity__icon icmn-cog utils__spin-delayed--pseudo-selector" />
            <div className="topbar__activity__inner">
              <div className="topbar__activity__title">
                <span className="pull-right">30 min ago</span>
                <a href="javascript: void(0);">Security Setting</a>
              </div>
              <div className="topbar__activity__descr">
                <a href="javascript: void(0);">Security mode has changed to Arm away</a>
              </div>
            </div>
          </div>
          <div className="topbar__activity__item">
            <i className="topbar__activity__icon icmn-cog utils__spin-delayed--pseudo-selector" />
            <div className="topbar__activity__inner">
              <div className="topbar__activity__title">
                <span className="pull-right">32 min ago</span>
                <a href="javascript: void(0);">Security Setting</a>
              </div>
              <div className="topbar__activity__descr">
                <a href="javascript: void(0);">Security mode has changed to Off</a>
              </div>
            </div>
          </div>
          <div className="topbar__activity__item">
            <i className="topbar__activity__icon icmn-cog utils__spin-delayed--pseudo-selector" />
            <div className="topbar__activity__inner">
              <div className="topbar__activity__title">
                <span className="pull-right">34 min ago</span>
                <a href="javascript: void(0);">Security Setting</a>
              </div>
              <div className="topbar__activity__descr">
                <a href="javascript: void(0);">Security mode has changed to Arm home</a>
              </div>
            </div>
          </div>
          <div className="topbar__activity__item">
            <i className="topbar__activity__icon icmn-stack" />
            <div className="topbar__activity__inner">
              <div className="topbar__activity__title">
                <span className="pull-right">1 hour ago</span>
                <a href="javascript: void(0);">Income</a>
              </div>
              <div className="topbar__activity__descr">PlugS motion detected.</div>
            </div>
          </div>
          <div className="topbar__activity__item">
            <i className="topbar__activity__icon icmn-stack" />
            <div className="topbar__activity__inner">
              <div className="topbar__activity__title">
                <span className="pull-right">1 hour ago</span>
                <a href="javascript: void(0);">Income</a>
              </div>
              <div className="topbar__activity__descr">PlugS motion detected.</div>
            </div>
          </div>
        </div>
      </Menu>
    )
    return (
      <div className="topbar__dropdown d-inline-block mr-4">
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <a className="ant-dropdown-link" href="/">
            <i className="icmn-home topbar__dropdownIcon" />
          </a>
        </Dropdown>
      </div>
    )
  }
}

export default HomeMenu
