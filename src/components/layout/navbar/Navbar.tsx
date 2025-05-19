'use client';

import React, { useState } from 'react';
import 'antd/dist/reset.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Switch, Space, Badge, Avatar } from 'antd';
import { NavbarItem} from '@/src/components/layout'
import LogoInicio from '../../LogoInicio';
import NotificationDropdown from '../../Notification';

const { Header, Sider, Content } = Layout;

const Navbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const headerStyle = {
    padding: '0 5px',
    background: colorBgContainer,
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme={'light'}>
      {!collapsed && <div
        style={{
          transition: 'opacity 0.6s ease', // Transición de opacidad
          opacity: collapsed ? 0 : 1, // Si está colapsado, lo escondemos
        }}
      >
        <LogoInicio />
      </div>}
        <NavbarItem/>
      </Sider>
      <Layout style={{background: colorBgContainer,}}>
        <Header style={headerStyle}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 20,
              height: 20,
              color: 'inherit',
            }}
          />
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>
              Joab Pharmacy System
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          </div>
        </Header>
        <Content
          style={{
            margin: '5px',
            minHeight: 280,
            borderRadius: borderRadiusLG,
            color: 'inherit',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Navbar;
