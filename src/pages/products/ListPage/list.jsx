import React from "react"
import { mapStateToProps, mapDispathToProps } from "../container"
import { connect } from "react-redux";
import {Link} from 'react-router-dom';

// styling
import "../../../resources/style.scss"
import "../style.scss"

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ListPage extends React.Component {
  constructor(props){
    super(props)
    this.state={
      keyword:''
    }
  }
  componentDidMount() {
    this.props.listFromStore()
  }
  showProductList = (listProduct = []) => {
    var result = null;
    if (listProduct.length > 0) {
      result = listProduct.map((product, index) => {
        return <tr key={index}>
          <td><b>{product.displayName}</b></td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td> <Link to={'/products/update/'+ product.id} type="button" className="btn">Sửa</Link></td>
          <td> <button type="button" className="btn btn-warning" onClick = {()=>this.onDelete(product.id)}>Xóa</button></td>
        </tr>
      })
      return result;
    }
  }
  onChange=(e)=>{
    let target = e.target;
    let name = target.name;
    let value = target.value;
    console.log("gõ tìm product", value, this.state)
    this.setState({
      [name]:value
    })
  }
  onSearch(keyword){
    this.props.searchProduct(keyword)
  }
  onDelete = (id)=>{
    console.log('id' , id)
    this.props.deleteData(id)
  }
  showPagination = (totalPage = 0) => {
    let pagination = []
    for (let i = 0; i < totalPage; i++) {
      pagination.push(<li key={i} className="page-item" >
        <a className="page-link" href="#" onClick={()=>this.props.listFromStore(i, 'ngu nhu bo')}>{i+1}</a>
      </li>)
    }
    return (<ul className="pagination pagination-lg">
      {pagination}
    </ul>)
  }
  render() {
    var {keyword} = this.state;
    const { totalPage, dataPaging } = this.props;
    return (
      <div className='thing'>
        <section className='card'>
          <div className='card-header'>
            <div className='row'>
              <Link to={'/products/addNew'} type="button" className="btn btn-success">Thêm</Link>
                <div>
                    <input 
                        type="text" 
                        placeholder="Bạn cần tìm..."
                        name="keyword"
                        value={keyword}
                        onChange = {(e)=>this.onChange(e)}
                        onBlur = {()=>this.onSearch(keyword)}
                    />
                    <button type="button" onClick ={()=>{this.onSearch(keyword)}}>Tìm</button>
                </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='row'>
              <table className="table table-hover">
                <thead>
                <tr>
                  <th>Tên</th>
                  <th>Mô tả</th>
                  <th>Giá</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {this.showProductList(dataPaging)}
                </tbody>
              </table>
            </div>
          </div>
          <div className="float-right">
            <nav aria-label="...">
              {this.showPagination(totalPage)}
            </nav>
          </div>
        </section>
      </div>
    )
  }
}

export default ListPage
