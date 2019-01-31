import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Input, Button, Tabs, Icon, Select } from 'antd'
import { SketchPicker } from 'react-color'
import DetailCertificate from '../../../components/DetailCertificateCard'
import '../style.scss'

const { TextArea } = Input
const { Option } = Select
@connect(
  mapStateToProps,
  mapDispathToProps,
)
export class Detail extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      color: '#fff',
      isLoaded: false
    }
  }

  componentDidUpdate() {
    const { detail, isEdit } = this.props
    const { name, description, color, project, isLoaded } = this.state
    if (!isLoaded && isEdit && detail && !name) {
      this.setState({
        name: detail.name,
        description: detail.description,
        color: detail.color,
        project: detail.project,
        isLoaded: true
      })
    }
  }
  update(type, value, isChange) {
    const { isEdit, create, update, detail } = this.props
    const { name, description, color, project } = this.state
    switch (type) {
      case 'name':
        this.setState({
          name: value,
        })
        break
      case 'description':
        this.setState({
          description: value,
        })
        break
      case 'color':
        this.setState({
          color: value,
        })
        break
      case 'project':
        this.setState({
          project: value,
        })
        break
      default:
        break
    }
    if (isChange) {
      isEdit ? update(detail.id, name, description, color, project) : create(name, description, color, project)
    }
  }

  render() {
    const { name, description, color, project } = this.state
    const { isEdit, detail } = this.props
    return (
      <div className='certificate certificate-detail-page row'>
        <div className='col-md-3' >
          <DetailCertificate
            onMouseEnter={() => this.setState({ current: 0 })}
            data={detail || {}}
            // handleActions={this.downloadTxtFile}
          />
        </div>
      </div>)
  }
}

export default Detail
