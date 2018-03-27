import React from 'react';
import { connect } from 'kea';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Icon, Input } from 'antd';
import Alert from 'common/components/alert';

import authenicationLogic from '../logic';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    const accountId = queryParams.accountId || '';
    this.props.form.setFieldsValue({ accountId });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, form) => {
      if (!err) {
        // If form passed validation check, perform custom form actions here
        const { login } = this.actions;
        login({
          accountId: form.accountId,
          userName: form.userName,
          password: form.password,
          remember: form.remember,
        });
      }
    });
  };

  render() {
    const { isSubmitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { error, errorMessage } = this.props.error;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1>Login</h1>
        <FormItem>
          <Alert
            closable
            message={errorMessage}
            type="error"
            active={error}
          />
        </FormItem>
        <FormItem>
          {getFieldDecorator('accountId', {
            rules: [{ required: true, message: 'Please input your account id!' }],
          })(<Input prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Account Id" />)}
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
          Or <Link to="/auth/register">register now!</Link>
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
