import { NextRequest, NextResponse } from 'next/server';
import { queryView } from '@/src/db/connection';  // Asegúrate de importar la función de consulta

export async function GET(request: NextRequest) {
  try {
    const productos = await queryView('tbl_proveedores');
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
