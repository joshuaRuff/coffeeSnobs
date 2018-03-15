import React from 'react';
import { Layout, Menu, Icon, Row, Col, Card } from 'antd';
import Counter from 'counter';
import CounterDisplay from 'CounterDisplay';

const { Header, Sider, Content } = Layout;

import './index.scss';

export default class AppLayout extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <Layout id="AppLayout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
          </Header>
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
                <Card title="Counter One">
                  <Counter id={1} />
                  <Counter id={1} />
                  <CounterDisplay id={1} />
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Counter Two">
                  <h2>Counter 2 using the same component code with dynamic key</h2>
                  <Counter id={2} />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
