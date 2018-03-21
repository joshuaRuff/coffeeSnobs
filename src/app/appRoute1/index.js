import React from 'react';
import { Row, Col, Card } from 'antd';

export default class AppRouteOne extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Test Header">
            <p>Test Content</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Test Header 2">
            <p>Test Content 2</p>
          </Card>
        </Col>
      </Row>
    );
  }

}
