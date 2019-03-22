import React from "react"
import "./style.scss"
import data from "./data.json"
import { Checkbox } from "antd"

class ProductCard extends React.Component {
  state = {
    productImg: data.productImg,
    productStatus: data.productStatus,
  }

  render() {
    const { productImg, productStatus } = this.state

    const { data, isEdit, permission, action } = this.props
    return (
      <div className="thingCard">
        <div className="thingCard__img">
          {productStatus === "new" && (
            <div className="thingCard__status">
              <span className="thingCard__status__title">active</span>
            </div>
          )}
          <a href={"/#/things/" + data.name}>
            <img className="img-responsive" src={data.imageUrl || productImg} alt="" />
          </a>
        </div>
        <div className="thingCard__title">
          <a href={"/#/things/" + data.name}>{data.displayName}</a>
          <div className="thingCard__price" />
        </div>
        <div className="thingCard__descr">{data.serial || "no description"}</div>
        {isEdit && (
          <div className="thingCard__btn-control">
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
