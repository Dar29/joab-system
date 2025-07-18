import sql, { pool } from 'mssql';

const config = {
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  server: process.env.DB_SERVER || '',
  database: process.env.DB_NAME || '',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'false', // true para conexiones cifradas
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true', // ignora el certificado si es necesario
  },
};


export const queryView = async (name: string) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM ${name}`);
    await pool.close();
    return result.recordset;
  } catch (error) {
    console.error(`❌ Error al consultar la vista ${name}:`, error);
    throw error;
  }
};

export const executeSP = async (spName: string, body: Record<string, any>) => {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    // Recorrer los campos del JSON y agregarlos como parámetros
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        request.input(key, body[key]);
      }
    }

    const result = await request.execute(spName);
    await pool.close();

    return result.recordset;
  } catch (error) {
    console.error(`❌ Error al ejecutar el SP ${spName}:`, error);
    throw error;
  }
};

export async function insertData(table: string, data: Record<string, any>) {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    const keys = Object.keys(data);
    const columns = keys.join(', ');
    const values = keys.map(key => `@${key}`).join(', ');

    // Agregar parámetros al request
    keys.forEach(key => {
      request.input(key, data[key]);
    });

    const query = `INSERT INTO ${table} (${columns}) VALUES (${values}); SELECT SCOPE_IDENTITY() AS id;`;
    const result = await request.query(query);

    await pool.close();
    return result.recordset[0]; // devuelve el ID insertado
  } catch (error) {
    console.error(`❌ Error al insertar en ${table}:`, error);
    throw error;
  }
}
