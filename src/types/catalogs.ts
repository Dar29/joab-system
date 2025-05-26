export interface DataProductos {
    productos: Producto[];
}

export interface DataCatalogos {
    catalogos: Catalogos[];
}

export interface Producto {
    id_producto: number;
    nombre: string;
    descripcion: number;
}

export interface CatalogoItem {
  id: number;
  valor: string;
}

export interface Catalogos {
  proveedores: CatalogoItem[];
  categorias: CatalogoItem[];
  unidades: CatalogoItem[];
  presentaciones: CatalogoItem[];
  viasAdministrativas: CatalogoItem[];
  tipoVenta: CatalogoItem[];
}




