// MIRAR LA DOCUMENTACIÓN --> https://docs.astro.build/en/guides/integrations-guide/db/
// db/config.ts
/*import { defineDb, defineTable, column, NOW } from 'astro:db';

const temas = defineTable({
  columns: {
    id_tema: column.number({ primaryKey: true, autoIncrement: true }),
    nombre: column.text({ length: 100, unique: true, notNull: true }),
    descripcion: column.text(),
    fecha_creacion: column.date({ default: NOW }),
  },
});

const usuarios = defineTable({ 
  columns: {
    id_user: column.number({ primaryKey: true, autoIncrement: true }),
    nombre_usuario: column.text({ length: 50, unique: true, notNull: true }),
    email: column.text({ length: 100, unique: true, notNull: true }),
    password: column.text({ length: 255, unique: true, notNull: true }),
    fecha_registro: column.date({default: NOW}),
  },
});

const publicaciones = defineTable({
  columns: {
    id_publica: column.number({ primaryKey: true, autoIncrement: true }),
    id_user: column.number(),
    titulo: column.text({ unique: true, length: 50, notNull: true }),
    texto: column.text({ length: 50, unique: true, notNull: true }),
    id_tema: column.number({ unique: true, notNull: true }),
    fecha_creacion: column.date({ default: NOW }),
    fecha_edicion: column.date({ default: NOW, onUpdate: NOW }),
  },
  foreignKeys: [
    {
      columns: ["id_user", "id_tema"],
      references: () => [usuarios.columns.id_user, temas.columns.id_tema],
    },
  ], 
});

const comentarios = defineTable({
  columns: {
    id_coment: column.number({ primaryKey: true, autoIncrement: true }),
    id_usuario: column.number(),
    id_publicacion: column.number({ unique: true, notNull: true }),
    contenido: column.text(),
    fecha_creacion: column.date({ default: NOW }),
    fecha_edicion: column.date(),
  },
   foreignKeys: [
    {
      columns: ["id_usuario", "id_publicacion"],
      references: () => [usuarios.columns.id_user, publicaciones.columns.id_publica],
    },
  ], 
});

const votos = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    id_usuario: column.number({ unique: true, notNull: true }),
    id_publicacion: column.number(),
    id_comentario: column.number(),
    tipo_voto: column.text(),
    fecha_voto: column.date({default: NOW}),
  },
  foreignKeys: [
    {
      columns: ["id_usuario", "id_publicacion", "id_comentario"],
      references: () => [usuarios.columns.id_user, publicaciones.columns.id_publica, comentarios.columns.id_coment],
    },
  ], 
  indexes: [
    {
      on: ['id_usuario', 'id_publicacion', 'id_comentario'],
      unique: true
    },
  ]
});

export default defineDb({
  tables: {
    temas,
    usuarios,
    publicaciones,
    comentarios,
    votos,
  },
});*/