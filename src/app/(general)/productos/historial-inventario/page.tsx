'use client'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HistorialInventario = () => {
  const router = useRouter();
  const { id_producto } = router.query;

  useEffect(() => {
    if (id_producto) {
      // Aquí puedes usar el id_producto para hacer fetch, etc.
      console.log('ID del producto:', id_producto);
    }
  }, [id_producto]);

  return (
    <div>
      <h1>Historial de Inventario</h1>
      {id_producto && <p>ID del producto: {id_producto}</p>}
    </div>
  );
};

export default HistorialInventario;
