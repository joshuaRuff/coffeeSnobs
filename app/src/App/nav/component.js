import React from 'react';
import { NavLink } from 'react-router-dom';

export default class TopNav extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/auth/login">Login</NavLink>
        <NavLink to="/404">404</NavLink>
        <NavLink to="/account">Account</NavLink>
        <NavLink to="/edit">Edit</NavLink>
      </div>
    );
  }
}
