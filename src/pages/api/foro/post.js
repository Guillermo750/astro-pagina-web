// src/pages/api/foro/posts.js
import { getConnectionForo } from '../../../server/db'; // Importa la función para conectar a la base de datos del foro
// Ajusta la ruta según la ubicación de tu archivo db.js

// Función asíncrona que manejará la petición GET a /api/foro/posts
export async function GET() {
  try {
    // Establece una conexión a la base de datos del foro
    const connectionForo = await getConnectionForo();
    // Ejecuta una consulta SQL para seleccionar todos los datos de la tabla de publicaciones del foro
    // Ajusta la consulta y los nombres de las columnas para que coincidan con tu tabla 'publicaciones'
    const [rows] = await connectionForo.execute('SELECT id, titulo, contenido, id_usuario, fecha_creacion FROM publicaciones');

    // Devuelve una respuesta exitosa (200 OK) con los datos de las publicaciones en formato JSON
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json' // Indica que la respuesta es en formato JSON
      }
    });
  } catch (error) {
    // Si ocurre algún error durante el proceso (conexión a la base de datos, consulta, etc.)
    console.error('Error al obtener publicaciones del foro:', error);
    // Devuelve una respuesta de error 500 (Error interno del servidor) con un mensaje de error en formato JSON
    return new Response(JSON.stringify({ error: 'Error al obtener publicaciones del foro' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json' // Indica que la respuesta es en formato JSON
      }
    });
  }
}