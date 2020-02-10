import React from 'react'
import { Form, Input,Button,message } from 'antd';
import {Link} from 'react-router-dom'

const CustomizedForm = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      masterPhone: Form.createFormField({
        ...props.masterPhone,
        value: props.masterPhone.value,
      }),
      phoneNumber1: Form.createFormField({
        ...props.phoneNumber1,
        value: props.phoneNumber1.value,
      }),
      phoneNumber2: Form.createFormField({
        ...props.phoneNumber2,
        value: props.phoneNumber2.value,
      }),
    };
  },
  // onValuesChange(_, values) {
  //   console.log(values);
  // },
  handleSubmit(data){
    console.log(data);
  },
  onSubmit(e){
    console.log('submit');
  }
})(props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form className="login-form">
        <h5 className="text-black mt-4">
          <strong>Personal Information</strong>
        </h5>
        <div className="row">
          <div className="col-lg-6">
            <Form.Item>
              <label className="form-label mb-0">Master Phone Number</label>
              {getFieldDecorator('masterPhone')(<Input addonBefore="+84" placeholder="New Master Phone Number" />)}
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item>
              <label className="form-label mb-0">Phone Number 1</label>
              {getFieldDecorator('phoneNumber1')(<Input addonBefore="+84" placeholder="New Phone Number 1" />)}
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item>
              <label className="form-label mb-0">Phone Number 2</label>
              {getFieldDecorator('phoneNumber2')(<Input addonBefore="+84" placeholder="New Phone Number 2" />)}
            </Form.Item>
          </div>
        </div>
        <div className="form-actions">
          <Button style={{ width: 150 }} type="primary" onClick={()=>props.onSubmit()} className="mr-3" >
            Submit
          </Button>
          <Link to={'/customers'}>
            Cancel
          </Link>
        </div>
    </Form>
  );
});

class SettingsForm extends React.Component {
  constructor(){
    super()
    this.state = {
      fields: {
          masterPhone: {
            value: ''
          },
          phoneNumber1:  {
            value: ''
          },
          phoneNumber2:  {
            value: ''
          },
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount(){
    const {phone,onSubmit} = this.props
    if(phone){
      this.setState(({ fields }) => ({
        fields: phone,
      }));
    }
  }

  handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  };
  handleSubmit(){
    const {fields} = this.state
    if (fields.masterPhone.value === ''){
      message.warn(`Please input at least master phone number`)
      return 
    }
    if(fields.masterPhone.value.length!= 9){
      message.warn(`Invalid phone number ${fields.masterPhone.value}`)
      return 
    }
    if(fields.phoneNumber1.value!= '' && fields.phoneNumber1.value.length!= 9){
      message.warn(`Invalid phone number ${fields.phoneNumber1.value}`)
      return 
    }
    if(fields.phoneNumber2.value!= '' && fields.phoneNumber2.value.length!= 9){
      message.warn(`Invalid phone number ${fields.phoneNumber2.value}`)
      return 
    }
    
    this.props.updatePhones(fields.masterPhone.value,fields.phoneNumber1.value,fields.phoneNumber2.value)
  }
  render() {
    const { fields } = this.state;
    return (
      <div>
        <CustomizedForm {...fields} onChange={this.handleFormChange} onSubmit={this.handleSubmit}/>
        {/* <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre> */}
      </div>
    );
  }
}

export default SettingsForm