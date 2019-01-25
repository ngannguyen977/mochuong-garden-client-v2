import React from 'react'
import { Radio } from 'antd'
import { Button, Icon, Popconfirm, message } from 'antd'
import helper from '../../../helper'

import './style.scss'
// import { project } from './data.json'
import Avatar from 'components/CleanComponents/Avatar'

const ButtonGroup = Button.Group

class UserCard extends React.Component {
  constructor() {
    super()
    this.state = {
      type: '',
    }
  }
  render() {
    const { type } = this.state
    const { data, push } = this.props
    let url = data.imageUrl || 'resources/iot/certificate.jpg'
    const hover = type => {
      this.setState({
        type,
      })
    }
    const remove = () => {
      message.warn('chua co implement')
    }
    return (
      <div
        className={`project-card px-3 py-5 ${
          type.length > 0 ? 'project-card--typed bg-' + type : ''
        }`}
        onMouseEnter={() => hover('primary')}
        onMouseLeave={() => hover('')}
      >
        <Avatar
          src={url}
          border={true}
          borderColor={`${type.length > 0 ? 'white' : ''}`}
          size="90"
        />
        <div className="my-3 text-center">
          <div className="project-card__userName font-size-18">{data.name}</div>
          <div className="project-card__post">{data.description}</div>
          <div className="project-card__time">
            Valid from {helper.formatDate(new Date(data.created_at))}
          </div>
        </div>
        <div className="text-center">
          <div className="btn-group text-center">
            <ButtonGroup>
              <Popconfirm
                title="Are you sure delete this certificate? It cannot be rollback."
                onConfirm={() => remove(data.id)}
                onCancel={() => message.info('cancel deleted')}
                okText="Yes, I confirm"
                cancelText="No, I don't"
              >
                <Button type="danger" className="btn-remove">
                  <Icon type="delete" /> Remove
                </Button>
              </Popconfirm>
            </ButtonGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default UserCard
