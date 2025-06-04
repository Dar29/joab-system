'use client'
import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { createStyles } from 'antd-style';


interface TableCompProps {
  data: any[];
}

const TableComp: React.FC<TableCompProps> = ({ data }) => {
  const columns = [
    {
      title: 'Movimiento',
      dataIndex: 'Movimiento',
      key: 'Movimiento',
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
    },
    {
      title: 'Fecha Movimiento',
      dataIndex: 'FechaMovimiento',
      key: 'fechaMov',
    },
    {
      title: 'Fecha Vencimiento',
      dataIndex: 'FechaVencimiento',
      key: 'fechaVen',
    },
    {
      title: 'Usuario Responsable',
      dataIndex: 'usuario_responsable',
      key: 'usuario',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default TableComp;
