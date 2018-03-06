import React from 'react';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  register(event) {
    const url = `${this.props.apiUrl}/users/login`;
    const payload = {
      email: this.state.username,
      password: this.state.password,
    };
    this.props.register(url, payload);
  }

  render() {
    return (
      <div>
        <AppBar
          title="Register"
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
          onClick={event => this.register(event)}
        />
      </div>
    );
  }
}
