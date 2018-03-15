// counter/index.js
import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import counterLogic from './logic';

@counterLogic
export default class Counter extends Component {
  render() {
    const { counter, doubleCounter } = this.props;
    const { increment, decrement } = this.actions;
    const size = 'medium';
    return (
      <div className="kea-counter" style={{ margin: '20px 0' }}>
        Count: {counter}
        <br />
        Doublecount: {doubleCounter}
        <br />
        <Button.Group size={size}>
          <Button type="primary" onClick={() => decrement(1)}>
            <Icon type="minus" />Decrement
          </Button>
          <Button type="primary" onClick={() => increment(1)}>
            Increment<Icon type="plus" />
          </Button>
        </Button.Group>
        <br />
      </div>
    );
  }
}
