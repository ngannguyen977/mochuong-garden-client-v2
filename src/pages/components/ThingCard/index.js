import React from "react"
import { Tag, Button, Tooltip, Popconfirm, message, Icon, Checkbox } from "antd"
import "./style.scss"
import { Link } from 'react-router-dom'
import { getPropertyValue } from '../../../helper'

class ProductCard extends React.Component {
  state = {
    productImg: "resources/iot/camera-onsky.png",
    productStatus: "new",
  }

  render() {
    const { productImg, productStatus } = this.state

    const { data, isCreate, permission, action, remove, destroy } = this.props

    let isGateway = (data.template || {}).name === 'OnSky gateway'
    const isConnected = isGateway ? getPropertyValue(data.properties, 'IsConnected') : getPropertyValue(data.properties, 'reachable')
    let name = getPropertyValue(data.properties, 'dev_name')

    return (
      <div className='thingCard'>
        <div className='thingCard__img'>
        {(isConnected === 'true' || isConnected == 1) && (
            <div className='thingCard__status'>
              <span className='thingCard__status__title'>Online</span>
            </div>
          )}
          {(isConnected === 'false' || isConnected == 0) && (
            <div className='thingCard__offline'>
              <span className='thingCard__status__title'>Offline</span>
            </div>
          )}
          <Link to={"/things/" + data.name}>
            <img className='img-responsive' src={data.imageUrl || productImg} alt='' />
          </Link>
        </div>
        <div className='thingCard__title'>
          <Link to={"/things/" + data.name}>{data.displayName}</Link>
          <div className='thingCard__price' />
        </div>
        <div className='thingCard__descr'>{data.serial || "no description"}</div>
        {isCreate && (
          <div className='thingCard__btn-control'>
            <Checkbox
              defaultChecked={(permission || {}).isControl}
              onChange={e => action(data, e.target.checked)}
            >
              Control
            </Checkbox>
            <Checkbox
              defaultChecked={(permission || {}).isView}
              onChange={e => action(data, undefined, e.target.checked)}
            >
              View Only
            </Checkbox>
          </div>
        )}
        {!isCreate &&
          <div className='btn-group text-center'>
            {action && <Tooltip
              placement='bottom'
              title='Toggle to set permission view this thing for this user.'
            >
              <Popconfirm
                title='Are you sure change state of permission VIEW THING?'
                onConfirm={() => action('view', data.name, !data.isView)}
                onCancel={() => message.info("cancel selected!")}
                okText='Yes'
                cancelText='No'
              >
                <Tag color={data.isView ? "#52c41a" : "#d9d9d9"}>View</Tag>
              </Popconfirm>
            </Tooltip>}
            {action && <Tooltip
              placement='bottom'
              title='Toggle to set permission control this thing for this user.'
            >
              <Popconfirm
                title='Are you sure change state of permission CONTROL THING?'
                onConfirm={() => action('control', data.name, !data.isControl)}
                onCancel={() => message.info("cancel selected!")}
                okText='Yes'
                cancelText='No'
              >
                <Tag color={data.isControl ? "#2f54eb" : "#d9d9d9"}>Control</Tag>
              </Popconfirm>
            </Tooltip>}
            {remove && (
              <Tooltip placement='bottom' title='Click to remove this user from this thing.'>
                <Popconfirm
                  title='Are you sure remove this user from this thing?'
                  onConfirm={() => remove(data.serial)}
                  onCancel={() => message.info("cancel selected!")}
                  okText='Yes'
                  cancelText='No'
                >
                  <Icon type='delete' />
                </Popconfirm>
              </Tooltip>
            )}
            {/* for user page */}
            {destroy && <Tooltip
              placement='bottom'
              title='Toggle to status for this user.'
            >
              <Popconfirm
                title={`Are you sure delete of user ${data.username}? You cannot rollback!`}
                onConfirm={() => destroy('DELETE', data.username)}
                onCancel={() => message.info("cancel selected!")}
                okText='Yes'
                cancelText='No'
              >
                <Button className='style-icon' type='danger' size='small' icon='delete'>
                  Delete
                  </Button>
              </Popconfirm>
            </Tooltip>}
          </div>}
      </div>
    )
  }
}

export default ProductCard
