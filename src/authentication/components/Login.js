import React from 'react';
// import { AppBar, RaisedButton, TextField, CircularProgress } from 'material-ui';
// import { users } from 'common/api';

// import { getToken } from '../functions';
//
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const LoginForm = () => (
  <div className="login-form">
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo.png" /> Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" />

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);

export default LoginForm;

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
