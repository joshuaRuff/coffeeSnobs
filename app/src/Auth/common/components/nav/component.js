import React from 'react';
import { NavLink } from 'react-router-dom';

export default class TopNav extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/auth/login">Login</NavLink>
        <NavLink to="/auth/forgot">Reset Password</NavLink>
        <NavLink to="/auth/register">Register</NavLink>
      </div>
    );
  }
}
