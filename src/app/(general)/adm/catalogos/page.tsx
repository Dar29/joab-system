'use client';
import React, { useState, useEffect } from 'react';
import {
  Table,
  Modal,
  Form,
  Input,
  Button,
  Popconfirm,
  Switch,
  Space,
  message,
  Spin,
  Typography,
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface Catalog {
  id_catalogo: number;
  nombre: string;
  descripcion: string;
}

interface CatalogDetail {
  id_detalle: number;
  id_catalogo: number;
  valor: string;
  descripcion: string;
}

const API_BASE_URL = 'http://localhost:3000/api';
const CATALOGS_API_URL = `${API_BASE_URL}/catalogs`;
const CATALOG_DETAILS_API_URL = `${API_BASE_URL}/catalogs-details`;

const Catalogs: React.FC = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [catalogDetails, setCatalogDetails] = useState<CatalogDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isCatalogModalVisible, setIsCatalogModalVisible] = useState(false);
  const [editingCatalog, setEditingCatalog] = useState<Catalog | null>(null);
  const [catalogForm] = Form.useForm();

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [editingDetail, setEditingDetail] = useState<CatalogDetail | null>(null);
  const [currentCatalogIdForDetails, setCurrentCatalogIdForDetails] = useState<number | null>(null);
  const [detailForm] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, detRes] = await Promise.all([
          fetch(CATALOGS_API_URL),
          fetch(CATALOG_DETAILS_API_URL),
        ]);
        if (!catRes.ok) throw new Error(catRes.statusText);
        if (!detRes.ok) throw new Error(detRes.statusText);

        const [catData, detData] = await Promise.all([catRes.json(), detRes.json()]);

        setCatalogs(catData.data);
        setCatalogDetails(detData.data);
      } catch (err: any) {
        setError(err.message);
        message.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddCatalog = () => {
    setEditingCatalog(null);
    catalogForm.resetFields();
    setIsCatalogModalVisible(true);
  };

  const handleEditCatalog = (record: Catalog) => {
    setEditingCatalog(record);
    catalogForm.setFieldsValue({
      nombre: record.nombre,
      descripcion: record.descripcion,
    });
    setIsCatalogModalVisible(true);
  };

  const handleDeleteCatalog = async (record: Catalog) => {
    try {
      const res = await fetch(`${CATALOGS_API_URL}/${record.id_catalogo}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(res.statusText);
      setCatalogs(prev => prev.filter(c => c.id_catalogo !== record.id_catalogo));
      setCatalogDetails(prev => prev.filter(d => d.id_catalogo !== record.id_catalogo));
      message.success('Catálogo eliminado');
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const onCatalogFormFinish = async (values: { nombre: string; descripcion: string }) => {
    try {
      if (editingCatalog) {
        const res = await fetch(`${CATALOGS_API_URL}/${editingCatalog.id_catalogo}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error(res.statusText);
        setCatalogs(prev =>
          prev.map(c =>
            c.id_catalogo === editingCatalog.id_catalogo ? { ...c, ...values } : c
          )
        );
        message.success('Catálogo actualizado');
      } else {
        const res = await fetch(CATALOGS_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error(res.statusText);
        const newCatalog = await res.json();
        setCatalogs(prev => [...prev, newCatalog]);
        message.success('Catálogo agregado');
      }
      setIsCatalogModalVisible(false);
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleAddDetail = (catalogId: number) => {
    setEditingDetail(null);
    detailForm.resetFields();
    setCurrentCatalogIdForDetails(catalogId);
    setIsDetailModalVisible(true);
  };

  const handleEditDetail = (record: CatalogDetail) => {
    setEditingDetail(record);
    detailForm.setFieldsValue({
      valor: record.valor,
      descripcion: record.descripcion,
    });
    setCurrentCatalogIdForDetails(record.id_catalogo);
    setIsDetailModalVisible(true);
  };

  const handleDeleteDetail = async (record: CatalogDetail) => {
    try {
      const res = await fetch(`${CATALOG_DETAILS_API_URL}/${record.id_detalle}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(res.statusText);
      setCatalogDetails(prev => prev.filter(d => d.id_detalle !== record.id_detalle));
      message.success('Detalle eliminado');
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const onDetailFormFinish = async (values: { valor: string; descripcion: string; estado: boolean }) => {
    if (currentCatalogIdForDetails === null) return;
    const payload = {
      valor: values.valor,
      descripcion: values.descripcion,
      estado: values.estado ? 1 : 0,
      id_catalogo: currentCatalogIdForDetails,
    };

    try {
      if (editingDetail) {
        const res = await fetch(`${CATALOG_DETAILS_API_URL}/${editingDetail.id_detalle}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(res.statusText);
        setCatalogDetails(prev =>
          prev.map(d => (d.id_detalle === editingDetail.id_detalle ? { ...d, ...payload } : d))
        );
        message.success('Detalle actualizado');
      } else {
        const res = await fetch(CATALOG_DETAILS_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(res.statusText);
        const newDetail = await res.json();
        setCatalogDetails(prev => [...prev, newDetail]);
        message.success('Detalle agregado');
      }
      setIsDetailModalVisible(false);
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const catalogColumns = [
    { title: 'ID', dataIndex: 'id_catalogo', key: 'id_catalogo' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: any, record: Catalog) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEditCatalog(record)}>
            Editar
          </Button>
          <Popconfirm
            title="Eliminar catálogo?"
            onConfirm={() => handleDeleteCatalog(record)}
          >
            <Button danger icon={<DeleteOutlined />}>Eliminar</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const detailColumns = [
    { title: 'ID', dataIndex: 'id_detalle', key: 'id_detalle' },
    { title: 'Valor', dataIndex: 'valor', key: 'valor' },
    { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: any, record: CatalogDetail) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEditDetail(record)}>
            Editar
          </Button>
          <Popconfirm
            title="Eliminar detalle?"
            onConfirm={() => handleDeleteDetail(record)}
          >
            <Button danger icon={<DeleteOutlined />}>Eliminar</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const expandedRowRender = (catalog: Catalog) => {
    const data = catalogDetails.filter(d => d.id_catalogo === catalog.id_catalogo);
    return (
      <div>
        <Space style={{ marginBottom: 16 }}>
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleAddDetail(catalog.id_catalogo)}
          >
            Agregar Detalle
          </Button>
        </Space>
        <Table
          columns={detailColumns}
          dataSource={data}
          pagination={false}
          rowKey="id_detalle"
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div
        style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red', padding: 20 }}>
        Error: {error} <Button onClick={() => window.location.reload()}>Recargar</Button>
      </div>
    );
  }

  return (
   <div style={{ height: "100vh", display: "flex", flexDirection: "column"}}>
      <Typography.Title level={3} style={{ paddingLeft: '1rem', paddingTop:'1rem'}}>
        Gestion de Catalogos
      </Typography.Title>
      <div style={{ padding: "10px" }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCatalog} style={{ marginBottom: 16, marginLeft: '80%'}}>
        Agregar Catálogo
      </Button>
        <Table
        columns={catalogColumns}
        dataSource={catalogs}
        expandable={{ expandedRowRender }}
        rowKey="id_catalogo"
        pagination={{ showSizeChanger: true }}
      />

      <Modal
        title={editingCatalog ? 'Editar Catálogo' : 'Nuevo Catálogo'}
        open={isCatalogModalVisible}
        footer={null}
        onCancel={() => setIsCatalogModalVisible(false)}
      >
        <Form form={catalogForm} layout="vertical" onFinish={onCatalogFormFinish}>
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="descripcion" label="Descripción" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button onClick={() => setIsCatalogModalVisible(false)} style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit">
              {editingCatalog ? 'Guardar' : 'Agregar'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal - Detalle */}
      <Modal
        title={editingDetail ? 'Editar Detalle' : 'Nuevo Detalle'}
        open={isDetailModalVisible}
        footer={null}
        onCancel={() => setIsDetailModalVisible(false)}
      >
        <Form form={detailForm} layout="vertical" onFinish={onDetailFormFinish}>
          <Form.Item name="valor" label="Valor" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="descripcion" label="Descripción" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button onClick={() => setIsDetailModalVisible(false)} style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit">
              {editingDetail ? 'Guardar' : 'Agregar'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      </div>
      
    </div>
  );
};

export default Catalogs;
