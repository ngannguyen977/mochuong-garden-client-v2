import React from "react"
import { mapStateToProps, mapDispatchToProps } from "../container"
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import ProductPageItem from './product-page-item';
import "./product-page.scss"

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class ListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }
  componentDidMount() {
    this.props.listFromStore()
  }
  showProductPage = (listProduct = []) => {
    var result = null;
    if (listProduct.length > 0) {
      result = listProduct.map((product, index) => {
        //item này sẽ được nhận lại trong product item
        return <ProductPageItem
          key={index}
          product={product}
        />
      })
    }
    return result;

  }
  showPagination = (totalPage = 0) => {
    let pagination = []
    for (let i = 0; i < totalPage; i++) {
      pagination.push(<li key={i} className="page-item" >
        <p className="page-link" onClick={() => this.props.listFromStore(i)}>{i + 1}</p>
      </li>)
    }
    return (<ul className="pagination pagination-lg">
      {pagination}
    </ul>)
  }
  render() {
    const { pageIndex, totalPage, dataPaging } = this.props;
    let pagination = []
    for (let i = 0; i < totalPage; i++) {
      pagination.push(<li key={i} className={pageIndex === i ? "active" : "inactive"}>
        {/* <a onClick={()=>this.props.getProductPageListFromStore(categoryId,i)}>{i+1}</a> */}
      </li>)
    }
    return (
      <div>
        <div className="container">
          {this.showProductPage(dataPaging)}
        </div>
        <nav aria-label="Page navigation">
          {this.showPagination(totalPage)}
        </nav>
      </div>
    );
  }
}

export default ListPage
