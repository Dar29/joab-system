'use client'

import FormProduct from "@/src/components/FormProduct";
import React, { useState, useEffect } from 'react';
import { Catalogos, CatalogoItem } from "@/src/types/catalogs"; // Ajusta ruta si es diferente
import { Spin } from "antd";

const IngresarProducto = () => {
  const [catalogos, setCatalogos] = useState<Catalogos>({
    productos:[],
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
        const productos = await fetch('http://localhost:3000/api/products');
        if (!catalogos.ok) {
          throw new Error(`HTTP error! status: ${catalogos.status}`);
        }
        if (!proveedores.ok) {
          throw new Error(`HTTP error! status: ${proveedores.status}`);
        }
        if (!productos.ok) {
          throw new Error(`HTTP error! status: ${proveedores.status}`);
        }

        const cat = await catalogos.json();
        const prov = await proveedores.json();
        const prod = await productos.json();

        const agrupado: Catalogos = {
          productos:[],
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

        prod.data.forEach((item: any) => {
          const prodItem: CatalogoItem = { id: item.id_producto, valor: item.nombre};
          agrupado.productos.push(prodItem);
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

  const handleProductAddedToCatalog = (newProduct: CatalogoItem) => {
    setCatalogos(prevCatalogos => ({
      ...prevCatalogos,
      productos: [...prevCatalogos.productos, newProduct], // Añade el nuevo producto al array de productos
    }));
  };

  return (
    <>
      {loading ? (
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
      ) : error ? (
         <div>Error: {error}</div>
      ) : (
        <FormProduct catalogos={catalogos} onProductAdded={handleProductAddedToCatalog}/>
      )}
    </>
  );
};

export default IngresarProducto;
