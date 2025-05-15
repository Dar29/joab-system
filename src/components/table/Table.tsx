'use client';

import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
    ModuleRegistry,
    themeAlpine,
    themeBalham,
    themeMaterial,
    themeQuartz,
} from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";

ModuleRegistry.registerModules([AllEnterpriseModule]);

interface TableProps {
    rowData: any[];
    columnDefs: any[];
}

const Table: React.FC<TableProps> = ({ rowData, columnDefs }) => {

    const defaultColDef = {
        editable: true,
        flex: 1,
        minWidth: 160,
        filter: true,
        sortable: true,  // Añadido sortable para que las columnas se puedan ordenar
        resizable: true, // Añadido resizable para que las columnas se puedan redimensionar
        headerStyle: {
          whiteSpace: 'normal',
          lineHeight: '1.5',
          textAlign: 'center',
        }
    };


    return (
        <div style={{ height: "60%", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", padding: "5px" }}>
                  <input
                    type="text"
                    placeholder="Buscar..."
                    style={{
                      padding: "0.5rem",
                      fontSize: "1rem",
                      flex: 1,
                      marginRight: "1rem",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </div>
      <AgGridReact
        className={'ag-theme-quartz'}
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        sideBar  // Habilita la barra lateral para la selección de columnas
      />
    </div>
  );
};

export default Table;