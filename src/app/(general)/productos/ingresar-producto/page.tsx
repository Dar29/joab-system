'use client'

import FormProduct from "@/src/components/FormProduct";
import React, { useState, useEffect } from 'react';
import { Catalogos, CatalogoItem } from "@/src/types/catalogs"; // Ajusta ruta si es diferente

const IngresarProducto = () => {
  const [catalogos, setCatalogos] = useState<Catalogos>({
    proveedores: [],
    categorias: [],
    unidades: [],
    presentaciones: [],
    viasAdministrativas: [],
    tipoVenta: []
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const catalogos = await fetch('http://localhost:3000/api/catalogs');
        const proveedores = await fetch('http://localhost:3000/api/proveedores')
        if (!catalogos.ok) {
          throw new Error(`HTTP error! status: ${catalogos.status}`);
        }
        if (!proveedores.ok) {
          throw new Error(`HTTP error! status: ${proveedores.status}`);
        }

        const cat = await catalogos.json();
        const prov = await proveedores.json();

        const agrupado: Catalogos = {
          proveedores: [],
          categorias: [],
          unidades: [],
          presentaciones: [],
          viasAdministrativas: [],
          tipoVenta: []
        };

        prov.data.forEach((item: any) => {
          const proveedorItem: CatalogoItem = { id: item.id_proveedor, valor: item.nombre};
          agrupado.proveedores.push(proveedorItem);
        });


        cat.data.forEach((item: any) => {
          const catalogoItem: CatalogoItem = { id: item.id_detalle, valor: item.valor };

          switch (item.id_catalogo) {
            case 1:
              agrupado.categorias.push(catalogoItem);
              break;
            case 2:
              agrupado.unidades.push(catalogoItem);
              break;
            case 3:
              agrupado.presentaciones.push(catalogoItem);
              break;
            case 4:
              agrupado.viasAdministrativas.push(catalogoItem);
              break;
            case 5:
              agrupado.tipoVenta.push(catalogoItem);
              break;
          }
        });

        setCatalogos(agrupado);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <p>Cargando catálogos...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <FormProduct catalogos={catalogos} />
      )}
    </>
  );
};

export default IngresarProducto;
