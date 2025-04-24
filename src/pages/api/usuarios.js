import getConnection from '../../server/db.js';

export async function GET() {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM usuarios');

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener usuarios' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}