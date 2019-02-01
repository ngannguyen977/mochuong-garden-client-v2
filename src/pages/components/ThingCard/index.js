import React from 'react'
import './style.scss'
import data from './data.json'

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
    } = this.props
    return (
      <div className='thingCard'>
        <div className='thingCard__img'>
          {productStatus === 'new' && (
            <div className='thingCard__status'>
              <span className='thingCard__status__title'>active</span>
            </div>
          )}

          <a href={'/#/things/' + data.id}>
            <img className='img-responsive' src={data.imageUrl || productImg} alt='' />
          </a>
        </div>
        <div className='thingCard__title'>
          <a href={'/things/' + data.id}>{data.name}</a>
          <div className='thingCard__price'>
            {/* <img src={imageType} width='50px' className='img-responsive' alt={data.type} /> */}
          </div>
        </div>
        <div className='thingCard__descr'>{data.description || 'no description'}</div>
      </div>
    )
  }
}

export default ProductCard
