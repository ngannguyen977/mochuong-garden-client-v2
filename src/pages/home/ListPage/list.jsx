import React from "react"
import { mapStateToProps, mapDispatchToProps } from "../container"
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import CategoryPage from '../../categories'
import ProductPage from '../../products'
// import banner from "/img/main-banner.jpg";
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class ListPage extends React.Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="home-page">
        <div className="banner"></div>
        <div className="">
          <img className="img-responsive" src='/img/main-banner.jpg' alt="" />
          <div className="container product-categories">
            <CategoryPage />
          </div>
          <div className="container">
            <ProductPage />
          </div>
        </div>
      </div>
    );
  }
}
export default ListPage 