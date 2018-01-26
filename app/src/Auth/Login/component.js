import React from 'react';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  login(event) {
    const url = `${this.props.apiUrl}/users/login`;
    const payload = {
      email: this.state.username,
      password: this.state.password,
    };
    this.props.login(url, payload);
  }

  render() {
    return (
      <div>
        <AppBar
          title="Login"
        />
        <TextField
          hintText="Enter your Username"
          floatingLabelText="Username"
          onChange = {(event, newValue) => this.setState({ username: newValue })}
        />
        <br/>
        <TextField
          type="password"
          hintText="Enter your Password"
          floatingLabelText="Password"
          onChange = {(event, newValue) => this.setState({ password: newValue })}
        />
        <br/>
        <RaisedButton
          label="Submit"
          primary
          onClick={event => this.login(event)}
        />
      </div>
    );
  }
}
