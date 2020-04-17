import React from "react"
import { mapStateToProps, mapDispathToProps } from "../container"
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
@connect(
    mapStateToProps,
    mapDispathToProps,
)
class ListPage extends React.Component {
   componentDidMount(){
       this.props.categoriesFromStore()
   }
   showCategoryList= (listCategories=[])=>{
    var result = null;
    if(listCategories.length>0){
        result = listCategories.map((category, index)=>{
            return <tr key={index}>
            <td><b>{category.id}</b></td>
            <td>{category.name}</td>
            <td> <button type="button" className="btn" on>Sửa</button></td>
            <td> <button type="button" className="btn btn-warning" onClick = {()=>this.onDelete(category.id)}>Xóa</button></td>
          </tr>
        })
        return result;
    }
   }
   onDelete(id){
     this.props.deleteCategory(id);
   }
    render() {
        const {dataPaging} = this.props;
        console.log('datapaging cate', dataPaging)
        return (
            <div className='category-page'>
            <section className='card'>
              <div className='card-header'>
                <div className='row'>
                  <Link to={'/categories/addNew'} type="button" className="btn btn-success">Thêm</Link>
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
                    {this.showCategoryList(dataPaging)}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="float-right">
                <nav aria-label="...">
                  {/* {this.showPagination(totalPage)} */}
                </nav>
              </div>
            </section>
          </div>
        );
    }
}
export default ListPage 