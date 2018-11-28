import React from 'react'
import { Row, Col } from 'antd'

class GroupPage extends React.Component {
  render() {
    return (
      <div>
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Groups Management</strong>
            </div>
          </div>
          <div className="card-body">
            <p>
              While Bootstrap uses aaa<code>em</code>s or <code>rem</code>s for defining most sizes,{' '}
              <code>px</code>s are used for grid breakpoints and container widths. This is because
              the viewport width is in pixels and does not change with the{' '}
              <a href="https://drafts.csswg.org/mediaqueries-3/#units">font size</a>.
            </p>
            <p>
              See how aspects of the Bootstrap grid system work across multiple devices with a handy
              table.
            </p>
            <br />
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      #<br />
                    </th>
                    <th>
                      Name<br />
                      <small>of groups</small>
                    </th>
                    <th>
                      Users<br />
                      <small>≥576px</small>
                    </th>
                    <th>
                      Policies<br />
                      <small>≥768px</small>
                    </th>
                    <th>
                      Create Time<br />
                      <small>≥992px</small>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="text-nowrap" scope="row">
                      Grid behavior
                    </th>
                    <td>Horizontal at all times</td>
                    <td colSpan="4">Collapsed to start, horizontal above breakpoints</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
            <div className="table">
                  <Row>
                    <th>
                      #<br />
                    </th>
                    <th>
                      Name<br />
                      <small>of groups</small>
                    </th>
                    <th>
                      Users<br />
                      <small>≥576px</small>
                    </th>
                    <th>
                      Policies<br />
                      <small>≥768px</small>
                    </th>
                    <th>
                      Create Time<br />
                      <small>≥992px</small>
                    </th>
                  </Row>
                <tbody>
                  <Row>
                    <th className="text-nowrap" scope="row">
                      Grid behavior
                    </th>
                    <Col>Horizontal at all times</Col>
                    <Col colSpan="4">Collapsed to start, horizontal above breakpoints</Col>
                  </Row>
                </tbody>
              </div>
            
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default GroupPage
