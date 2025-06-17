'use client';

import React, { useState } from 'react';
import 'antd/dist/reset.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import { NavbarItem } from '@/src/components/layout';
import LogoInicio from '../../LogoInicio';
import NotificationDropdown from '../../Notification';

const { Header, Sider, Content } = Layout;

const Navbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{
          backgroundColor: '#ffffff',
          borderRight: '1px solid #f0f0f0',
        }}
      >
        {!collapsed && (
          <div style={{ transition: 'opacity 0.6s ease', opacity: 1 }}>
            <LogoInicio />
          </div>
        )}
        <NavbarItem />
      </Sider>

      <Layout style={{ background: '#f5f5f5' }}>
        <Header
          style={{
            padding: '0 16px',
            background: '#003a8c', // Azul farmacia
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              color: '#ffffff',
            }}
          />
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>
            Joab Pharmacy System
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Aquí podrías poner el NotificationDropdown o Avatar */}
          </div>
        </Header>

        <Content
          style={{
            margin: '8px',
            padding: '16px',
            minHeight: 280,
            borderRadius: borderRadiusLG,
            backgroundColor: '#ffffff',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Navbar;
