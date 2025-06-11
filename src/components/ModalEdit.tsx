
 import React, { useEffect, useState } from 'react';
 import { AutoComplete, Button, Form, InputNumber, Modal, Radio, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import AlertError from './AlertError';
import AlertSuccess from './AlertSuccess';
 
 interface ModalComponentProps {
   title?: string;
   id: number;
   open: boolean;
   loading: boolean;
   onCancel: () => void;
 }
 const formItemStyle = {
  marginBottom: '20px',
  width: '39%',
};
 
 const ModalComponent: React.FC<ModalComponentProps> = ({ title, id, open, loading, onCancel }) => {
   const [rowData, setRowData] = useState([]); // Estado para los datos
   const [error, setError] = useState(null);
   useEffect(() => {
     const fetchData = async () => {
     try {
       const response = await fetch(`http://localhost:3000/api/tracking?id_producto=${id}`);
       console.log(response);
       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
         const resp = await response.json();
         setRowData(resp.data);
       } catch (error: any) {
         setError(error.message);
       } finally {
       }
   };
     fetchData();
  }, []);
 
   return (
    <Modal
        title={'Editar Producto'}
        open={isCatalogModalVisible}
        footer={null}
        onCancel={() => setIsCatalogModalVisible()}
      >
        <Form
                form={form}
                initialValues={{ id_tipo_venta: 52, margen: 30 }} 
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
                {errorMsg && (
                  <AlertError message={errorMsg} />
                )}
                {successMsg && (
                  <AlertSuccess message={successMsg} />
                )}
              </Form>
      </Modal>
    );
};

export default ModalComponent;