// db/config.ts
import { defineDb, defineTable, column, now } from 'astro:db';

const temas = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    nombre: column.text({ length: 100, unique: true, notNull: true }),
    descripcion: column.text(),
    fecha_creacion: column.date({ default: now }),
  },
});

const usuarios = defineTable({ 
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    id_user: column.number({ unique: true, notNull: true }),
    nombre_usuario: column.text({ length: 50, notNull: true }),
    email: column.text({ length: 100, unique: true, notNull: true }),
    password: column.text({ length: 255, notNull: true }),
    fecha_registro: column.date({default: now}),
  },
});

const publicaciones = defineTable({
  columns: {
    id_publica: column.number({ primaryKey: true, autoIncrement: true }),
    id_user: column.number({ notNull: true }),
    titulo: column.text({ length: 50, notNull: true }),
    texto: column.text({ length: 50, notNull: true }),
    id_tema: column.number({ notNull: true }),
    fecha_creacion: column.date({ default: now }),
    fecha_edicion: column.date({ default: now, onUpdate: now }),
  },

});

const comentarios = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    id_usuario: column.number({ notNull: true }),
    id_publicacion: column.number({ notNull: true }),
    contenido: column.text(),
    fecha_creacion: column.date({ default: now }),
    fecha_edicion: column.date(),
  },
  // EJEMPLO DE CLAVE FORÁNEAS PARA LAS RELACIONES ENTRE LAS TABLAS
  /* foreignKeys: [
    {
      columns: ["authorFirstName", "authorLastName"],
      references: () => [Author.columns.firstName, Author.columns.lastName],
    },
  ], */
});

const votos = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    id_usuario: column.number({ notNull: true }),
    id_publicacion: column.number(),
    id_comentario: column.number(),
    tipo_voto: column.enum(['up', 'down']).notNull(),
    fecha_voto: column.date({default: now}),
  },
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
});


/*relations: (({ publicaciones, usuarios, temas, comentarios, votos }) => ({
    publicaciones: {
      id_user: publicaciones.id_user.references(usuarios.id_user),
      id_tema: publicaciones.id_tema.references(temas.id),
    },
    comentarios: {
      id_usuario: comentarios.id_usuario.references(usuarios.id), // Asumo que 'usuarios' tiene 'id' como clave primaria
      id_publicacion: comentarios.id_publicacion.references(publicaciones.id_publica),
    },
    votos: {
      id_usuario: votos.id_usuario.references(usuarios.id),     // Asumo que 'usuarios' tiene 'id' como clave primaria
      id_publicacion: votos.id_publicacion.references(publicaciones.id_publica),
      id_comentario: votos.id_comentario.references(comentarios.id),
    },
  })),*/