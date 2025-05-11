"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  AppstoreOutlined,
  BarChartOutlined,
  DollarOutlined,
  FileTextOutlined,
  HomeOutlined,
  ProductOutlined,
  SettingOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
type NavbarItemProps = {
  isDarkMode: boolean;
};

const items: MenuItem[] = [
  {
    key: '/',
    label: 'Inicio',
    icon: <HomeOutlined />,
  },
  {
    key: '/productos',
    label: 'Productos',
    icon: <ProductOutlined />,
  },
  {
    key: '/ventas',
    label: 'Facturación',
    icon: <FileTextOutlined />,
  },
  {
    key: '/reportes',
    label: 'Reportes',
    icon: <BarChartOutlined />,
  },
  {
    key: '/caja',
    label: 'Caja',
    icon: <DollarOutlined />,
    children: [
      { key: '/caja/inicio-dia', label: 'Inicio Día' },
      { key: '/caja/cierre-dia', label: 'Cierre Día' },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: '/admin',
    label: 'Administración',
    icon: <SettingOutlined />,
    children: [
      { key: '/admin/catalogos', label: 'Catálogos' },
      { key: '/admin/roles', label: 'Roles' },
      { key: '/admin/usuarios', label: 'Usuarios' },
    ],
  },
];

const NavbarItem: React.FC<NavbarItemProps> = ({ isDarkMode }) => {
  const router = useRouter();

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key); // Redirige a la ruta
  };

  return (
    <Menu
      onClick={onClick}
      theme={isDarkMode ? 'dark' : 'light'}
      mode="inline"
      defaultSelectedKeys={['/']}
      items={items}
    />
  );
};

export default NavbarItem;
