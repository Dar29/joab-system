import React from 'react';
import { AppstoreOutlined, BarChartOutlined, DollarOutlined, FileTextOutlined, HomeOutlined, ProductOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
type NavbarItemProps = {
  isDarkMode: boolean;
};


const items: MenuItem[] = [
  {
    key: 'inicio',
    label: 'Inicio',
    icon: <HomeOutlined />,
  },
  {
    key: 'productos',
    label: 'Productos',
    icon: <ProductOutlined />,
  },
    {
    key: 'ventas',
    label: 'Facturacion',
    icon: <FileTextOutlined />,
  },
  {
    key: 'reportes',
    label: 'Reportes',
    icon: <BarChartOutlined />,
  },
  {
    key: 'caja',
    label: 'Caja',
    icon: <DollarOutlined />,
    children: [
      { key: '8', label: 'Inicio Dia' },
      { key: '9', label: 'Cierre Dia' },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub4',
    label: 'Administracion',
    icon: <SettingOutlined />,
    children: [
      { key: '1', label: 'Catalogos'},
      { key: '2', label: 'Roles' },
      { key: '11', label: 'Usuarios' },
    ],
  },
];

const NavbarItem: React.FC<NavbarItemProps> = ({ isDarkMode }) => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      theme={isDarkMode ? 'dark' : 'light'}
      mode="inline"
      defaultSelectedKeys={['1']}
      items={items}
    />
  );
};

export default NavbarItem;