import React from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from './container'
// import { Alert, notification } from 'antd'
import { Form, Icon, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
// import reducers from '../../../../../reducers/index'

const FormItem = Form.Item

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@Form.create()
class ForgotForm extends React.Component {
  static defaultProps = {}

  // $FlowFixMe
  onSubmit = (isSubmitForm: ?boolean) => event => {
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

  render() {
    const { getFieldDecorator, isSubmitForm } = this.props.form
    return (
      <Form
        layout='vertical'
        hideRequiredMark
        onSubmit={this.onSubmit(isSubmitForm)}
        className='forgot-password-form'
      >
        {/* <FormItem>
          <label className='form-label mb-0'>Alias</label>
          {getFieldDecorator('alias', {
            initialValue: '',
            rules: [
              { type: 'string', message: 'The input is not valid' }
            ]
          })(
            <Input
              prefix={<Icon type='team' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Alias'
            />,
          )}
        </FormItem> */}
        <FormItem>
          <label className='form-label mb-0'>Username <span style={{ color: 'red'}}>*</span></label>
          {getFieldDecorator('username', {
            initialValue: '',
            rules: [
              { type: 'email', message: 'The input is not a valid e-mail address' },
              { required: true, message: 'Please input your username!' }
            ],
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Username'
            />,
          )}
        </FormItem>
        <div className='text-center'>
          <Link to='/login'>
            <Button className='mx-2'>
              <Icon type="left" />
              Back to login
            </Button>
          </Link>
          <Button
            type='primary'
            className='login-form-button mx-2'
            htmlType='submit'
            loading={isSubmitForm}
            icon='check-circle'
          >
            Reset Password
          </Button>
        </div>
      </Form>
    )
  }
}

export default ForgotForm
