'use client';

import React, { useState, useEffect } from 'react';
import Table from '@/src/components/table/Table'; // Asegúrate de que la ruta es correcta
import { Spin } from 'antd';
import ActionButtonsRenderer from '@/src/components/ActionButtonsRenderer';

const columnDefs = [
    {
        field: "actions",
        headerName: "Acciones",
        width: 115, // Es posible que quieras aumentar el ancho para acomodar todos los botones
        sortable: false,
        filter: false,
        resizable: false,
        editable: false,
        pinned: 'left',
        cellRenderer: ActionButtonsRenderer,
        cellRendererParams: {
            // Puedes pasar parámetros adicionales a tu renderizador de celda si es necesario
            // Por ejemplo, si tuvieras un manejador de edición global:
            // onEdit: (id) => console.log('Edición global para', id)
        }
    },
    { field: "id_producto", headerName: "Código", width: 120, hide: true},
    { field: "nombre", headerName: "Nombre", width: 220, pinned: 'left'},
    { field: "precio_venta", headerName: "Precio Venta", width: 150, pinned: 'left'},
    { field: "categoria", headerName: "Categoría" },
    { field: "presentacion", headerName: "Presentación" },
    { field: "stock", headerName: "Stock", width: 110, pinned: 'left'},
    { field: "dosis", headerName: "Dósis" },
    { field: "venta", headerName: "Tipo de Venta" },
    { field: "descripcion", headerName: "Descripción" },
    { field: "precio_compra", headerName: "Precio Compra", hide: true },
    { field: "proveedor", headerName: "Proveedor" },
    {
      field: "fecha_grabacion",
      headerName: "Fecha Grabación", hide: true,
      valueFormatter: (params: any) => { // Removed : any type annotation for cleaner code
        const rawDate = params.value;
        if (!rawDate) return ''; // si es null, undefined o vacío
        const date = new Date(rawDate);
        return isNaN(date.getTime())
          ? ''
          : `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      },
    },
    {
      field: "usuario_graba",
      headerName: "Usuario Graba", hide: true
    },
    {
      field: "fecha_modificacion",
      headerName: "Fecha Modificación", hide: true,
      valueFormatter: (params: any) => { 
        const rawDate = params.value;
        if (!rawDate) return '';
        const date = new Date(rawDate);
        return isNaN(date.getTime())
          ? ''
          : `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      },
    },
    { field: "usuario_modifica", headerName: "Usuario Modifica" , hide: true},
];

const Page = () => {
    const [rowData, setRowData] = useState([]); // Estado para los datos
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

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
            <h1 style={{paddingLeft: "2rem", textAlign: "left", color:"#005f3e"}}>
                Inventario de Productos
            </h1>
            <div style={{ flex: 1}}>
                <Table rowData={rowData} columnDefs={columnDefs} />
            </div>
        </div>
    );
};

export default Page;
