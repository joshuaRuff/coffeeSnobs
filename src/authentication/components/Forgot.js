import React from 'react';
import { Alert, Button, Form, Icon, Input } from 'antd';

import './login.scss';
import authenicationLogic from '../logic';

const FormItem = Form.Item;

@authenicationLogic
class ForgotForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.actions.forgot(values.userName);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isSubmitting } = this.props;
    const { error, errorMessage } = this.props.error;
    const { message } = this.props.forgot;

    const errorAlert = (error) ?
      (<Alert
        message={errorMessage}
        type="error"
        closable
      />) : null;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {errorAlert}
        </FormItem>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
        </FormItem>
        {message}
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Reset Password!'}
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
        {error}
      </Form>
    );
  }

}

const WrappedForgotForm = Form.create()(ForgotForm);

export default WrappedForgotForm;
