import React, { Component } from 'react';
import { connect } from "react-redux";
import { mapStateToProps, mapDispathToProps } from "../container";
import Select from 'react-select';

@connect(
    mapStateToProps,
    mapDispathToProps,
)
class addNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            displayName: '',
            description: '',
            price: '',
            quantity: '',
            coverSrcx1: '',
            status: '',
            categoryId: '',
        }
    }
    componentDidMount() {
        this.props.categoriesFromStore();
    }

    onChange = (e) => {
        console.log('target', e.target)
        let target = e.target;
        let name = target.name;
        var value = target.value;
        this.setState({
            //dynamic set 
            [name]: value
        })
    }
    onUpload = (e)=>{
        let photo = e.target.files[0]
        const formData = new FormData();
        formData.append('photo',photo)
        this.props.upload(formData)
    }
    onSave = (e) => {
        console.log('product category', this.state)
        e.preventDefault();
        this.props.add(this.state)

    }
    render() {
        let listCate = this.props.listCate
        let listCategories = []
        if (listCate != undefined) {

            listCategories = listCate.map((category, index) => {
                return <option key={index} value={category.id}>{category.name}</option>
            })
        }
        var { displayName, description, price, quantity, status, categoryId } = this.state
        console.log('sadasd', this.state)
        return (
            <div className="add-form">
                <label >Select a file:</label>
                    <input type="file" id="myfile" name="photo" onChange={this.onUpload}></input>
                <form className="form-horizontal form-label-left"
                    onSubmit={this.onSave}
                >
                    <div className="item form-group">
                        <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="name">Tên sản phẩm</label>
                        <div className="col-md-6 col-sm-6">
                            <input
                                type="text"
                                className="form-control"
                                name="displayName"
                                value={displayName}
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
                    <div className="item form-group">
                        <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="email">Hình ảnh</label>
                        <div className="col-md-6 col-sm-6">
                            <input type="email" name="" data-validate-linked="email" className="form-control" />
                        </div>
                    </div>
                    <div className="item form-group">
                        <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="number">Giá</label>
                        <div className="col-md-6 col-sm-6">
                            <input
                                type="text"
                                name="price"
                                className="form-control"
                                value={price}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="item form-group">
                        <label className="col-form-label col-md-3 col-sm-3 label-align">Số lượng</label>
                        <div className="col-md-6 col-sm-6">
                            <input
                                type="number"
                                name="quantity"
                                className="form-control"
                                value={quantity}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="item form-group">
                        <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="occupation">Trạng thái</label>
                        <div className="col-md-6 col-sm-6">
                            <select
                                name="status"
                                className="form-control"
                                value={status}
                                onChange={(e) => this.onChange(e)}
                            >
                                <option value="" disabled >Vui long chon</option>
                                <option value="Còn hàng">Còn hàng</option>
                                <option value="hết hàng">Hết hàng</option>
                            </select>

                        </div>
                    </div>
                    <div className="item form-group">
                        <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="occupation">Trạng thái</label>
                        <div className="col-md-6 col-sm-6">
                            <select
                                name="categoryId"
                                className="form-control"
                                value={categoryId}
                                onChange={(e) => this.onChange(e)}
                            >
                                {listCategories}
                            </select>

                        </div>
                    </div>
                    <div className="ln_solid"></div>

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

export default addNew;
