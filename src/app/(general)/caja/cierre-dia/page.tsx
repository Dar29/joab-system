'use client';
import React, { useState } from 'react';
import {
  Card,
  Descriptions,
  Form,
  InputNumber,
  Typography,
  Input,
  Button,
  message,
  Row,
  Col,
} from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;

interface CierreCaja {
  id_usuario: number;
  fecha_apertura: string;
  fecha_cierre: string;
  saldo_inicial: number;
  total_ventas: number;
  otros_ingresos: number;
  egresos: number;
  saldo_final_esperado: number;
  saldo_final_real: number;
  diferencia: number;
  observaciones: string;
}

const datosSimulados: CierreCaja = {
  id_usuario: 1,
  fecha_apertura: '2025-06-16T08:00:00',
  fecha_cierre: dayjs().format(),
  saldo_inicial: 1000,
  total_ventas: 2500,
  otros_ingresos: 300,
  egresos: 200,
  saldo_final_esperado: 1000 + 2500 + 300 - 200,
  saldo_final_real: 0,
  diferencia: 0,
  observaciones: '',
};

const CierreDiaPage: React.FC = () => {
  const [form] = Form.useForm();
  const [datos, setDatos] = useState<CierreCaja>(datosSimulados);

  const calcularDiferencia = (real: number) => {
    const diferencia = parseFloat((real - datos.saldo_final_esperado).toFixed(2));
    form.setFieldsValue({ diferencia });
  };

  const onFinish = (values: Partial<CierreCaja>) => {
    const cierre = {
      ...datos,
      saldo_final_real: values.saldo_final_real!,
      diferencia: values.diferencia!,
      observaciones: values.observaciones || '',
    };
    console.log('Datos enviados al backend:', cierre);
    message.success('Cierre de caja registrado correctamente');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Title level={3}>Cierre del Día - Caja</Title>
      <Row gutter={24}>
        {/* Card de resumen */}
        <Col xs={24} md={12}>
          <Card>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Fecha de Apertura">
                {dayjs(datos.fecha_apertura).format('DD/MM/YYYY HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="Fecha de Cierre">
                {dayjs(datos.fecha_cierre).format('DD/MM/YYYY HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="Saldo Inicial">C$ {datos.saldo_inicial.toFixed(2)}</Descriptions.Item>
              <Descriptions.Item label="Total de Ventas">C$ {datos.total_ventas.toFixed(2)}</Descriptions.Item>
              <Descriptions.Item label="Otros Ingresos">C$ {datos.otros_ingresos.toFixed(2)}</Descriptions.Item>
              <Descriptions.Item label="Egresos">C$ {datos.egresos.toFixed(2)}</Descriptions.Item>
              <Descriptions.Item label="Saldo Final Esperado">
                <strong>C$ {datos.saldo_final_esperado.toFixed(2)}</strong>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Formulario */}
        <Col xs={24} md={12}>
          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                saldo_final_real: 0,
                diferencia: 0,
                observaciones: '',
              }}
            >
              <Form.Item
                label="Saldo Final Real"
                name="saldo_final_real"
                rules={[{ required: true, message: 'Ingrese el saldo final contado en caja' }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  onChange={(value) => calcularDiferencia(value || 0)}
                  formatter={(v) => `C$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                //   parser={(v) => parseFloat(v!.replace(/C\$\s?|(,*)/g, ''))}
                />
              </Form.Item>

              <Form.Item label="Diferencia" name="diferencia">
                <InputNumber
                  disabled
                  style={{ width: '100%' }}
                  formatter={(v) => `C$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(v) => parseFloat(v!.replace(/C\$\s?|(,*)/g, ''))}
                />
              </Form.Item>

              <Form.Item label="Observaciones" name="observaciones">
                <TextArea rows={3} maxLength={1000} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Registrar Cierre
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CierreDiaPage;
