'use client'

import React, { useState } from 'react';
import { Box } from '@mui/material';
import EditButton from "./EditButton";
import InventoryButton from "./InventoryButton";
import TrackingButton from "./HistoryButton";
import ModalComponent from './Modal'; // ⬅️ Asegúrate de importar el modal
import { useRouter } from 'next/navigation';
import EditProductForm from './FormEdit';

interface ActionButtonsRendererProps {
  data: any;
}

const ActionButtonsRenderer: React.FC<ActionButtonsRendererProps> = ({ data }) => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    setModalOpen(true);
    console.log('Editar clicado para el producto:', data.id_producto);
  };

  const handleViewInventoryClick = () => {
    
  };

  const handleHistoryClick = () => {
    router.push(`/productos/historial-inventario/${data.id_producto}`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <EditButton title="Agregar inventario" onClick={handleEditClick} />
        <InventoryButton title="Ver Inventario" onClick={handleViewInventoryClick} />
        <TrackingButton title="Ver historial" onClick={handleHistoryClick} />
      </Box>

      <ModalComponent
        title="Editar producto"
        open={modalOpen}
        loading={false} // El loading ahora lo gestiona el form
        onCancel={() => setModalOpen(false)}
      >
        <EditProductForm data={data} onClose={() => setModalOpen(false)} />
      </ModalComponent>
    </>
  );
};

export default ActionButtonsRenderer;
