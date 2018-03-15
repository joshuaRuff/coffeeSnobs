// counter/index.js
import React, { Component } from 'react';
import { connect } from 'kea';
import counterLogic from '../counter/logic';

// @counterLogic
@connect({
  props: [counterLogic.withKey(props => props.id), ['counter', 'doubleCounter']],
})
export default class DisplayCounter extends Component {
  render() {
    const { counter, doubleCounter } = this.props;

    return (
      <div className="kea-counter">
        <h2>Display Component Using Shared Logic</h2>
        Count: {counter}
        <br />
        Doublecount: {doubleCounter}
      </div>
    );
  }
}
