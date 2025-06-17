'use client';
import React, { useState } from 'react';
import { Card, Descriptions, Button, Typography, message } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;

interface DatosInicioDia {
  fecha_cierre_anterior: string;
  saldo_final_real: number;
  moneda: 'C$' | 'US$';
}

const datosSimulados: DatosInicioDia = {
  fecha_cierre_anterior: '2025-06-15T18:45:00',
  saldo_final_real: 3725.5,
  moneda: 'C$',
};

const InicioDiaPage: React.FC = () => {
  const [datos, setDatos] = useState<DatosInicioDia>(datosSimulados);
  const [iniciado, setIniciado] = useState(false);

  const iniciarDia = () => {
    setIniciado(true);
    message.success('Día iniciado correctamente.');
    console.log('Día iniciado con:', datos);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <Title level={3}>Inicio del Día - Caja</Title>

      <Card>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Fecha de Inicio">
            {dayjs(datos.fecha_cierre_anterior).format('DD/MM/YYYY HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label="Saldo Inicial (Caja)">
            {datos.moneda} {datos.saldo_final_real.toFixed(2)}
          </Descriptions.Item>
        </Descriptions>

        <div style={{ marginTop: 24 }}>
          <Button
            type="primary"
            block
            onClick={iniciarDia}
            disabled={iniciado}
          >
            {iniciado ? 'Día Iniciado' : 'Iniciar Día'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InicioDiaPage;
