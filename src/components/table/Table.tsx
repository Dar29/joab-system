'use client';

import React, { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {ModuleRegistry} from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import AddButton from "../AddButton";
import ButtonComponent from "../ExportButton";


ModuleRegistry.registerModules([AllEnterpriseModule]);

interface TableProps {
  rowData: any[];
  columnDefs: any[];
}

const Table: React.FC<TableProps> = ({ rowData, columnDefs }) => {
  const gridRef = useRef<AgGridReact>(null);

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
    console.log("Agregar producto clickeado");
  };

  const handleExport = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsExcel(); // Esto exporta a Excel
    }
  };

  return (
    <div style={{ height: "90%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "5px" }}>
        <AddButton title="Agregar producto" onClick={handleAddProduct} />
        <input
          type="text" placeholder="Buscar..."
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            flex: 1,
            marginRight: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <ButtonComponent onClick={handleExport} />
      </div>
      <AgGridReact
        ref={gridRef}
        className={'ag-theme-quartz'}
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        sideBar
      />
    </div>
  );
};

export default Table;
