'use client';

import { SetStateAction, useState } from 'react';
import {
  Typography,
  DatePicker,
  Select,
  Button,
  Card,
  Table,
  Space,
  message,
} from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Reportes = () => {
  const [rangoFechas, setRangoFechas] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [tipoReporte, setTipoReporte] = useState<string>('ventas');

  const [datos, setDatos] = useState<any[]>([]);

  const generarReporte = () => {
    if (!rangoFechas) {
      message.warning('Por favor seleccione un rango de fechas');
      return;
    }

    // Simulación de datos por tipo de reporte
    let data: SetStateAction<any[]> = [];
    if (tipoReporte === 'ventas') {
      data = [
        { key: 1, fecha: '2025-06-16', producto: 'Paracetamol', cantidad: 3, total: 15.0 },
        { key: 2, fecha: '2025-06-16', producto: 'Ibuprofeno', cantidad: 2, total: 13.0 },
      ];
    } else if (tipoReporte === 'inventario') {
      data = [
        { key: 1, producto: 'Amoxicilina', stock: 50 },
        { key: 2, producto: 'Omeprazol', stock: 20 },
      ];
    }

    setDatos(data);
  };

  const columnasPorTipo = {
    ventas: [
      { title: 'Fecha', dataIndex: 'fecha' },
      { title: 'Producto', dataIndex: 'producto' },
      { title: 'Cantidad', dataIndex: 'cantidad' },
      { title: 'Total C$', dataIndex: 'total' },
    ],
    inventario: [
      { title: 'Producto', dataIndex: 'producto' },
      { title: 'Stock Actual', dataIndex: 'stock' },
    ],
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Title level={3}>Reportes</Title>

      <Card style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space wrap>
            <span><strong>Rango de Fechas:</strong></span>
            <RangePicker
              onChange={(dates) => setRangoFechas(dates as [dayjs.Dayjs, dayjs.Dayjs])}
            />
          </Space>

          <Space wrap>
            <span><strong>Tipo de Reporte:</strong></span>
            <Select
              value={tipoReporte}
              onChange={(value) => setTipoReporte(value)}
              style={{ width: 200 }}
            >
              <Option value="ventas">Ventas</Option>
              <Option value="inventario">Inventario</Option>
              <Option value="caja">Movimientos de Caja</Option>
            </Select>
          </Space>

          <Button type="primary" onClick={generarReporte}>
            Generar Reporte
          </Button>
        </Space>
      </Card>

      {datos.length > 0 && (
        <Card title="Resultados del Reporte">
          <Table
            dataSource={datos}
            columns={columnasPorTipo[tipoReporte as keyof typeof columnasPorTipo]}
            pagination={false}
          />
        </Card>
      )}
    </div>
  );
};

export default Reportes;
