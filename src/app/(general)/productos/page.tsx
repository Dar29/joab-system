
'use client';

import React, { useState, useEffect } from 'react';
import Table from '@/src/components/table/Table'; // Asegúrate de que la ruta es correcta

const columnDefs = [
    { field: "id_producto",headerName: "Código" },
    { field: "nombre", headerName: "Nombre" },
    { field: "descripcion", headerName: "Descripción" },
    { field: "precio_compra", headerName: "Precio Compra" },
    { field: "precio_venta", headerName: "Precio Venta" },
    { field: "stock", headerName: "Stock" },
    { field: "id_proveedor", headerName: "Código Proveedor" },
    { field: "id_categoria_detalle", headerName: "Código Categoría" },
    { field: "fecha_ingreso", headerName: "Fecha Ingreso" },
    { field: "fecha_vencimiento", headerName: "Fecha Vencimiento" },
    { field: "fecha_grabacion", headerName: "Fecha Grabación" },
    { field: "fecha_modificacion", headerName: "Fecha Modificación" },
    { field: "usuario_graba", headerName: "Usuario Graba" },
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

        const response = await fetch('http://localhost:3000/api/products'); // Reemplaza con la URL de tu endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const resp = await response.json();
        setRowData(resp.data);
      } catch (error: any) {
        // 5. Manejar errores
        setError(error.message);
      } finally {
        // 6. Indicar que la carga ha terminado, ya sea con éxito o error
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
      console.log("rowData ACTUALIZADO (en la siguiente renderización):", rowData);
    
  }, [rowData]);

  if (loading) {
    return <div>Loading...</div>;
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