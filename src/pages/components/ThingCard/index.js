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

    const { data, type, remove } = this.props

    return (
      <div className='thingCard'>
        <div className='thingCard__img'>
          {productStatus === 'new' && (
            <div className='thingCard__status'>
              <span className='thingCard__status__title'>active</span>
            </div>
          )}

          <a href={'/#/things/' + data.id}>
            <img className='img-responsive' src={productImg} alt='' />
          </a>
        </div>
        <div className='thingCard__title'>
          <a href={'/things/' + data.id}>{data.name}</a>
          <div className='thingCard__price'>
            {/* <img src={imageType} width='50px' className='img-responsive' alt={data.type} /> */}
          </div>
        </div>
        <div className='thingCard__descr'>{data.description || 'no description'}</div>
        <div className='thingCard__btn-control'>
          <Button type='primary' onClick={() => this.props.push('/things/' + data.id)}>
            Edit
          </Button>
          <Popconfirm
            title='Are you sure delete this project? It cannot be rollback.'
            onConfirm={() => remove(data.id)}
            onCancel={() => message.info('cancel deleted')}
            okText='Yes, I confirm'
            cancelText="No, I don't"
          >
            <Button type='danger' className='btn-remove'>
              Remove
            </Button>
          </Popconfirm>
        </div>
      </div>
    )
  }
}

export default ProductCard
