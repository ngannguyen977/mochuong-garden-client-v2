import React from 'react'
import { Form, Icon, Input, Button, Upload } from 'antd'

const FormItem = Form.Item

@Form.create()
class SettingsForm extends React.Component {
  state = {}
  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h5 className="text-black mt-4">
          <strong>Personal Information</strong>
        </h5>
        <div className="row">
        <div className="col-lg-6">
            <FormItem>
              <label className="form-label mb-0">FirstName</label>
              {getFieldDecorator('firstName', {
                rules: [{ required: false }],
              })(<Input placeholder="FirstName" />)}
            </FormItem>
          </div>
          <div className="col-lg-6">
            <FormItem>
              <label className="form-label mb-0">LastName</label>
              {getFieldDecorator('lastName', {
                rules: [{ required: false }],
              })(<Input placeholder="LastName" />)}
            </FormItem>
          </div>
          <div className="col-lg-6">
            <FormItem>
              <label className="form-label mb-0">Address</label>
              {getFieldDecorator('address', {
                rules: [{ required: false }],
              })(<Input placeholder="Address" />)}
            </FormItem>
          </div>
          <div className="col-lg-6">
            <FormItem>
              <label className="form-label mb-0">Email</label>
              {getFieldDecorator('email', {
                rules: [{ required: false }],
              })(<Input placeholder="Email" />)}
            </FormItem>
          </div>
        </div>
        <h5 className="text-black mt-4">
          <strong>Phone Numbers</strong>
        </h5>
        <div className="row">
          <div className="col-lg-6">
            <FormItem>
              <label className="form-label mb-0">MasterPhone</label>
              {getFieldDecorator('masterPhone')(<Input placeholder="New MasterPhone" />)}
            </FormItem>
          </div>
          <div className="col-lg-6">
            <FormItem>
              <label className="form-label mb-0">PhoneNumber</label>
              {getFieldDecorator('phoneNumber1')(<Input placeholder="New PhoneNumber" />)}
            </FormItem>
          </div>
          <div className="col-lg-6">
            <FormItem>
              <label className="form-label mb-0">PhoneNumber</label>
              {getFieldDecorator('phoneNumber2')(<Input placeholder="New PhoneNumber" />)}
            </FormItem>
          </div>
        </div>
        <div className="form-actions">
          <Button style={{ width: 150 }} type="primary" htmlType="submit" className="mr-3">
            Submit
          </Button>
          <Button htmlType="submit" onClick={() => this.props.history.push('/customers')}>
            Cancel
          </Button>
        </div>
      </Form>
    )
  }
}

export default SettingsForm
