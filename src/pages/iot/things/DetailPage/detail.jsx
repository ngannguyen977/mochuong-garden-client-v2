import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Input,Checkbox } from 'antd'

const { TextArea } = Input
@connect(
  mapStateToProps,
  mapDispathToProps,
)
export class DetailPage extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      imageUrl: 'resources/iot/camera-onsky.png',
      isLoaded: false
    }
  }

  componentDidUpdate() {
    const { detail, isEdit, type } = this.props
    const { name, isLoaded } = this.state
    if (!isLoaded && isEdit && detail && (!name || name !== detail.name)) {
      this.setState({
        name: detail.name,
        description: detail.description,
        project: detail.project,
        template: detail.template,
        type: type.find(x => x.id === detail.template.type),
        imageUrl: detail.imageUrl || 'resources/iot/camera-onsky.png',
        isLoaded: true
      })
    }
  }
  uploadSuccess() {

  }
  render() {
    const { name, description, imageUrl } = this.state
    let status = `<status><slight_onoff>1</slight_onoff><slight_sw_1>1</slight_sw_1><slight_sw_2>1</slight_sw_2><slight_1>0</slight_1><slight_2>255</slight_2><slight_3>45</slight_3><slight_4>255</slight_4><enmotion>1</enmotion><motiontimeout>900</motiontimeout><motion>0</motion><opMode>0</opMode><secmode>0</secmode><motionhwpresent>0</motionhwpresent><slight_sw_1_name></slight_sw_1_name><slight_sw_2_name></slight_sw_2_name><slight_name_1></slight_name_1><slight_name_2></slight_name_2><slight_name_3></slight_name_3><slight_name_4></slight_name_4></status>`
    return (
      <div className='thing-detail-page row'>
        <div className='col-lg-4 text-justify'>
          <div className='upload-image text-center'>
            <img className='img-responsive' src={imageUrl} alt='' />
            <h5 className='text-black'><strong>{name || 'thing name'}</strong></h5>
            <div className='description text-justify'>
              <small className='font-italic text-right'> *With most services, your name is a name you created, or that has been assigned to you. If you do not recall creating a name,
               (or don't remember the name you chose), try using your e-mail address as your name.
             If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</small>
            </div>
          </div>
        </div>
        <div className='col-lg-8'>
          <div className='mb-5'>
            <h5 className='text-black'><strong>Device Information</strong></h5>
            <p className='text-muted'>Use the well as a simple effect on an element to give it an inset effect</p>
            <dl className='row'>
              <dt className='col-sm-3'>Serial number</dt>
              <dd className='col-sm-9'>194644475905</dd>
              <dt className='col-sm-3'>Mac Address</dt>
              <dd className='col-sm-9'><mark>84:86:f3:00:3c:cc</mark></dd>
              <dt className='col-sm-3'>Model number</dt>
              <dd className='col-sm-9'>194644475905</dd>
              <dt className='col-sm-3'>Active</dt>
              <dd className='col-sm-9'><Checkbox checked={true}> Active</Checkbox></dd>
              <dt className='col-sm-3'>Active State</dt>
              <dd className='col-sm-9'>True</dd>
              <dt className='col-sm-3'>Buy at date</dt>
              <dd className='col-sm-9'>March 3,2019</dd>
              <dt className='col-sm-3'>Ship on date</dt>
              <dd className='col-sm-9'>March 3,2019</dd>
              <dt className='col-sm-3'>Quarranty Expired</dt>
              <dd className='col-sm-9'>March 3,2019</dd>
              <dt className='col-sm-3'>Device connected</dt>
              <dd className='col-sm-9'>10</dd>
              <dt className='col-sm-3'>Software version</dt>
              <dd className='col-sm-9'>30.11.8.12</dd>
              <dt className='col-sm-3'>Status</dt>
              <dd className='col-sm-9'><code>{status}</code></dd>
            </dl>
          </div>
        </div>
      </div>)
  }
}

export default DetailPage
