'use client';

import {
  AutoComplete,
  Button,
  Card,
  Form,
  InputNumber,
  Table,
  Typography,
  message,
  Input,
  Modal,
  Spin,
} from 'antd';
import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Title } = Typography;

interface Producto {
  key: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

const productosDisponibles = [
  { nombre: 'Paracetamol 500mg', precio: 5.0 },
  { nombre: 'Amoxicilina 250mg', precio: 8.75 },
  { nombre: 'Ibuprofeno 200mg', precio: 6.5 },
  { nombre: 'Omeprazol 20mg', precio: 4.25 },
];

export default function Facturacion() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [vuelto, setVuelto] = useState<number>(0);
  const [pagoCliente, setPagoCliente] = useState<number | null>(null);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [modalVisible, setModalVisible] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [form] = Form.useForm();
  const [precioActual, setPrecioActual] = useState<number | undefined>();
  const facturaRef = useRef<HTMLDivElement>(null);

  const [tipoPago, setTipoPago] = useState<'C$' | 'US$' | 'Mixto'>('C$');
  const [pagoCordoba, setPagoCordoba] = useState<number>(0);
  const [pagoDolar, setPagoDolar] = useState<number>(0);
  const tasaCambio = 36.6243;


  const calcularTotal = (productos: Producto[]) => {
    const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    setTotal(total);
  };

  const handleProductoSeleccionado = (nombre: string) => {
    const producto = productosDisponibles.find(p => p.nombre === nombre);
    if (producto) {
      setPrecioActual(producto.precio);
      form.setFieldValue('nombre', producto.nombre);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Spin size="large" />
       </div>
    );
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  const agregarProducto = (values: { nombre: string; cantidad: number }) => {
    const producto = productosDisponibles.find(p => p.nombre === values.nombre);
    if (!producto) return message.error('Producto no válido');
    const nuevoProducto: Producto = {
      key: String(Date.now()),
      nombre: producto.nombre,
      cantidad: values.cantidad,
      precio: producto.precio,
    };
    const actualizados = [...productos, nuevoProducto];
    setProductos(actualizados);
    calcularTotal(actualizados);
    setPrecioActual(undefined);
    form.resetFields();
  };

  const generarPDF = async () => {
    if (!facturaRef.current) return;
    const canvas = await html2canvas(facturaRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('factura.pdf');
    message.success('Factura descargada como PDF');
  };

  const columns = [
    { title: 'Medicamento', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad' },
    {
      title: 'Precio C$',
      dataIndex: 'precio',
      key: 'precio',
      render: (p: number) => p.toFixed(2),
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      render: (_: any, record: Producto) =>
        `C$ ${(record.precio * record.cantidad).toFixed(2)}`,
    },
  ];

  return (
    <div style={{ padding: '0.5rem'}}>
      <Title level={3}>Facturación de Medicamentos</Title>
      <Card title="Agregar Medicamento">
        <Form form={form} layout="inline" onFinish={agregarProducto}>
          <Form.Item
            name="nombre"
            rules={[{ required: true, message: 'Seleccione un medicamento' }]}
          >
            <AutoComplete
              placeholder="Buscar medicamento"
              style={{ width: 200 }}
              options={productosDisponibles.map(p => ({ value: p.nombre }))}
              onSelect={handleProductoSeleccionado}
            />
          </Form.Item>

          <Form.Item
            name="cantidad"
            rules={[{ required: true, message: 'Cantidad requerida' }]}
          >
            <InputNumber placeholder="Cantidad" min={1} />
          </Form.Item>

          <Form.Item>
            <InputNumber
              value={precioActual}
              placeholder="Precio"
              readOnly
              style={{ width: 100, backgroundColor: '#f5f5f5' }}
              formatter={v => `C$ ${v}`}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Agregar
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Factura */}
      <div ref={facturaRef} style={{ backgroundColor: 'white', padding: 20 }}>
        <Card title="Factura Generada">
          <Table dataSource={productos} columns={columns} pagination={false} />
          <Title level={5} style={{ textAlign: 'right', marginTop: 20 }}>
            Total: C$ {total.toFixed(2)}
          </Title>
        </Card>
      </div>

      {/* Botones de acción */}
      <div style={{ marginLeft: 24, display: 'flex', gap: 15 }}>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Facturar
        </Button>
        <Button onClick={generarPDF}>Descargar PDF</Button>
      </div>

      <Modal
        title="Pago del Cliente"
        open={modalVisible}
        onCancel={() => {
            setModalVisible(false);
            setPagoCliente(null);
            setPagoCordoba(0);
            setPagoDolar(0);
            setTipoPago('C$');
            setVuelto(0);
        }}
        footer={[
          <Button key="cancelar" onClick={() => setModalVisible(false)}>
            Cancelar
          </Button>,
          <Button onClick={generarPDF}>Descargar PDF</Button>,
          <Button
            key="confirmar"
            type="primary"
            onClick={() => {
              if (vuelto < 0) {
                message.error('El pago es insuficiente');
              } else {
                message.success('Pago registrado correctamente');
                setModalVisible(false);
              }
            }}
          >
            Confirmar
          </Button>
          
        ]}

        >
        <Form layout="vertical">
            <Form.Item label="Total a Pagar">
            <InputNumber
                value={total}
                readOnly
                style={{ width: '100%', backgroundColor: '#f5f5f5' }}
                formatter={(v) => `C$ ${v}`}
            />
            </Form.Item>

            <Form.Item label="Tipo de Pago">
            <Input.Group compact>
                <select
                value={tipoPago}
                onChange={(e) => {
                    const tipo = e.target.value as 'C$' | 'US$' | 'Mixto';
                    setTipoPago(tipo);
                    // Reiniciar los pagos
                    setPagoCordoba(0);
                    setPagoDolar(0);
                    setVuelto(0);
                }}
                style={{ width: '100%' }}
                >
                <option value="C$">Córdobas</option>
                <option value="US$">Dólares</option>
                <option value="Mixto">Mixto</option>
                </select>
            </Input.Group>
            </Form.Item>

            {tipoPago === 'C$' && (
            <Form.Item label="Pago en Córdobas">
                <InputNumber
                min={0}
                style={{ width: '100%' }}
                value={pagoCordoba}
                onChange={(value) => {
                    const pago = value ?? 0;
                    setPagoCordoba(pago);
                    setVuelto(pago - total);
                }}
                placeholder="¿Con cuánto paga?"
                />
            </Form.Item>
            )}

            {tipoPago === 'US$' && (
            <Form.Item label={`Pago en Dólares (T/C: ${tasaCambio})`}>
                <InputNumber
                min={0}
                style={{ width: '100%' }}
                value={pagoDolar}
                onChange={(value) => {
                    const pago = value ?? 0;
                    setPagoDolar(pago);
                    const enCordobas = pago * tasaCambio;
                    setVuelto(enCordobas - total);
                }}
                placeholder="¿Con cuánto paga?"
                />
            </Form.Item>
            )}

            {tipoPago === 'Mixto' && (
            <>
                <Form.Item label="Pago en Córdobas">
                <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    value={pagoCordoba}
                    onChange={(value) => {
                    const cordobas = value ?? 0;
                    const enCordobas = cordobas + pagoDolar * tasaCambio;
                    setPagoCordoba(cordobas);
                    setVuelto(enCordobas - total);
                    }}
                />
                </Form.Item>
                <Form.Item label={`Pago en Dólares (T/C: ${tasaCambio})`}>
                <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    value={pagoDolar}
                    onChange={(value) => {
                    const dolares = value ?? 0;
                    const enCordobas = pagoCordoba + dolares * tasaCambio;
                    setPagoDolar(dolares);
                    setVuelto(enCordobas - total);
                    }}
                />
                </Form.Item>
            </>
            )}

            <Form.Item label="Vuelto a entregar">
            <InputNumber
                value={vuelto}
                style={{
                width: '100%',
                color: vuelto < 0 ? 'red' : 'green',
                backgroundColor: '#f6ffed',
                }}
                readOnly
                formatter={(v) => {
                const num = Number(v);
                if (isNaN(num)) return '';
                return vuelto < 0
                    ? `Faltan C$ ${Math.abs(num).toFixed(2)}`
                    : `C$ ${num.toFixed(2)}`;
                }}
            />
            </Form.Item>
        </Form>
        </Modal>

    </div>
  );
}
