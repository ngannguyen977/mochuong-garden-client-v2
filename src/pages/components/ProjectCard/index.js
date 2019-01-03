import React from 'react'
import { Radio } from 'antd'
import { Button, Icon, Popconfirm,message } from 'antd'
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
    const { project, remove } = this.props
    let url = project.imageUrl || 'resources/images/iot.jpg'
    const hover = type => {
      this.setState({
        type,
      })
    }
    return (
      <div
        className={`project-card px-3 py-5 ${type.length > 0 ? 'project-card--typed bg-' + type : ''}`}
        onMouseEnter={() => hover('primary')}
        onMouseLeave={() => hover('')}
      >
        <a href='/#/projects/create' className='project-card__plusBtn'>Add</a>
        <Avatar
          src={url}
          border={true}
          borderColor={`${type.length > 0 ? 'white' : ''}`}
          size='90'
        />
        <div className='my-3 text-center'>
          <div className='project-card__userName font-size-18'>{project.name}</div>
          <div className='project-card__post'>{project.description}</div>
          <div className='project-card__time'>
            {helper.formatDate(new Date(project.created_at))} -  {helper.formatDate(new Date(project.updated_at))}
          </div>
        </div>
        <div className='text-center'>
          <div className='btn-group text-center'>
            <ButtonGroup>
              <Button
                onClick={() => this.props.push('/projects/' + project.id)}
                type={type ? 'default' : 'primary'}
                className='btn-edit'
              >
                <Icon type='edit' />
                Edit
              </Button>
              <Popconfirm
                title='Are you sure delete these users? You cannot rollback.'
                onConfirm={() => remove(project.id)}
                onCancel={() => message.info('cancel deleted')}
                okText='Yes, I confirm'
                cancelText="No, I don't"
              >
                <Button
                  type='danger'
                  className='btn-remove'
                >
                  <Icon type='delete' /> Remove
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
