import React from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispathToProps } from './container'
import { Form, Input, Button } from 'antd'


@connect(
  mapStateToProps,
  mapDispathToProps,
)
@Form.create()
class RecoveryForm extends React.Component {
  static defaultProps = {}

  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, submit, params } = this.props
    console.log(this.props.submit)
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        console.log(params)
        submit({ alias: params.alias, username: params.username, newPassword: values.newPassword, confirmPassword:values.confirmPassword, token: params.token })
        // submit({ alias: 'alias', 'username', 'newPassword', 'confirmPassword', 'token'})
        // console.log('Received values of form: ', values);
      }
    });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };


  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form
        layout='vertical'
        hideRequiredMark
        onSubmit={this.handleSubmit}
        className='recovery-password-form'
      >
        <Form.Item label="New Password" hasFeedback>
          {getFieldDecorator('newPassword', {
            rules: [
              {
                min: 5,
                message: 'Your password must be at least 5 characters.'
              },
              {
                max: 10,
                message: 'Max password length is 10 characterd.'
              },
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(
            <Input.Password 
            />
          )}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirmPassword', {
            rules: [
              {
                min: 5,
                message: 'Your password must be at least 5 characters.'
              },
              {
                max: 10,
                message: 'Max password length is 10 characterd.'
              },
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <div className='text-center'>
          <Button
            type='primary'
            className='login-form-button'
            htmlType='submit'
            icon='safety-certificate'
          >
            Reset Password
          </Button>
        </div>
      </Form>
    )
  }
}

export default RecoveryForm
