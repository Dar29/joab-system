
'use client'

import React, { useState } from 'react';
import { Box } from '@mui/material';
import EditButton from "./EditButton";
import InventoryButton from "./InventoryButton";
import ExitButton from "./ExitButton";
import { useRouter } from 'next/navigation';


interface ActionButtonsRendererProps {
  data: any;
}

const ActionButtonsRenderer: React.FC<ActionButtonsRendererProps> = ({ data }) => {
const router = useRouter();

  const handleEditClick = () => {
    console.log('Editar clicado para el producto:', data.id_producto);
  };

  const handleViewInventoryClick = () => {
      router.push(`/productos/historial-inventario/${data.id_producto}`);
  };

  const handleDeactivateClick = () => {
    console.log('Dar de Baja clicado para el producto:', data.id_producto);
  };

  return (
    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <EditButton title="Editar" onClick={handleEditClick} />
      <InventoryButton title="Ver Movimientos" onClick={handleViewInventoryClick} />
      <ExitButton title="Dar de Baja" onClick={handleDeactivateClick} />
    </Box>
  );
};

export default ActionButtonsRenderer;
