'use client';

import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BulbOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Switch } from 'antd';
import { NavbarItem} from '@/src/components/layout'
import LogoInicio from '../../LogoInicio';

const { Header, Sider, Content } = Layout;

const Navbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const headerStyle = {
    padding: '0 5px',
    background: isDarkMode ? '#001529' : colorBgContainer,
    color: isDarkMode ? '#fff' : 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme={isDarkMode ? 'dark' : 'light'}>
      {!collapsed && <div
        style={{
          transition: 'opacity 0.6s ease', // Transición de opacidad
          opacity: collapsed ? 0 : 1, // Si está colapsado, lo escondemos
        }}
      >
        <LogoInicio />
      </div>}
        <NavbarItem isDarkMode={isDarkMode} />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 20,
              height: 20,
              color: isDarkMode ? '#fff' : 'inherit',
            }}
          />
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000' }}>
              Joab Pharmacy System
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<BulbOutlined />}
              style={{
                  backgroundColor: isDarkMode ? '#434343' : '#434343', // Cambia estos colores como quieras
              }}
            />
          </div>
        </Header>
        <Content
          style={{
            margin: '10px 10px',
            padding: 20,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Navbar;
