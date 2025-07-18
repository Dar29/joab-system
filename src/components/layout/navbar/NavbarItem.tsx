"use client";
import React, { useState } from 'react';
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
import { Menu, Spin } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

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
    key: '/facturacion',
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
      { key: '/adm/catalogos', label: 'Catálogos' },
      { key: '/adm/roles', label: 'Roles' },
      { key: '/adm/usuarios', label: 'Usuarios' },
    ],
  },
];

const NavbarItem = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const onClick: MenuProps['onClick'] = (e) => {
    setLoading(true);
    router.push(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      theme={ 'light'}
      mode="inline"
      defaultSelectedKeys={['/']}
      items={items}
    />
  );
};

export default NavbarItem;
