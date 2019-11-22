import React from "react"
import { Tag, Button, Tooltip, Popconfirm, message, Icon } from "antd"
import "./style.scss"
import TimeAgo from "react-timeago"
import helper from "../../../helper"
import Avatar from "components/CleanComponents/Avatar"

class UserCard extends React.Component {
  static defaultProps = {
    type: "",
  }

  render() {
    let { type, user, action, remove, userPageAction } = this.props
    // console.log(user.username ,user.active)
    let time = helper.checkDate(user.last_login)
    let random = Math.floor(Math.random() * 5) + 1
    let defaultAvatar = `resources/images/avatars/${random}.jpg`
    return (
      <div className={`userCard px-3 py-5 ${type.length > 0 ? "userCard--typed bg-" + type : ""}`}>
        <button className='userCard__plusBtn'>Add</button>
        <Avatar
          src={user.imageUrl || defaultAvatar}
          border={true}
          borderColor={`${type.length > 0 ? "white" : ""}`}
          size='90'
          link={`/users/${user.username}`}
        />
        <div className='my-3 text-center'>
          <div className='userCard__userName font-size-18'>{user.username}</div>
          <div className='userCard__post'>
            <i>
              {!time && "Not Connected"}
              {time && (
                <p>
                  <span> Last access </span> <TimeAgo date={user.time} />
                </p>
              )}
            </i>
          </div>
        </div>
        <div className='text-center'>
          <div className='btn-group text-center'>
            {action && <Tooltip
              placement='bottom'
              title='Toggle to set permission view this thing for this user.'
            >
              <Popconfirm
                title='Are you sure change state of permission VIEW THING?'
                onConfirm={() => action(user.uuid, "view", !user.isView)}
                onCancel={() => message.info("cancel selected!")}
                okText='Yes'
                cancelText='No'
              >
                <Tag color={user.isView ? "#52c41a" : "#d9d9d9"}>Can View</Tag>
              </Popconfirm>
            </Tooltip>}
            {action && <Tooltip
              placement='bottom'
              title='Toggle to set permission control this thing for this user.'
            >
              <Popconfirm
                title='Are you sure change state of permission CONTROL THING?'
                onConfirm={() => action(user.uuid, "control", !user.isControl)}
                onCancel={() => message.info("cancel selected!")}
                okText='Yes'
                cancelText='No'
              >
                <Tag color={user.isControl ? "#2f54eb" : "#d9d9d9"}>Can Control</Tag>
              </Popconfirm>
            </Tooltip>}
            {remove && (
              <Tooltip placement='bottom' title='Click to remove this user from this thing.'>
                <Popconfirm
                  title='Are you sure remove this user from this thing?'
                  onConfirm={() => remove(user.uuid)}
                  onCancel={() => message.info("cancel selected!")}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button type='danger' size='small' icon='delete'>
                    Remove
                  </Button>
                </Popconfirm>
              </Tooltip>
            )}
            {/* for user page */}
            {userPageAction && <Tooltip
              placement='bottom'
              title='Toggle to status for this user.'
            >
              <Popconfirm
                title={`Are you sure change status of user ${user.username}?`}
                onConfirm={() => userPageAction('STATUS', user.username, !user.active)}
                onCancel={() => message.info("cancel selected!")}
                okText='Yes'
                cancelText='No'
              >
                <Tag color={user.active ? "#52c41a" : "#d9d9d9"}  className='style-icon'><Icon type='check' />{user.active ? 'Active' : 'Inactive'}</Tag>
              </Popconfirm>
            </Tooltip>}
            {userPageAction && <Tooltip
              placement='bottom'
              title='Toggle to status for this user.'
            >
              <Popconfirm
                title={`Are you sure delete of user ${user.username}? You cannot rollback!`}
                onConfirm={() => userPageAction('DELETE', user.username)}
                onCancel={() => message.info("cancel selected!")}
                okText='Yes'
                cancelText='No'
              >
                <Button className='style-icon' type='danger' size='small' icon='delete'>
                  Delete
                  </Button>
              </Popconfirm>
            </Tooltip>}
          </div>
        </div>
      </div>
    )
  }
}

export default UserCard
