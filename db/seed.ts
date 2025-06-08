import { db, temas, usuarios, publicaciones, comentarios, votos } from 'astro:db';

// Función para validar tipo_voto
const allowedVotes = ['up', 'down'];
function isValidVote(tipo_voto) {
  return allowedVotes.includes(tipo_voto);
}

export default async function seed() {
	try {
		// Insertar varios temas
		await db.insert(temas).values([
			{ nombre: 'Nintendo', descripcion: 'Todo sobre consolas y juegos de Nintendo, desde NES hasta Switch.' },
			{ nombre: 'PlayStation', descripcion: 'Noticias, lanzamientos y debates sobre consolas PlayStation.' },
			{ nombre: 'Xbox', descripcion: 'Comparte tus experiencias, preguntas y noticias sobre consolas Xbox.' }
		]);
		console.log('Temas insertados correctamente.');
	}catch(error){
		console.error('Error insertando los temas:', error);
	}

	try {
		// Insertar varios usuarios
		await db.insert(usuarios).values([
			{ nombre_usuario: 'ana', email: 'ana@ejemplo.com', password: 'anshedpassword1' },
      		{ nombre_usuario: 'luis', email: 'luis@ejemplo.com', password: 'luashedpassword2' },
			{ nombre_usuario: 'elena', email: 'elena@ejemplo.com', password: 'elasaspassword2' }
		]);
		console.log('Usarios insertados correctamente.');
	}catch(error){
		console.error('Error insertando los usarios:', error);
	}
	
	try {
		// Insertar varias publicaciones
		await db.insert(publicaciones).values([
			{ id_user: 1, titulo: '¿Merece la pena comprar la Nintendo Switch en 2025?', texto: 'Estoy pensando en comprar una Switch para jugar a Zelda y Mario. ¿Qué opinan los que ya la tienen?', id_tema: 1 },
			{ id_user: 2, titulo: 'Mi experiencia con el nuevo God of War en PS5', texto: 'Acabo de terminar God of War Ragnarok y me ha parecido una obra maestra. ¿Alguien más lo ha jugado?', id_tema: 2 },
			{ id_user: 3, titulo: '¿Xbox Series X o PlayStation 5?', texto: 'Estoy indeciso entre ambas consolas. ¿Cuál recomiendan y por qué?', id_tema: 3 }
		]);
		console.log('Publicaciones insertadas correctamente.');
	}catch(error){
		console.error('Error insertando las publicaciones:', error);
	}

	try {
		// Insertar varios comentarios 
		await db.insert(comentarios ).values([
			{ id_usuario: 1, id_publicacion: 3, contenido: 'God of War es brutal, la historia y los gráficos son impresionantes.' },
			{ id_usuario: 2, id_publicacion: 1, contenido: 'La Switch sigue teniendo un catálogo increíble, ¡vale mucho la pena!' },
			{ id_usuario: 3, id_publicacion: 2, contenido: 'Yo prefiero la PS5 por sus exclusivos, pero la Series X tiene mejor rendimiento.' }
		]);
		console.log('Comentarios insertados correctamente.');
	}catch(error){
		console.error('Error insertando los comentarios :', error);
	}

	try {
		if(votosValidos.length > 0){
			// Insertar varios votos 
			await db.insert(votos ).values([
				{ id_usuario: 1, id_publicacion: 2, id_comentario: null, tipo_voto: 'up' },
				{ id_usuario: 2, id_publicacion: 3, id_comentario: null, tipo_voto: 'up' },
				{ id_usuario: 3, id_publicacion: null, id_comentario: 1, tipo_voto: 'down' }
			]);
			console.log('Votos insertados correctamente.');
		}else{
			console.log('Votos no insertados correctamente.');
		}
	}catch(error){
		console.error('Error insertando los votos :', error);
	}
}

seed();