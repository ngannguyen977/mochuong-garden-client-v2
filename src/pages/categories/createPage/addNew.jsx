import React, { Component } from 'react';
import { connect } from "react-redux";
import { mapStateToProps, mapDispathToProps } from "../container"
@connect(
    mapStateToProps,
    mapDispathToProps,
)

class AddNew extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            name:'',
            description:''
        }
       
    }
    componentDidMount(){
        this.props.categoriesFromStore();
    }
    onChange = (e)=>{
        let target=e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]:value
        })
    }
    onSave = (e)=>{
        console.log('onsave')
        e.preventDefault();
        this.props.addCategory(this.state);
        
    }
    render() {
        
        var{id, name, description } = this.state
        return (
            <div className="add-form">
            <form className="form-horizontal form-label-left"
                onSubmit={this.onSave}>
                <div className="item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="name">Tên sản phẩm</label>
                    <div className="col-md-6 col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={this.onChange}
                        />
                    </div>
                </div>

                <div className="item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="textarea">Mô tả</label>
                    <div className="col-md-6 col-sm-6">
                        <textarea
                            name="description"
                            className="form-control"
                            value={description}
                            onChange={this.onChange}
                        ></textarea>
                    </div>
                </div>
               
                <div className="form-group">
                    <div className="col-md-6 offset-md-3">
                        <button type="submit" className="btn btn-primary">Lưu</button>
                        <button id="send" type="submit" className="btn btn-success">Hủy bỏ</button>
                    </div>
                </div>
            </form>
        </div>
        );
    }
}
export default AddNew;