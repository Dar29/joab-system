'use client';

import Table from '@/src/components/table/Table';
import TableComp from '@/src/components/Tracking';
import { Spin, Typography } from 'antd';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const columns = [
    { field: "Movimiento", headerName: "Movimiento", width: 150},
    { field: "descripcion", headerName: "Descripcion", width: 350},
    { field: "cantidad", headerName: "Cantidad", width: 150},
    { field: "FechaMovimiento", headerName: "Fecha Movimiento"},
    { field: "FechaVencimiento", headerName: "Fecha Vencimiento"},
    { field: "usuario_responsable", headerName: "Usuario Responsable"},
    { field: "Estado", headerName: "Estado"},
  ];


const HistorialInventario = () => {
  const params = useParams();
  const id_producto = params?.id_producto;

  const [rowData, setRowData] = useState([]); // Estado para los datos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  
  useEffect(() => {
    const fetchData = async () => {
    try {
      setLoading(true);
  
      const response = await fetch(`http://localhost:3000/api/tracking?id_producto=${id_producto}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        const resp = await response.json();
        console.log(resp.data)
        setRowData(resp.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };fetchData();
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
      <Typography.Title level={3} style={{ paddingLeft: '1rem'}}>
        Movimientos de Inventario
      </Typography.Title>
      <div style={{ flex: 1}}>
        <TableComp rowData={rowData} columnDefs={columns} />
      </div>
    </div>
  );
};

export default HistorialInventario;
