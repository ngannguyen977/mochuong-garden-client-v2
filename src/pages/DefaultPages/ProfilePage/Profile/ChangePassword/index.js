import React from 'react'
import { Form, Input, Icon, Checkbox, Button } from 'antd'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
const FormItem = Form.Item

class RegisterFormComponent extends React.Component {
  state = {
    confirmDirty: false,
    loading: false,
    userId: 0,
    password: "",
    newPassword: "",
    confirmPassword: "",
    onChange: function() {}
  }

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  // $FlowFixMe
  onSubmit = isSubmitForm => event => {
    event.preventDefault()
    const { form, submit } = this.props
    console.log(this.props)
    if (!isSubmitForm) {
      form.validateFields((error, values) => {
        if (!error) {
          submit(values)
        }
      })
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const { getFieldDecorator, isSubmitForm } = this.props.form
    return (
      <Form hideRequiredMark onSubmit={this.onSubmit(isSubmitForm)} className='login-form'>
        <FormItem
          validateStatus='validating'
          className='col-md-12'
          extra='Enter your old password.'
        >
          {getFieldDecorator('oldPassword', {
            rules: [{ required: true, message: 'Please input your old password!' }],
          })(
            <Input
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Enter your old password.'
              type='password'
            />,
          )}
        </FormItem>
        <FormItem
        className='col-md-12'
        style={{ display: 'inline-block' }}
        extra='Enter your new password.'
        >
          {getFieldDecorator('newPassword', {
            rules: [
              {
                required: true,
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Enter your New password.'
            />,
          )}
        </FormItem>
        <FormItem
        className='col-md-12'
        style={{ display: 'inline-block' }}
        extra='Confirm your new password.'
        >
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input
              type='password'
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              onBlur={this.handleConfirmBlur}
              placeholder='Confirm your new password'
            />,
          )}
        </FormItem>
        <div className='form-actions text-center'>
          <Button
            type='primary'
            className='login-form-button'
            htmlType='submit'
            loading={isSubmitForm}
            icon='check-circle'
          >
            Update
          </Button>

        </div>
      </Form>
    )
  }
}

const RegisterForm = Form.create()(RegisterFormComponent)
export default RegisterForm
