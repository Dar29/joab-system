import { NextRequest, NextResponse } from 'next/server';
import { queryView } from '@/src/db/connection';  // Asegúrate de importar la función de consulta

export async function GET(request: NextRequest) {
  try {

    const catalogo = await queryView(`tbl_catalogos_detalles`);

    return NextResponse.json({
      message: 'Datos obtenidos correctamente',
      data: catalogo,
    });
  } catch (error) {
    console.error('Error al obtener los catálogos:', error);
    return NextResponse.json({
      message: 'Error al obtener los datos',
      error: error,
    }, { status: 500 });
  }
}

