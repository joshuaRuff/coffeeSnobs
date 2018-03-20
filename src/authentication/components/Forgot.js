import React from 'react';
import { connect } from 'kea';
import { Link } from 'react-router-dom';
import { Alert, Button, Form, Icon, Input } from 'antd';

import './login.scss';
import authenicationLogic from '../logic';

const FormItem = Form.Item;

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

    const errorAlert = (error) ?
      (
        <Alert
          message={errorMessage}
          type="error"
          closable
        />
      ) : null;

    const message = (this.props.forgot.message) ?
      <Link to="/auth/login">{this.props.forgot.message}. Go back to login</Link> : null;

    const successAlert = (message) ?
      (
        <Alert
          message={message}
          type="success"
          closable
        />
      ) : null;

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
        <FormItem>
          {successAlert}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Reset Password!'}
          </Button>
          Or <Link to="/auth/register">register now!</Link>
        </FormItem>
      </Form>
    );
  }

}

const keaLogic = {
  props: [authenicationLogic, ['isSubmitting', 'error', 'login', 'forgot']],
  actions: [authenicationLogic, ['forgot']],
};

// Important to connect kea to the component before we pass it onto antd.
// Antd doesn't forward everything, like this.actions to the component
const WrappedForgotForm = Form.create()(connect(keaLogic)(ForgotForm));

export default WrappedForgotForm;
