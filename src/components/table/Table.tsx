'use client';

import React, { useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import AddButton from "../AddButton";
import ExportButton from "../ExportButton";
import { useRouter } from 'next/navigation';

ModuleRegistry.registerModules([AllEnterpriseModule]);

interface TableProps {
  rowData: any[];
  columnDefs: any[];
}

const Table: React.FC<TableProps> = ({ rowData, columnDefs }) => {
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
    <div style={{ height: "70%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "3px" }}>
        <AddButton title="Agregar producto" onClick={handleAddProduct} />
        <input
          type="text"
          placeholder="Buscar..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            flex: 1,
            marginRight: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <ExportButton onClick={handleExport} />
      </div>
      <AgGridReact
        ref={gridRef}
        className={'ag-theme-quartz'}
        columnDefs={columnDefs}
        rowData={filteredData}
        defaultColDef={defaultColDef}
        sideBar={{
          toolPanels: [
            {
              id: 'columns',
              labelDefault: 'Columnas',
              labelKey: 'columns',
              iconKey: 'columns',
              toolPanel: 'agColumnsToolPanel',
            },
            {
              id: 'filters',
              labelDefault: 'Filtros',
              labelKey: 'filters',
              iconKey: 'filter',
              toolPanel: 'agFiltersToolPanel',
            },
          ],
          defaultToolPanel: undefined,
        }}
      />
    </div>
  );
};

export default Table;
