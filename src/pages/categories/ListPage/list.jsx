import React from "react"
import { mapStateToProps, mapDispathToProps } from "../container"
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import ProductCategoriesItem from './product-categories-item'
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
    var { list } = this.props;
    var result = (list||[]).map((category, index) => {
      return (
        <ProductCategoriesItem
          key={index}
          category={category}
        />
      )
    })
    return (
      <div>
        {result}
      </div>
    );
  }
}
export default ListPage 