import React from 'react';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  forgot(event) {
    const url = `${this.props.apiUrl}/users/forgot`;
    const payload = {
      email: this.state.username,
    };
    this.props.forgot(url, payload);
  }

  render() {
    return (
      <div>
        <AppBar
          title="Forgot"
        />
        <TextField
          hintText="Enter your Email"
          floatingLabelText="example@domain.com"
          onChange = {(event, newValue) => this.setState({ username: newValue })}
        />
        <br/>
        <br/>
        <RaisedButton
          label="Submit"
          primary
          onClick={event => this.forgot(event)}
        />
      </div>
    );
  }
}
