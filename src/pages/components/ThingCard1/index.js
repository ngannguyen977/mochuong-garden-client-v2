import React from "react"
import "./style.scss"
import data from "./data.json"
import { Checkbox } from "antd"
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
    const { data, action, permission, isEdit } = this.props

    return (
      <div className='thingCard'>
        <div className='thingCard__img'>
          {productStatus === "new" && (
            <div className='thingCard__status'>
              <span className='thingCard__status__title'>active</span>
            </div>
          )}

          <Link to={"/things/" + data.id}>
            <img className='img-responsive' src={data.imageUrl || productImg} alt='' />
          </Link>
        </div>
        <div className='thingCard__title'>
          <Link to={"/things/" + data.id}>{data.displayName}</Link>
          <div className='thingCard__price'>
            {/* <img src={imageType} width='50px' className='img-responsive' alt={data.type} /> */}
          </div>
        </div>
        <div className='thingCard__descr'>{data.description || "no description"}</div>
        {isEdit && (
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
      </div>
    )
  }
}

export default ProductCard
