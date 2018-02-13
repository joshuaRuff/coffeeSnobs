import React from 'react';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import { getToken } from '../../common/functions';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loading: false,
      password: '',
      username: '',
    };
  }

  componentWillMount() {
    // Check if token exists, if it does and is not expired, login user in.
    const token = getToken();
    if (token) {
      this.props.autologin(token.sessionToken, token.sessionExpires);
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    // Once action goes through and it succesfully got a token, change route to app
    this.setState({ loading: false });
    if (nextProps.error) { this.setState({ error: this.props.error }); }
    if (nextProps.token) { this.props.history.push('/'); }
  }

  login(event) {
    const url = `${this.props.apiUrl}/user/${this.props.accountId}/login`;
    const payload = {
      username: this.state.username,
      password: this.state.password,
    };
    this.setState({ loading: true });
    this.props.login(url, payload);
  }

  render() {
    const loading = (this.state.loading) ? <CircularProgress size={80} thickness={5} /> : '';
    const error = this.props.error || '';
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
          disabled={this.state.loading}
          onClick={event => this.login(event)}
        />
        {loading}
        {error}
      </div>
    );
  }
}
