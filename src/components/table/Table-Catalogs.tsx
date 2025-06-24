'use client';

import React, { useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import AddButton from "../AddButton";
import ExportButton from "../ExportButton";
import { useRouter } from 'next/navigation';
import { Table } from "antd";

ModuleRegistry.registerModules([AllEnterpriseModule]);

interface TableProps {
  rowData: any[];
  columnDefs: any[];
}

const initialCatalogs = [
  {
    id_catalogo: 1,
    nombre: 'Colores',
    descripcion: 'Catálogo de colores disponibles',
  },
  {
    id_catalogo: 2,
    nombre: 'Tallas',
    descripcion: 'Catálogo de tallas de ropa',
  },
  {
    id_catalogo: 3,
    nombre: 'Materiales',
    descripcion: 'Tipos de materiales para fabricación',
  },
];

const initialCatalogDetails = [
  { id_detalle: 1, id_catalogo: 1, valor: 'Rojo', descripcion: 'Color rojo vibrante', estado: true },
  { id_detalle: 2, id_catalogo: 1, valor: 'Azul', descripcion: 'Color azul marino', estado: true },
  { id_detalle: 3, id_catalogo: 1, valor: 'Verde', descripcion: 'Color verde esmeralda', estado: false },
  { id_detalle: 4, id_catalogo: 2, valor: 'S', descripcion: 'Talla pequeña', estado: true },
  { id_detalle: 5, id_catalogo: 2, valor: 'M', descripcion: 'Talla mediana', estado: true },
  { id_detalle: 6, id_catalogo: 2, valor: 'L', descripcion: 'Talla grande', estado: true },
  { id_detalle: 7, id_catalogo: 3, valor: 'Algodón', descripcion: 'Fibra natural', estado: true },
  { id_detalle: 8, id_catalogo: 3, valor: 'Poliéster', descripcion: 'Material sintético', estado: true },
];

const TableCatalogs: React.FC<TableProps> = ({ rowData, columnDefs }) => {
  const gridRef = useRef<AgGridReact>(null);
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>(rowData);

  useEffect(() => {
    // Filtrado simple: convierte cada fila en string y revisa si incluye el texto
    const lowerSearch = searchText.toLowerCase();
    const result = rowData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(lowerSearch)
      )
    );
    setFilteredData(result);
  }, [searchText, rowData]);
  

  const defaultColDef = {
    editable: true,
    minWidth: 70,
    filter: true,
    sortable: true,
    resizable: true,
    headerStyle: {
      whiteSpace: 'normal',
      lineHeight: '1.5',
      textAlign: 'center',
    }
  };

  const handleAddProduct = () => {
    router.push('/productos/ingresar-producto');
  };

  const handleExport = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsExcel();
    }
  };

  return (
    <div style={{ height: "70%", display: "flex", flexDirection: "column" ,margin:"1%"}}>
      {/* <Table
          columns={catalogColumns}
          dataSource={catalogs}
          expandable={{ expandedRowRender }}
          rowKey="id_catalogo"
          className="rounded-lg overflow-hidden border border-gray-200"
          pagination={{
            pageSizeOptions: ['5', '10', '20'],
            showSizeChanger: true,
            defaultPageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} ítems`,
          }}
        /> */}
    </div>
  );
};

export default TableCatalogs;
