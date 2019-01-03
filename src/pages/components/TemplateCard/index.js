import React from 'react'
import './style.scss'
import data from './data.json'
import { Button } from 'antd'

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
    const {
      productImg,
      productName,
      productPrice,
      productOldPrice,
      productNote,
      productStatus,
    } = this.state

    const { data, type } = this.props

    let imageType
    switch (data.type) {
      case type.remote:
     imageType = 'resources/iot/remote.png'
        break
        case type.generic:
        imageType = 'resources/iot/generic.png'
        break
        case type.gateway:
        imageType = 'resources/iot/gateway.png'
        break
        case type.camera:
        imageType = 'resources/iot/camera.png'
        break
        default:
        break
    }
    return (
      <div className='templateCard'>
        <div className='templateCard__img'>
          {productStatus === 'new' && (
            <div className='templateCard__status'>
              <span className='templateCard__status__title'>active</span>
            </div>
          )}

          <a href='javascript: void(0);'>
            <img src={productImg} alt='' />
          </a>
        </div>
        <div className='templateCard__title'>
          <a href='javascript: void(0);'>{data.name}</a>
          <div className='templateCard__price'>
            <img src={imageType} width='50px' className='img-responsive' alt={data.type} />
          </div>
        </div>
        <div className='templateCard__descr'>
          {data.description}
        </div>
        <div className='templateCard__btn-control'>
        <Button type='primary'>Edit</Button><Button type='danger'>Remove</Button>
        </div>
      </div>
    )
  }
}

export default ProductCard
