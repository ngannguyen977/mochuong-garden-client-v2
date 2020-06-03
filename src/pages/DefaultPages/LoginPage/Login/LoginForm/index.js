import React from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from './container'
import { Alert, notification } from 'antd'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const FormItem = Form.Item

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@Form.create()
class LoginForm extends React.Component {
 constructor(){
   super()
   this.state ={
   }
 }

  // $FlowFixMe
  onSubmit = (isSubmitForm: ?boolean) => event => {

    event.preventDefault()
    const { form, submit,params } = this.props
    if (!isSubmitForm) {
      form.validateFields((error, values) => {
        if (!error) {
          submit(values,params)
        }
      })
    }
  }

  render() {
    const { getFieldDecorator, isSubmitForm } = this.props.form
    return (
      <Form
        layout='vertical'
        hideRequiredMark
        onSubmit={this.onSubmit(isSubmitForm)}
        className='login-form'
      >
           <FormItem>
          <label className='form-label mb-0'>Customer</label>
          {getFieldDecorator('customer', {
            initialValue: '',
            rules: [{ required: true, message: 'Please input your customer email!' }],
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='customer'
            />,
          )}
        </FormItem>
        <FormItem>
          <label className='form-label mb-0'>Username</label>
          {getFieldDecorator('userName', {
            initialValue: '',
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Username'
            />,
          )}
        </FormItem>
        <FormItem>
          <label className='form-label mb-0'>Password</label>
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Password'
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Link to='/forgot-password' className='login-form-forgot text-primary pull-right'>
              Forgot password?
          </Link>
        </FormItem>
        <div className='form-actions'>
          <Button
            type='primary'
            className='login-form-button'
            htmlType='submit'
            loading={isSubmitForm}
            icon='check-circle'
          >
            Sign in
          </Button>
          <span className='ml-3 register-link'>
            <Link to='/register' className='text-primary utils__link--underlined'>
              Register
            </Link>{' '}
            if you don't have account
          </span>
        </div>
        <div className='form-group'>
          <span>Use another service to Log In</span>
          <div className='mt-2'>
            <a href='#;' className='btn btn-icon mr-2'>
              <i className='icmn-facebook' />
            </a>
            <a href='#;' className='btn btn-icon mr-2'>
              <i className='icmn-google' />
            </a>
            <a href='#;' className='btn btn-icon mr-2'>
              <i className='icmn-windows' />
            </a>
            <a href='#;' className='btn btn-icon mr-2'>
              <i className='icmn-twitter' />
            </a>
          </div>
        </div>
      </Form>
    )
  }
}

export default LoginForm
