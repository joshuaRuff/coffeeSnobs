import React from 'react';
import { connect } from 'kea';
import { Link } from 'react-router-dom';
import { Alert, Button, Checkbox, Form, Icon, Input } from 'antd';

import './login.scss';
import authenicationLogic from '../logic';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

  componentWillMount() {
    // Check if token exists, if it does and is not expired, login user in.
    const token = this.getToken();
    if (token) {
      this.actions.setLogin(token.token, token.expires);
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    // Once action goes through and it succesfully got a token, change route to app
    if (nextProps.login.token) {
      this.props.history.push('/');
    }
  }

  getToken = () => {
    // Check localstorage if a token exists
    const { token, expires } = localStorage;

    if (token && expires && this.checkTime(expires)) {
      // If token hasn't expired, return it
      return { token, expires };
    }
    return false;
  }

  checkTime = (dateString) => {
    if (dateString) {
      try {
        const now = Date.now();
        const expires = new Date(dateString).getTime();
        if (now < expires) { return true; }
      } catch (err) {
        return false;
      }
    }
    return false;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, form) => {
      if (!err) {
        // If form passed validation check, perform custom form actions here
        const { login } = this.actions;
        login(form.userName, form.password, form.remember);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isSubmitting } = this.props;
    const { error, errorMessage } = this.props.error;

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
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Link className="login-form-forgot" to="/auth/forgot">
            Forgot password
          </Link>
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={isSubmitting}>
            Log in {isSubmitting ? 'Submitting...' : 'Submit!'}
          </Button>
          Or <Link to="/register">register now!</Link>
        </FormItem>
      </Form>
    );
  }

}

const keaLogic = {
  props: [authenicationLogic, ['isSubmitting', 'error', 'login']],
  actions: [authenicationLogic, ['setLogin', 'login']],
};

// Important to connect kea to the component before we pass it onto antd.
// Antd doesn't forward everything, like this.actions to the component
const WrappedNormalLoginForm = Form.create()(connect(keaLogic)(NormalLoginForm));

export default WrappedNormalLoginForm;
