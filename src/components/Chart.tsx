import React from 'react';
import { Column } from '@ant-design/charts';

const Chart = () => {
  const data = [
    { type: 'Enero', ventas: 38 },
    { type: 'Febrero', ventas: 52 },
    { type: 'Marzo', ventas: 61 },
    { type: 'Abril', ventas: 145 },
  ];

  const config = {
    data,
    xField: 'type',
    yField: 'ventas',
    label: {
      position: 'middle',
      style: { fill: '#FFFFFF', opacity: 0.6 },
    },
    xAxis: {
      label: { autoHide: true, autoRotate: false },
    },
    meta: {
      type: { alias: 'Mes' },
      ventas: { alias: 'Ventas ($)' },
    },
  };

  return <Column {...config} />;
};

export default Chart;
