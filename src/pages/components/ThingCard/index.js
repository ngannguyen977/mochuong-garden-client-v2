import React from 'react'
import './style.scss'
import data from './data.json'
import { Button, Icon, Popconfirm, message } from 'antd'

class ProductCard extends React.Component {
  state = {
    productImg: data.productImg,
    productName: data.productName,
    productPrice: data.productPrice,
    productOldPrice: data.productOldPrice,
    productNote: data.productNote,
    productStatus: data.productStatus,
  }

  render() {
    const { productImg, productStatus } = this.state

    const {
      data,
      type,
      remove,
      isAttach,
      attachThing,
      removeThing,
      parentId,
      dontEdit,
    } = this.props
    const attach = id => {
      console.log('attach', parentId, id)
      attachThing(parentId, id)
    }
    const _remove = id => {
      removeThing(parentId, id)
    }
    return (
      <div className="thingCard">
        <div className="thingCard__img">
          {productStatus === 'new' && (
            <div className="thingCard__status">
              <span className="thingCard__status__title">active</span>
            </div>
          )}

          <a href={'/#/things/' + data.id}>
            <img className="img-responsive" src={productImg} alt="" />
          </a>
        </div>
        <div className="thingCard__title">
          <a href={'/things/' + data.id}>{data.name}</a>
          <div className="thingCard__price">
            {/* <img src={imageType} width='50px' className='img-responsive' alt={data.type} /> */}
          </div>
        </div>
        <div className="thingCard__descr">{data.description || 'no description'}</div>
        {isAttach && (
          <div className="thingCard__btn-control">
            <Icon
              type="api"
              theme="filled"
              className="thingCard__btn btn-edit"
              onClick={() => attach(data.id)}
            />
          </div>
        )}
        {!isAttach && (
          <div className="thingCard__btn-control">
            {!dontEdit && (
              <Icon
                type="edit"
                theme="filled"
                className="thingCard__btn btn-edit"
                onClick={() => this.props.push('/things/' + data.id)}
              >
                Edit
              </Icon>
            )}
            <Popconfirm
              title="Are you sure delete this thing? It cannot be undone."
              onConfirm={() => remove(data.id)}
              onCancel={() => message.info('cancel deleted')}
              okText="Yes, I confirm"
              cancelText="No, I don't"
            >
              <Icon type="delete" theme="filled" className="thingCard__btn btn-remove">
                Remove
              </Icon>
            </Popconfirm>
          </div>
        )}
      </div>
    )
  }
}

export default ProductCard
