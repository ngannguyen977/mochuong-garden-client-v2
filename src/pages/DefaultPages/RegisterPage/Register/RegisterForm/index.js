import React from 'react'
import { Form, Input, Icon, Checkbox, Button } from 'antd'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispathToProps } from './container'

const FormItem = Form.Item
@connect(
  mapStateToProps,
  mapDispathToProps,
)
class RegisterFormComponent extends React.Component {
  state = {
    confirmDirty: false,
    loading: false,
  }

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  // $FlowFixMe
  onSubmit = isSubmitForm => event => {
    event.preventDefault()
    const { form, submit } = this.props
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
    if (value && value !== form.getFieldValue('password')) {
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
  enterLoading = () => {
    this.setState({ loading: true })
  }
  render() {
    const { getFieldDecorator, isSubmitForm } = this.props.form
    return (
      <Form hideRequiredMark onSubmit={this.onSubmit(isSubmitForm)} className='login-form'>
        <FormItem
        validateStatus='validating'
        className='col-md-12'
        extra='alias or username should be a simple name. ex: onsky.'
        >
          {getFieldDecorator('alias', {
            rules: [{ required: true, message: 'Please input your Alias name!' }],
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Alias or Username'
              />,
          )}
        </FormItem>
        <FormItem
          validateStatus='validating'
          className='col-md-6'
          style={{ display: 'inline-block' }}
        >
          {getFieldDecorator('first_name', {
            rules: [{ required: true, message: 'Please input your First name!' }],
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='First name'
            />,
          )}
        </FormItem>
        <FormItem
          validateStatus='validating'
          className='col-md-6'
          style={{ display: 'inline-block' }}
        >
          {getFieldDecorator('last_name', {
            rules: [{ required: true, message: 'Please input your Last name!' }],
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Last name'
            />,
          )}
        </FormItem>
        <FormItem
          validateStatus='validating'
          className='col-md-6'
          style={{ display: 'inline-block' }}
        >
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: 'The input is not a valid e-mail address' },
              { required: true, message: 'Please input your Email!' },
            ],
          })(
            <Input
              prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Email'
            />,
          )}
        </FormItem>
        <FormItem
          validateStatus='validating'
          className='col-md-6'
          style={{ display: 'inline-block' }}
        >
          {getFieldDecorator('mobile', {
            rules: [{ required: true, message: 'Please input your Phone number!' }],
          })(
            <Input
              prefix={<Icon type='phone' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='(028) 2253 8650'
            />,
          )}
        </FormItem>
        <FormItem className='col-md-6' style={{ display: 'inline-block' }}>
          {getFieldDecorator('password', {
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
              placeholder='Input your password'
            />,
          )}
        </FormItem>
        <FormItem className='col-md-6' style={{ display: 'inline-block' }}>
          {getFieldDecorator('password_confirm', {
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
              onBlur={this.handleConfirmBlur}
              placeholder='Confirm your password'
            />,
          )}
        </FormItem>
        <FormItem className='col-md-12' style={{ display: 'inline-block',marginBottom:'-20px' }}>
          {getFieldDecorator('policy', {
            rules: [
              {
                required: true,
              }
            ],
          })(
            <Checkbox>I have read the <a href='#'>agreement</a></Checkbox>
          )}
        </FormItem>
        <div className='form-actions'>
          <Button
            type='primary'
            className='login-form-button'
            htmlType='submit'
            loading={isSubmitForm}
            icon='check-circle'
          >
            Sign Up
          </Button>
          <span className='ml-3 register-link'>
            <Link to='/login' className='text-primary utils__link--underlined'>
              Sign in
            </Link>{' '}
            if you already account
          </span>
        </div>
      </Form>
    )
  }
}

const RegisterForm = Form.create()(RegisterFormComponent)
export default RegisterForm
