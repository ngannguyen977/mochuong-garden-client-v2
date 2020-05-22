import React from "react"
import { mapStateToProps, mapDispathToProps } from "../container"
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import CategoriePage from '../../categories'
import ProductPage from '../../products'
// import banner from "/img/main-banner.jpg";
@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ListPage extends React.Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    this.props.categoriesFromStore();
  }
  render() {
    return (
      <div className="home-page">
        <div className="banner"></div>
        <div className="container">
          <img className="img-responsive" src='/img/main-banner.jpg' alt="" />
          <div className="product-categories">
            <CategoriePage />
          </div>
          <div>
            <ProductPage />
          </div>
        </div>
      </div>
    );
  }
}
export default ListPage 