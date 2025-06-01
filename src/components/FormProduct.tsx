import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'; // Importa useRouter
import dayjs from 'dayjs';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  AutoComplete,
  AutoCompleteProps,
  Divider,
} from 'antd';
import NoteMessage from './Message';
import ButtonComponent from './ButtonComponent';
import { CatalogoItem, Catalogos } from '../types/catalogs';
import { Box } from '@mui/material';
import ConfirmDialog from './ConfirmDialog';
import AlertError from './AlertError';
import { message } from 'antd';
import AlertSuccess from './AlertSuccess';

const { TextArea } = Input;

const formItemStyle = {
  marginBottom: '20px',
  width: '39%',
};

interface FormProductProps {
  catalogos: Catalogos;
  onProductAdded: (newProduct: CatalogoItem) => void; // Añade esta línea
}

const FormProduct: React.FC<FormProductProps> = ({ catalogos }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [valoresPendientes, setValoresPendientes] = useState<any>(null); // Para guardar temporalmente el `values`

  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const [productName, setProductName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');



  const precioCompra = Form.useWatch("precio_compra", form);
  const margen = Form.useWatch("margen", form);

  useEffect(() => {
  if (precioCompra != null && margen != null) {
    const precioVenta = Math.round(precioCompra + (precioCompra * (margen / 100)));
    form.setFieldsValue({ precio_venta: precioVenta });
  }
}, [precioCompra, margen, form]);

  const insertarProducto = async (values: any) => {
    const dataToSend = {
      ...values,
      nombre: productName,
      usuario_graba: 'dljimenez',
    };

    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        form.resetFields();
        setProductName('');
        setSuccessMsg(data.message || 'Error al insertar producto');
        // setTimeout(() => {
        //   router.push('/productos');
        // }, 2000);
      } else {
        setErrorMsg(data.message || 'Error al insertar producto');
      }
    } catch (error) {
      console.error('Error de red al insertar:', error);
      setErrorMsg('Error de red al insertar producto');
    }
  };

  const handleGoBack = () => {
    router.back(); // Esto navega a la página anterior en el historial del navegador
  };

  return (
    <div style={{ height: "90%", display: "flex", flexDirection: "column", margin: "10px", marginTop: "5px" }}>
      <NoteMessage
        message="Verifique cuidadosamente la información ingresada. La precisión es crucial para el registro del producto."
        typeAlert="warning"
      />
      <Form
        form={form}
        initialValues={{ id_tipo_venta: 49, margen: 30 }} 
        onFinish={async (values) => {
          const existeProducto = catalogos.productos.some(
            producto => producto.valor.toLowerCase() === productName.toLowerCase()
          );

          if (existeProducto) {
            setValoresPendientes(values);
            setMostrarConfirmacion(true);
            return;
          }

          await insertarProducto(values);
        }}

        onFinishFailed={({ errorFields }) => {
          console.log('Errores:', errorFields);
        }}
        labelCol={{ span: 60 }}
        wrapperCol={{ span: 30 }}
        layout="inline"
        style={{ height: "90%", alignItems: "center", marginTop: "2%", marginLeft: "10%" , marginBottom: "1%"}}
      >
        <Divider orientation="left" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          General
        </Divider>
        <Form.Item
          label="Nombre"
          style={formItemStyle}
          name="nombre"
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <AutoComplete
            value={productName}
            onChange={(value) => {
              setProductName(value);
              const filtered = catalogos.productos?.filter((producto) =>
                producto.valor.toLowerCase().includes(value.toLowerCase())
              ) || [];
              const newOptions = filtered.map(item => ({ value: item.valor, key: item.id }));
              setOptions(newOptions);
            }}
            onSelect={(value) => setProductName(value)}
            options={options}
            placeholder="Ingrese nombre del producto"
          />
        </Form.Item>
        <Form.Item label="Proveedores" style={formItemStyle} name={"id_proveedor"}
                rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Select showSearch placeholder="Seleccione un proveedor">
            {catalogos.proveedores.map((item, index) => (
              <Select.Option key={index} value={item.id}>{item.valor}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Categoria"
          style={formItemStyle}
          name={"id_categoria"}
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Select showSearch placeholder="Seleccione una categoría">
            {catalogos.categorias.map((item, index) => (
              <Select.Option key={index} value={item.id}>{item.valor}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Presentacion" style={formItemStyle} name={"id_presentacion"} rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Select showSearch placeholder="Seleccione una presentación">
            {catalogos.presentaciones.map((item, index) => (
              <Select.Option key={index} value={item.id}>{item.valor}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Dosis"
          style={formItemStyle}
          name={"dosis"}
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Unidad" style={formItemStyle} name={"id_unidad_dosis"} rules={[{ required: true, message: 'Campo requerido' }]}>
          <Select showSearch placeholder="Seleccione una unidad">
            {catalogos.unidades.map((item, index) => (
              <Select.Option key={index} value={item.id}>{item.valor}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Breve Descripcion" style={formItemStyle} name={"descripcion"}>
          <TextArea rows={1} />
        </Form.Item>
        <Form.Item label="Venta" style={formItemStyle} name={"id_tipo_venta"} >
          <Radio.Group>
            <Radio value={51}> Con Receta </Radio>
            <Radio value={52}> Sin Receta </Radio>
          </Radio.Group>
        </Form.Item>
        <Divider orientation="left" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          Ingreso
        </Divider>
        {/* <Form.Item label="Fecha Ingreso" style={formItemStyle} name={"fecha_grabacion"}>
          <DatePicker />
        </Form.Item> */}
        <Form.Item label="Fecha Vencimiento" style={formItemStyle} name={"fecha_vencimiento"}>
          <DatePicker
            disabledDate={(current) => {
              // Bloquea todas las fechas menores o iguales al 07/06/2025 si hoy es 31/05/2025
              return current && current < dayjs().add(7, 'day').startOf('day');
            }}
          />
        </Form.Item>
        <Form.Item
          label="Cantidad"
          style={formItemStyle}
          name={"stock"}
        >
          <InputNumber min={0} />
        </Form.Item> 
        <Form.Item
          label="Precio Compra"
          style={formItemStyle}
          name={"precio_compra"}
        >
          <InputNumber<number>
            min={0}
            max={10000}
            formatter={(value) => `C$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => parseFloat(value?.replace(/[^0-9.]/g, '') || '0')}
          />
        </Form.Item>
        <Form.Item label="Margen Bruto" style={formItemStyle} name={"margen"}>
          <Slider min={0} max={100} tooltip={{ formatter: value => `${value}%` }} />
        </Form.Item>
        <Form.Item
          label="Precio Venta"
          style={formItemStyle}
          name={"precio_venta"}
        >
          <InputNumber<number>
            min={0}
            max={10000}
            readOnly
            formatter={(value) => `C$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => parseFloat(value?.replace(/[^0-9.]/g, '') || '0')}
          />
          
        </Form.Item>
        {errorMsg && (
          <AlertError message={errorMsg} />
        )}
        {successMsg && (
          <AlertSuccess message={successMsg} />
        )}
      </Form>
      
      <Box display="flex" justifyContent="space-between" paddingLeft={10} paddingRight={10}>
        <ButtonComponent variant="contained" color="primary" text="Regresar" onClick={handleGoBack} />
        <ButtonComponent variant="contained" color="success" text="Agregar" onClick={() => form.submit()} />
      </Box>
      <ConfirmDialog
        message={`El producto "${productName}" ya existe. ¿Deseas ingresarlo de todos modos?`}
        visible={mostrarConfirmacion}
        onConfirm={async () => {
          setMostrarConfirmacion(false);
          if (valoresPendientes) {
            await insertarProducto(valoresPendientes);
            setValoresPendientes(null);
          }
        }}
        onCancel={() => {
          setMostrarConfirmacion(false);
          setValoresPendientes(null);
        }}
      />

    </div>
  );
};

export default FormProduct;

