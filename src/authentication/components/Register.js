import React from 'react';
import { Button, Input } from 'semantic-ui-react';

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
        <Input
          hintText="Enter your Username"
          floatingLabelText="Username"
          onChange={(event, newValue) => this.setState({ username: newValue })}
        />
        <br />
        <Input
          type="password"
          hintText="Enter your Password"
          floatingLabelText="Password"
          onChange={(event, newValue) => this.setState({ password: newValue })}
        />
        <br />
        <Button primary label="Submit" onClick={event => this.register(event)} />
      </div>
    );
  }
}
