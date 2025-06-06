'use client'

import React, { useState } from 'react';
import { Box } from '@mui/material';
import EditButton from "./EditButton";
import InventoryButton from "./InventoryButton";
import TrackingButton from "./HistoryButton";
import ModalComponent from './Modal'; // ⬅️ Asegúrate de importar el modal
import { useRouter } from 'next/navigation';

interface ActionButtonsRendererProps {
  data: any;
}

const ActionButtonsRenderer: React.FC<ActionButtonsRendererProps> = ({ data }) => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    console.log('Editar clicado para el producto:', data.id_producto);
  };

  const handleViewInventoryClick = () => {
    setModalOpen(true); // 👈 Abre el modal
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

      {/* 👇 Modal que se abre con el botón de Inventario */}
      <ModalComponent
        title="Inventario del producto"
        open={modalOpen}
        loading={loading}
        id={data.id_producto}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default ActionButtonsRenderer;
