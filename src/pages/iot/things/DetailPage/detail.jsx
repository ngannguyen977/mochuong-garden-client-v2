import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Input, Checkbox } from 'antd'
import helper from '../../../../helper'

const { TextArea } = Input
@connect(
  mapStateToProps,
  mapDispathToProps,
)
export class DetailPage extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false,
      name: '',
      displayName: '',
      imageUrl: 'resources/iot/camera-onsky.png',
      serial: '194644475905',
      macAddress: '84:86:f3:00:3c:cc',
      modelNumber: '194644475905',
      active: true,
      created_at: 'March 3,2019',
      shipOn: 'March 3,2019',
      quarranty: 'March 3,2019',
      deviceConnect: 10,
      version: '30.11.8.12',
      description: "*With most services, your name is a name you created, or that has been assigned to you. If you do not recall creating a name, (or don't remember the name you chose), try using your e-mail address as your name. If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.",
      status: '<status><slight_onoff>1</slight_onoff><slight_sw_1>1</slight_sw_1><slight_sw_2>1</slight_sw_2><slight_1>0</slight_1><slight_2>255</slight_2><slight_3>45</slight_3><slight_4>255</slight_4><enmotion>1</enmotion><motiontimeout>900</motiontimeout><motion>0</motion><opMode>0</opMode><secmode>0</secmode><motionhwpresent>0</motionhwpresent><slight_sw_1_name></slight_sw_1_name><slight_sw_2_name></slight_sw_2_name><slight_name_1></slight_name_1><slight_name_2></slight_name_2><slight_name_3></slight_name_3><slight_name_4></slight_name_4></status>',
    }
  }
  getParams = (detail) => {
    this.setState({
      ...detail,
      isLoaded: true
    })
  }
  componentWillReceiveProps() {
    this.setState({
      isLoaded: false,
    })
  }
  componentDidMount() {
    const { detail } = this.props
    const { isLoaded } = this.state
    if (!isLoaded && detail) {
      this.getParams(detail)
      helper.barcodeGenerator('#barcode', detail.serial)
    }
  }

  render() {
    const { name,
      displayName,
      description,
      imageUrl,
      serial,
      macAddress,
      modelNumber,
      active,
      created_at,
      shipOn,
      quarranty,
      deviceConnect,
      version,
      status,
      isLoaded } = this.state
    return (
      <div className='thing-detail-page row'>
        <div className='col-lg-4 text-justify'>
          <div className='thing-image text-center'>
            <div className='img-responsive thing-image'>
              <img src={imageUrl} alt={name} />
            </div>
            <svg id='barcode'></svg>
            <h5 className='text-black'><strong>{displayName || 'thing name'}</strong></h5>
            <div className='description text-center'>
              <small className='font-italic text-right'> {description}</small>
            </div>
          </div>
        </div>
        <div className='col-lg-8'>
          <div className='mb-5'>
            <h5 className='text-black'><strong>Device Information</strong></h5>
            <p className='text-muted'>Use the well as a simple effect on an element to give it an inset effect</p>
            <dl className='row'>
              <dt className='col-sm-3'>Serial number</dt>
              <dd className='col-sm-9'>{serial}</dd>
              <dt className='col-sm-3'>Mac Address</dt>
              <dd className='col-sm-9'><mark>{serial}</mark></dd>
              <dt className='col-sm-3'>Model number</dt>
              <dd className='col-sm-9'>{modelNumber}</dd>
              <dt className='col-sm-3'>Active</dt>
              <dd className='col-sm-9'><Checkbox checked={active}> Active</Checkbox></dd>
              <dt className='col-sm-3'>Buy at date</dt>
              <dd className='col-sm-9'>{helper.formatDate(created_at)}</dd>
              <dt className='col-sm-3'>Ship on date</dt>
              <dd className='col-sm-9'>{helper.formatDate(shipOn)}</dd>
              <dt className='col-sm-3'>Quarranty Expired</dt>
              <dd className='col-sm-9'>{helper.formatDate(quarranty)}</dd>
              <dt className='col-sm-3'>Device connected</dt>
              <dd className='col-sm-9'>{deviceConnect}</dd>
              <dt className='col-sm-3'>Software version</dt>
              <dd className='col-sm-9'>{version}</dd>
              <dt className='col-sm-3'>Status</dt>
              <dd className='col-sm-9'><code>{status}</code></dd>
            </dl>
          </div>
        </div>
      </div>)
  }
}

export default DetailPage
