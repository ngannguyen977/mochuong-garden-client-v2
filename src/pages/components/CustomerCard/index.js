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
    let random = Math.floor(Math.random() * 5) + 1
    let defaultAvatar = `resources/images/avatars/${random}.jpg`
    let name = `${user.lastName} ${user.firstName}`
    if( user.firstName == (user.lastName|| '').trim()){
      name = user.firstName
    }
    return (
      <div className={`userCard px-3 py-5 ${type.length > 0 ? "userCard--typed bg-" + type : ""}`}>
        <button className='userCard__plusBtn'>Add</button>
        <Avatar
          src={user.imageUrl || defaultAvatar}
          border={true}
          borderColor={`${type.length > 0 ? "white" : ""}`}
          size='90'
          link={`/customers/${user.accountNumber}`}
        />
        <div className='my-3 text-center'>
          <div className='userCard__userName' style={{fontSize: 28}}>{name}</div>
          <div className='userCard__post'>
            <i>
                <h4>{user.mobile} </h4>
                <p>{user.address1}  </p>
            </i>
          </div>
        </div>
        
      </div>
    )
  }
}

export default UserCard
