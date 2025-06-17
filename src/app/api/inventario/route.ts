import { NextRequest, NextResponse } from 'next/server';
import { executeSP, } from '@/src/db/connection';  

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id_producto');
    

    if (!id) {
      return NextResponse.json({
        message: 'Error: id_producto parameter is missing.',
      }, { status: 400 }); 
    }

    const tracking = await executeSP('sp_get_inventario_by_id', { id_producto: id });;

    return NextResponse.json({
      message: 'Datos obtenidos correctamente',
      data: tracking,
    });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return NextResponse.json({
      message: 'Error al obtener los datos',
      error: error,
    }, { status: 500 });
  }
}