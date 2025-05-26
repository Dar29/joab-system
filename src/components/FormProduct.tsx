import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
} from 'antd';
import NoteMessage from './Message';
import BasicButtons from './ButtonComponent';
import SuccessButtons from './ButtonComponent';
import { Catalogos, DataCatalogos } from '../types/catalogs';

const { TextArea } = Input;

const formItemStyle = {
    marginBottom: '20px',
    width: '39%'
};

interface FormProductProps {
  catalogos: Catalogos;
}

const FormProduct: React.FC<FormProductProps> = ({ catalogos }) => {  
  return (
    <div style={{ height: "90%", display: "flex", flexDirection: "column", margin:"10px", marginTop:"5px"}}>
      <NoteMessage message="Verifique cuidadosamente la información ingresada. La precisión es crucial para el registro del producto." 
                  typeAlert="warning" />
        <Form
          labelCol={{ span: 60 }}
          wrapperCol={{ span: 30 }}
          layout="inline"
          style={{height: "90%" , alignItems: "center", marginTop:"2%" , marginLeft:"18%"}}
        >
        <Form.Item
          label="Nombre del Producto" style={formItemStyle}
          rules={[{ required: true, message: 'Por favor, ingrese el nombre del producto!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Proveedores" style={formItemStyle}>
          <Select placeholder="Seleccione un proveedor">
            {catalogos.proveedores.map((item, index) => (
              <Select.Option key={index} value={item.id}>{item.valor}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Categoria" style={formItemStyle}
          rules={[{ required: true, message: 'Por favor, seleccione la categoría!' }]}
        >
          <Select placeholder="Seleccione una categoría">
            {catalogos.categorias.map((item, index) => (
              <Select.Option key={index} value={item.id}>{item.valor}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Presentacion" style={formItemStyle}>
          <Select placeholder="Seleccione una presentación">
            {catalogos.presentaciones.map((item, index) => (
              <Select.Option key={index} value={item.id}>{item.valor}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Dosis" style={formItemStyle}
          rules={[{ required: true, message: 'Por favor, ingrese la cantidad!' }]}
        >
          <InputNumber />
        </Form.Item>
         <Form.Item label="Unidad" style={formItemStyle}>
          <Select placeholder="Seleccione una unidad">
            {catalogos.unidades.map((item, index) => (
              <Select.Option key={index} value={item.id}>{item.valor}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Fecha Ingreso" style={formItemStyle}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Fecha Vencimiento" style={formItemStyle}>
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Cantidad" style={formItemStyle}
          rules={[{ required: true, message: 'Por favor, ingrese la cantidad!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Venta" style={formItemStyle}>
          <Radio.Group >
            <Radio value="apple"> Con Receta </Radio>
            <Radio value="pear"> Sin Receta </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Precio Compra" style={formItemStyle}
          rules={[{ required: true, message: 'Por favor, ingrese la cantidad!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Margen Bruto" style={formItemStyle}>
          <Slider />
        </Form.Item>
        <Form.Item
          label="Precio Venta" style={formItemStyle}
          rules={[{ required: true, message: 'Por favor, ingrese la cantidad!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Breve Descripcion" style={formItemStyle}>
          <TextArea rows={1} />
        </Form.Item>
        </Form>
        <div style={{marginLeft:"80%"}}>
          <SuccessButtons/>
        </div>
        
    </div>
  );
};

export default FormProduct;