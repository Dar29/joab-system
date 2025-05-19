
'use client';

import React, { useState, useEffect } from 'react';
import Table from '@/src/components/table/Table'; // Asegúrate de que la ruta es correcta
import { Spin } from 'antd';

const columnDefs = [
    { field: "id_producto",headerName: "Código" },
    { field: "nombre", headerName: "Nombre", width:250},
    { field: "precio_venta", headerName: "Precio Venta" },
    { field: "categoria", headerName: "Categoría" },
    { field: "presentacion", headerName: "Presentación" },
    { field: "stock", headerName: "Stock" },
    { field: "dosis", headerName: "Dósis" },
    { field: "venta", headerName: "Tipo de Venta" },
    { field: "descripcion", headerName: "Descripción" },
    { field: "precio_compra", headerName: "Precio Compra" },
    { field: "proveedor", headerName: "Proveedor" },
    {
      field: "fecha_vencimiento",
      headerName: "Fecha Vencimiento",
      valueFormatter: (params: any) => {
        const date = new Date(params.value);
        return isNaN(date.getTime())
          ? ''
          : `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      },
    },
    {
      field: "fecha_grabacion",
      headerName: "Fecha Grabación",
      valueFormatter: (params: any) => {
        const date = new Date(params.value);
        return isNaN(date.getTime())
          ? ''
          : `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      },
    },
    { field: "usuario_graba", headerName: "Usuario Graba" },
    {
      field: "fecha_modificacion",
      headerName: "Fecha Modificación",
      valueFormatter: (params: any) => {
        const date = new Date(params.value);
        return isNaN(date.getTime())
          ? ''
          : `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      },
    },
    { field: "usuario_modifica", headerName: "Usuario Modifica" },
];

const Page = () => {
  const [rowData, setRowData] = useState<any[]>([]); // Estado para los datos
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const resp = await response.json();
        setRowData(resp.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
      console.log("rowData ACTUALIZADO (en la siguiente renderización):", rowData);
    
  }, [rowData]);

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
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column"}}>
      <h1 style={{ flex: 0, padding: "1rem", textAlign: "left", color:"#005f3e"}}>
        Inventario de Productos
      </h1>
      <div style={{ flex: 1}}>
        <Table rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  );
};

export default Page;