import { NextRequest, NextResponse } from 'next/server';
import { executeSP, insertData, queryView } from '@/src/db/connection';  // Asegúrate de importar la función de consulta

export async function GET(request: NextRequest) {
  try {
    const productos = await queryView('products_view');
    return NextResponse.json({
      message: 'Datos obtenidos correctamente',
      data: productos,
    });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return NextResponse.json({
      message: 'Error al obtener los datos',
      error: error,
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // Obtiene el JSON enviado desde el cliente

    // Validación básica
    if (
      body.fecha_vencimiento !== undefined ||
      body.stock !== undefined ||
      body.precio_compra !== undefined ||
      body.precio_venta !== undefined
    ) {
      if(body.stock === undefined || body.stock <= 0)
      {
        return NextResponse.json(
          { message: 'Debe ingresar cantidad y tiene que ser mayor a 0' },
          { status: 400 }
        );
      }
      if (
        !body.fecha_vencimiento ||
        body.stock === undefined || body.stock <= 0 ||
        body.precio_compra === undefined ||
        body.precio_venta === undefined ||
        body.id_proveedor == undefined
      ) {
        return NextResponse.json(
          { message: 'Para registrar ingreso debe llenar todos los campos' },
          { status: 400 }
        );
      }
    }


    // Insertar en la base de datos
    const result = await executeSP('sp_inserta_producto', body);

    return NextResponse.json({
      message: 'Producto insertado correctamente',
      data: result,
    });
  } catch (error) {
    console.error('Error al insertar el producto:', error);
    return NextResponse.json({
      message: 'Error al insertar el producto',
      error: error,
    }, { status: 500 });
  }
}