import { list } from "reducers/product"

export const mapDispathToProps = {
  list: (keyword, limimt, page) => list(keyword, limimt, page)
}
export const mapStateToProps = (state, props) => {
  return {
    product: state.product
  }
}

export default { mapStateToProps, mapDispathToProps }
