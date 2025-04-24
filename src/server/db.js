// server/db.js (ejemplo para MySQL)
import mysql from 'mysql2/promise';

const dbConfigComunidad = {
  host: import.meta.env.DATABASE_HOST1,
  user: import.meta.env.DATABASE_USER1,
  password: import.meta.env.DATABASE_PASSWORD1,
  database: import.meta.env.DATABASE_NAME_COMUNIDAD1
};

let connectionComunidad;

async function getConnectionComunidad() {
  if (!connectionComunidad) {
    try {
      connectionComunidad = await mysql.createConnection(dbConfigComunidad);
      console.log('Conexión a la base de datos comunidad establecida.');
    } catch (error) {
      console.error('Error al conectar a la base de datos comunidad:', error);
      throw error;
    }
  }
  return connectionComunidad;
}

const dbConfigForo = {
  host: import.meta.env.DATABASE_HOST2,
  user: import.meta.env.DATABASE_USER2,
  password: import.meta.env.DATABASE_PASSWORD2,
  database: import.meta.env.DATABASE_NAME_FORO2
};

let connectionForo;

async function getConnectionForo() {
  if (!connectionForo) {
    try {
      connectionForo = await mysql.createConnection(dbConfigForo);
      console.log('Conexión a la base de datos foro establecida.');
    } catch (error) {
      console.error('Error al conectar a la base de datos foro:', error);
      throw error;
    }
  }
  return connectionForo;
}

export { getConnectionComunidad, getConnectionForo };