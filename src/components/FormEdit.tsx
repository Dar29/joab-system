// EditProductForm.tsx
import { AutoComplete, Button, Divider, Form, Input, InputNumber, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';
import { CatalogoItem, Catalogos } from '../types/catalogs';
import TextArea from 'antd/es/input/TextArea';
import AlertError from './AlertError';
import AlertSuccess from './AlertSuccess';

interface EditProductFormProps {
  data: any;
  onClose: () => void;
}
const formItemStyle = {
  marginBottom: '20px',
  width: '45%',
};

const EditProductForm: React.FC<EditProductFormProps> = ({ data, onClose }) => {
  const [form] = Form.useForm();
    const [catalogos, setCatalogos] = useState<Catalogos>({
      productos:[],
      proveedores: [],
      categorias: [],
      unidades: [],
      presentaciones: [],
      viasAdministrativas: [],
      tipoVenta: []
    });
  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
     const [errorMsg, setErrorMsg] = useState('');
      const [successMsg, setSuccessMsg] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
  
          const catalogos = await fetch('http://localhost:3000/api/catalogs-details');
          const proveedores = await fetch('http://localhost:3000/api/proveedores')
          const productos = await fetch('http://localhost:3000/api/products');
          if (!catalogos.ok) {
            throw new Error(`HTTP error! status: ${catalogos.status}`);
          }
          if (!proveedores.ok) {
            throw new Error(`HTTP error! status: ${proveedores.status}`);
          }
          if (!productos.ok) {
            throw new Error(`HTTP error! status: ${proveedores.status}`);
          }
  
          const cat = await catalogos.json();
          const prov = await proveedores.json();
          const prod = await productos.json();
  
          const agrupado: Catalogos = {
            productos:[],
            proveedores: [],
            categorias: [],
            unidades: [],
            presentaciones: [],
            viasAdministrativas: [],
            tipoVenta: []
          };
  
          prov.data.forEach((item: any) => {
            const proveedorItem: CatalogoItem = { id: item.id_proveedor, valor: item.nombre};
            agrupado.proveedores.push(proveedorItem);
          });
  
          prod.data.forEach((item: any) => {
            const prodItem: CatalogoItem = { id: item.id_producto, valor: item.nombre};
            agrupado.productos.push(prodItem);
          });
  
          cat.data.forEach((item: any) => {
            const catalogoItem: CatalogoItem = { id: item.id_detalle, valor: item.valor };
  
            switch (item.id_catalogo) {
              case 1:
                agrupado.categorias.push(catalogoItem);
                break;
              case 2:
                agrupado.unidades.push(catalogoItem);
                break;
              case 3:
                agrupado.presentaciones.push(catalogoItem);
                break;
              case 4:
                agrupado.viasAdministrativas.push(catalogoItem);
                break;
              case 5:
                agrupado.tipoVenta.push(catalogoItem);
                break;
            }
          });
  
          setCatalogos(agrupado);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Aquí harías la llamada a tu API (PUT o PATCH)
      await fetch(`/api/productos/${data.id_producto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      onClose();
    } catch (err) {
      console.error("Error al actualizar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        form={form}
        initialValues={{ id_tipo_venta: 52, margen: 30 }} 
        labelCol={{ span: 60 }}
        wrapperCol={{ span: 30 }}
        layout="inline"
        style={{ height: "90%", alignItems: "center", marginLeft: "8%" , marginBottom: "2%"}}
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
            // value={productName}
            // onChange={(value) => {
            //   setProductName(value);
            //   const filtered = catalogos.productos?.filter((producto) =>
            //     producto.valor.toLowerCase().includes(value.toLowerCase())
            //   ) || [];
            //   const newOptions = filtered.map(item => ({ value: item.valor, key: item.id }));
            //   setOptions(newOptions);
            // }}
            // onSelect={(value) => setProductName(value)}
            // options={options}
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
            <Radio value={46}> Con Receta </Radio>
            <Radio value={47}> Sin Receta </Radio>
          </Radio.Group>
        </Form.Item>
        
        {errorMsg && (
          <AlertError message={errorMsg} />
        )}
        {successMsg && (
          <AlertSuccess message={successMsg} />
        )}
       
      </Form>
      <Button htmlType="submit" type="primary" loading={loading} style={{marginBottom:"15px", marginLeft:"500px"}}>
          Guardar Cambios
        </Button>
    </>
    
  );
};

export default EditProductForm;
