import React from 'react'
import { Button } from 'antd'
import './style.scss'

class AppFooter extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer__bottom">
          <div className="row">
            <div className="col-sm-6">
              <a
                href="https://themeforest.net/item/clean-ui-admin-template-react-redux-ant-design-fully-responsive-freebies/21938700"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4"
              >
              </a>
            </div>
            <div className="col-sm-6">
              <div className="footer__copyright">
                <img
                  src="resources/images/mediatec.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  alt="OnSky Inc."
                />
                <span>
                  © 2018{' '}
                  <a href="https://www.onskyinc.com/" target="_blank" rel="noopener noreferrer">
                    OnSky Inc.
                  </a>
                  <br />
                  All rights reserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppFooter
