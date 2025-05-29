import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'; // Importa useRouter

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
} from 'antd';
import NoteMessage from './Message';
import ButtonComponent from './ButtonComponent';
import { CatalogoItem, Catalogos } from '../types/catalogs';
import { Box } from '@mui/material';
import ConfirmDialog from './ConfirmDialog';

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


  const precioCompra = Form.useWatch("precio_compra", form);
  const margen = Form.useWatch("margen", form);

  useEffect(() => {
    if (precioCompra != null && margen != null) {
      const precioVenta = +(precioCompra + (precioCompra * (margen / 100))).toFixed(2);
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
      } else {
        console.error('Error al insertar:', data.message);
      }
    } catch (error) {
      console.error('Error de red al insertar:', error);
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
        style={{ height: "90%", alignItems: "center", marginTop: "2%", marginLeft: "18%" }}
      >
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
        <Form.Item label="Proveedores" style={formItemStyle} name={"id_proveedor"}>
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
        >
          <Select showSearch placeholder="Seleccione una categoría">
            {catalogos.categorias.map((item, index) => (
              <Select.Option key={index} value={item.id}>{item.valor}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Presentacion" style={formItemStyle} name={"id_presentacion"}>
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
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Unidad" style={formItemStyle} name={"id_unidad_dosis"}>
          <Select showSearch placeholder="Seleccione una unidad">
            {catalogos.unidades.map((item, index) => (
              <Select.Option key={index} value={item.id}>{item.valor}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Fecha Ingreso" style={formItemStyle} name={"fecha_grabacion"}
                  rules={[{ required: true, message: 'Campo requerido' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Fecha Vencimiento" style={formItemStyle} name={"fecha_vencimiento"}
                  rules={[{ required: true, message: 'Campo requerido' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Cantidad"
          style={formItemStyle}
          name={"stock"}
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Venta" style={formItemStyle} name={"id_tipo_venta"} >
          <Radio.Group>
            <Radio value={48}> Con Receta </Radio>
            <Radio value={49}> Sin Receta </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Precio Compra"
          style={formItemStyle}
          name={"precio_compra"}
          rules={[{ required: true, message: 'Campo requerido' }]}
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
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <InputNumber<number>
            min={0}
            max={10000}
            readOnly
            formatter={(value) => `C$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => parseFloat(value?.replace(/[^0-9.]/g, '') || '0')}
          />
        </Form.Item>
        <Form.Item label="Breve Descripcion" style={formItemStyle} name={"descripcion"}>
          <TextArea rows={1} />
        </Form.Item>
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

