import React, {Component} from 'react';
import {connect} from 'react-redux';
import{mapStateToProps, mapDispathToProps} from '../container';

@connect(
    mapStateToProps,
    mapDispathToProps
)
class updateCate extends Component {
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            description:''
        }
    }
    componentDidMount(){
        console.log('param', this.props)
        //get dl ve (truyền giá trị tham so vào )
        this.props.getCateById(this.props.match.params.id)
    }
    onChange=(e)=>{
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }
    onSave=(e)=>{
        e.preventDefault();
        this.props.updateCategory(this.props.match.params.id,this.state)
    }
    render() {
        var data = this.props.categoryUpdate;
        if(data && data.id !=this.state.id){
            this.setState({
                id:data.id,
                name:data.name,
                description:data.description
            })
        }
        //lấy lại gia trị
        var {name, description} = this.state
        return (
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
        );
    }
}
export default updateCate
