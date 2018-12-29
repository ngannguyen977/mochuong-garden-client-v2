import React from 'react'
import { Radio } from 'antd'
import { Button, Icon } from 'antd'
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
    const { project } = this.props
    console.log(project)
    let url = project.imageUrl || 'resources/images/iot.jpg'
    console.log(url)
    const hover = type => {
      this.setState({
        type,
      })
    }
    return (
      <div
        className={`userCard px-3 py-5 ${type.length > 0 ? 'userCard--typed bg-' + type : ''}`}
        onMouseEnter={() => hover('primary')}
        onMouseLeave={() => hover('')}
      >
        <button className='userCard__plusBtn'>Add</button>
        <Avatar
          src={url}
          border={true}
          borderColor={`${type.length > 0 ? 'white' : ''}`}
          size='90'
        />
        <div className='my-3 text-center'>
          <div className='userCard__userName font-size-18'>{project.name}</div>
          <div className='userCard__post'>{project.description}</div>
          <div className='userCard__time'>
            {helper.formatDate(new Date(project.created_at))} -  {helper.formatDate(new Date(project.updated_at))}
          </div>
        </div>
        <div className='text-center'>
          <div className='btn-group text-center'>
            <ButtonGroup>
              <Button type={type ? 'default' : 'primary'} className='btn-edit'>
                <Icon type='edit' />
                Edit
              </Button>
              <Button type='danger' className='btn-remove'>
                <Icon type='delete' /> Remove
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default UserCard
