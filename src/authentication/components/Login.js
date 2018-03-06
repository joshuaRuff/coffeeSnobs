import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './Login.scss';
// import { users } from 'common/api';

// import { getToken } from '../functions';
//

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
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
          <a className="login-form-forgot" href="/auth/forgot">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;

// export default class Login extends React.Component {
//   constructor(props) {
//     console.log('Login Component');
//     super(props);
//     this.state = {
//       error: '',
//       loading: false,
//       password: '',
//       username: '',
//     };
//   }
//
//   render() {
//     return <h1>Login Route</h1>;
//   }

// componentWillMount() {
//   // Check if token exists, if it does and is not expired, login user in.
//   const token = getToken();
//   if (token) {
//     this.props.autologin(token.sessionToken, token.sessionExpires);
//     this.props.history.push('/');
//   }
// }

// componentWillReceiveProps(nextProps) {
//   // Once action goes through and it succesfully got a token, change route to app
//   this.setState({ loading: false });
//   if (nextProps.error) {
//     this.setState({ error: this.props.error });
//   }
//   if (nextProps.token) {
//     this.props.history.push('/');
//   }
// }

// login(event) {
//   const url = `${this.props.apiUrl}/user/${this.props.accountId}/login`;
//   const payload = {
//     username: this.state.username,
//     password: this.state.password,
//   };
//   this.setState({ loading: true });
//   this.props.login(url, payload);
// }

// render() {
//   const loading = this.state.loading ? <CircularProgress size={80} thickness={5} /> : '';
//   const error = this.props.error || '';
//   return (
//     <div>
//       <AppBar title="Login" />
//       <TextField
//         hintText="Enter your Username"
//         floatingLabelText="Username"
//         onChange={(event, newValue) => this.setState({ username: newValue })}
//       />
//       <br />
//       <TextField
//         type="password"
//         hintText="Enter your Password"
//         floatingLabelText="Password"
//         onChange={(event, newValue) => this.setState({ password: newValue })}
//       />
//       <br />
//       <RaisedButton label="Submit" primary disabled={this.state.loading} onClick={event => this.login(event)} />
//       {loading}
//       {error}
//     </div>
//   );
// }
// }
