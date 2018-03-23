import React from 'react';
import { connect } from 'kea';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import Alert from 'common/components/alert';

import authenicationLogic from '../logic';

const FormItem = Form.Item;

class RegisterForm extends React.Component {

  constructor() {
    super();
    this.state = {
      confirmDirty: false,
    };
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, form) => {
      if (!err) {
        // If form passed validation check, perform custom form actions here
        this.actions.register(form);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isSubmitting } = this.props;
    const { error, errorMessage } = this.props.error;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1>Register</h1>
        <FormItem>
          <Alert
            closable
            message={errorMessage}
            type="error"
            active={error}
          />
        </FormItem>
        <FormItem label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Password">
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your password!' },
              { validator: this.validateToNextPassword },
            ],
          })(<Input type="password" />)}
        </FormItem>
        <FormItem
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: 'Please confirm your password!' },
              { validator: this.compareToFirstPassword },
            ],
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
        <FormItem label="First Name">
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
          })(<Input />)}
        </FormItem>
        <FormItem label="Last Name">
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
          })(<Input />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register!'}
          </Button>
          Or <Link to="/auth/login">login!</Link>
        </FormItem>
      </Form>
    );
  }

}

const keaLogic = {
  props: [authenicationLogic, ['isSubmitting', 'error', 'login']],
  actions: [authenicationLogic, ['register']],
};

// Important to connect kea to the component before we pass it onto antd.
// Antd doesn't forward everything, like this.actions to the component
const WrappedNormalLoginForm = Form.create()(connect(keaLogic)(RegisterForm));

export default WrappedNormalLoginForm;
