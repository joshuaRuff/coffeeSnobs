import React from 'react';
import { Button, Input } from 'semantic-ui-react';

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
        Forgot
        <Input
          hintText="Enter your Email"
          floatingLabelText="example@domain.com"
          onChange={(event, newValue) => this.setState({ username: newValue })}
        />
        <br />
        <br />
        <Button primary onClick={event => this.forgot(event)}>
          Submit
        </Button>
      </div>
    );
  }
}
