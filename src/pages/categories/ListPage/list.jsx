import React from "react"
import { mapStateToProps, mapDispathToProps } from "../container"
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
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
   componentDidMount(){
	   this.props.categoriesFromStore();
	  //  this.setState({
		//    inputValue: this.props.inputValue
		// });
   }


	// componentDidMount() {
	// 	this.setState({inputValue: this.props.inputValue});
	// }
	// handleChange = (e) => {
	// this.setState({inputValue: e.target.value});
	// }
	
	// <input value={this.state.inputValue} onChange={this.handlechange} onBlur={() => this.props.actions.updateInput(this.state.inputValue)} />


   showCategoryList= (listCategories=[])=>{
    var result = null;
    if(listCategories.length>0){
        result = listCategories.map((category, index)=>{
            return <tr key={index}>
            <td><b>{category.id}</b></td>
            <td>{category.name}</td>
            <td> <Link to={'/categories/update/' + category.id} type="button" className="btn">Sửa</Link></td>
            <td> <button type="button" className="btn btn-warning" onClick = {()=>this.onDelete(category.id)}>Xóa</button></td>
          </tr>
        })
        return result;
    }
   }
   onChange =(e)=>{
		
		let target = e.target;
		let name = target.name;
		let value = target.value;
		console.log("gõ", value, this.state)
		this.setState({
			[name]: value
			// keyword: e.target.value //cách viết khác
		})
   }
   onDelete=(id)=>{
     this.props.deleteCategory(id);
   }
   onSearch(keyword){
	   this.props.searchCategory(keyword)
	   console.log("nnnnnnnn",keyword)
   }
    render() {
		var {keyword} = this.state;
		console.log("set state", this.state)
        const {dataPaging} = this.props;
        console.log('datapaging cagote', dataPaging)
        return (
            <div className='category-page'>
            <section className='card'>
              <div className='card-header'>
                <div className='row'>
                  <Link to={'/categories/addNew'} type="button" className="btn btn-success">Thêm</Link>
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