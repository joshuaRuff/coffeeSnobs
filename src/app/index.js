import React from 'react';
import { Layout, Row, Col, Card } from 'antd';

import SideNav from './components/sideNav';
import TopNav from './components/topNav';

import './index.scss';

const { Content } = Layout;


export default class AppLayout extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Layout id="AppLayout">
        <SideNav id="mainSideNav" />
        <Layout>
          <TopNav />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
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
          </Content>
        </Layout>
      </Layout>
    );
  }

}
