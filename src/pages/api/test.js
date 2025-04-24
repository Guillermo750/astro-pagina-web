// src/pages/api/test.js
/* export async function GET() {
    return new Response(JSON.stringify({ message: 'API de prueba funciona' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } */
    export async function GET() {
      return new Response(JSON.stringify({ message: 'API de prueba funcionando' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }