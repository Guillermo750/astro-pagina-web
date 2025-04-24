// src/pages/api/login.js
import { getConnectionComunidad } from '../../server/db'; // Importa la función para conectar a la base de datos de la comunidad
import bcrypt from 'bcrypt'; // Importa la librería para hashear y comparar contraseñas
import { withIronSessionApiRoute } from 'iron-session/next'; // Importa el middleware para gestionar sesiones (si estás usando iron-session)
// Ajusta la importación si usas otro gestor de sesiones

// Configuración de la sesión (si usas iron-session)
const sessionOptions = {
  password: 'tu_contraseña_secreta_y_larga_para_la_sesion', // ¡Reemplaza esto con una contraseña segura y larga!
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // Solo usar cookies seguras en producción (HTTPS)
  },
};

// Función asíncrona que manejará la petición POST a /api/login
async function loginRoute(req, res) {
  // Obtiene el nombre de usuario y la contraseña del cuerpo de la petición (enviados por el formulario de inicio de sesión)
  const { username, password } = await req.body;

  try {
    // Establece una conexión a la base de datos de la comunidad
    const connectionComunidad = await getConnectionComunidad();
    // Ejecuta una consulta preparada para buscar un usuario por su nombre de usuario
    // Selecciona los campos necesarios para la autenticación (id, nombre de usuario, contraseña hasheada, y otros que necesites)
    const [rowsComunidad] = await connectionComunidad.execute(
      'SELECT id, nombre_usuario, contraseña_hash, email /* Agrega aquí otros campos que necesites de la tabla de usuarios de la comunidad */ FROM usuarios WHERE nombre_usuario = ?',
      [username] // El valor del nombre de usuario proporcionado por el usuario se inserta aquí de forma segura
    );

    // Verifica si se encontró algún usuario con ese nombre de usuario
    if (rowsComunidad.length === 0) {
      // Si no se encontró ningún usuario, devuelve un error 401 (No autorizado) con un mensaje
      return res.status(401).json({ message: 'Credenciales inválidas' }); // Usuario no encontrado
    }

    // Si se encontró un usuario, obtén el primer resultado (debería ser único si el nombre de usuario es único)
    const userComunidad = rowsComunidad[0];
    // Compara la contraseña proporcionada por el usuario (sin hashear) con la contraseña hasheada almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, userComunidad.contraseña_hash);

    // Verifica si las contraseñas coinciden
    if (passwordMatch) {
      // Autenticación exitosa en la comunidad
      // Establece la información del usuario en la sesión
      req.session.user = {
        id: userComunidad.id,
        username: userComunidad.nombre_usuario,
        email: userComunidad.email,
        // ... agrega aquí otros campos del usuario de la comunidad que quieras guardar en la sesión
      };
      // Guarda la sesión
      await req.session.save();
      // Devuelve una respuesta exitosa (200 OK) con un mensaje y la información del usuario en la sesión
      return res.status(200).json({ message: 'Inicio de sesión exitoso', user: req.session.user });
    } else {
      // Si las contraseñas no coinciden, devuelve un error 401 (No autorizado) con un mensaje
      return res.status(401).json({ message: 'Credenciales inválidas' }); // Contraseña incorrecta
    }

  } catch (error) {
    // Si ocurre algún error durante el proceso (conexión a la base de datos, consulta, etc.)
    console.error('Error durante el inicio de sesión en la comunidad:', error);
    // Devuelve un error 500 (Error interno del servidor) con un mensaje
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

// Exporta la función loginRoute envuelta con el middleware de gestión de sesiones (si usas iron-session)
export default withIronSessionApiRoute(loginRoute, sessionOptions);
// Si no usas iron-session, exporta directamente la función loginRoute:
// export default loginRoute;