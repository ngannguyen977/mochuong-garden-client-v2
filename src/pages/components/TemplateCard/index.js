import React from 'react'
import './style.scss'
import data from './data.json'
import { Button, Icon, Popconfirm, message } from 'antd'
import { Link } from 'react-router-dom'

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
      <div className='templateCard'>
        <div className='templateCard__img'>
          {productStatus === 'new' && (
            <div className='templateCard__status'>
              <span className='templateCard__status__title'>active</span>
            </div>
          )}

          <Link to={'/templates/' + data.id}>
            <img className='img-responsive' src={data.imageUrl || productImg} alt='' />
          </Link>
        </div>
        <div className='templateCard__title'>
          <Link to={'/templates/' + data.id}>{data.name}</Link>
          <div className='templateCard__price'>
            {/* <img src={imageType} width='50px' className='img-responsive' alt={data.type} /> */}
          </div>
        </div>
        <div className='templateCard__descr'>{data.description || 'no description'}</div>
        <div className='templateCard__btn-control'>
          <Icon
            type='edit'
            theme='filled'
            className='templateCard__btn btn-edit'
            onClick={() => this.props.push('/templates/' + data.id)}
          >
            Edit
          </Icon>
          <Popconfirm
            title='Are you sure delete this template? It cannot be undone.'
            onConfirm={() => remove(data.id)}
            onCancel={() => message.info('cancel deleted')}
            okText='Yes, I confirm'
            cancelText="No, I don't"
          >
            <Icon type='delete' theme='filled' className='templateCard__btn btn-remove'>
              Remove
            </Icon>
          </Popconfirm>
        </div>
      </div>
    )
  }
}

export default ProductCard
