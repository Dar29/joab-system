import { NextRequest, NextResponse } from 'next/server';
import { insertData, queryView } from '@/src/db/connection';  // Asegúrate de importar la función de consulta

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
    if (!body.nombre || !body.precio_compra || !body.precio_venta || !body.stock || !body.fecha_vencimiento || !body.fecha_grabacion
      || !body.fecha_grabacion || !body.usuario_graba
    ) {
      return NextResponse.json({
        message: 'Faltan campos obligatorios',
      }, { status: 400 });
    }

    // Insertar en la base de datos
    const result = await insertData('tbl_productos', body);

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