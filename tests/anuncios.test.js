const request = require('supertest');
const app = require('../app');  // Asegúrate de que el camino hacia tu archivo app.js sea correcto

describe('GET /apiv1/anuncios', () => {
  it('should return a list of anuncios', async () => {
    const res = await request(app)
      .get('/apiv1/anuncios')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('results');
    expect(Array.isArray(res.body.results)).toBe(true);
  });
});

describe('POST /apiv1/anuncios', () => {
  it('should create a new anuncio', async () => {
    const newAnuncio = {
      nombre: 'Test Anuncio',
      venta: true,
      precio: 100,
      tags: ['test'],
      foto: 'test.jpg'
    };

    const res = await request(app)
      .post('/apiv1/anuncios')
      .send(newAnuncio)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toHaveProperty('_id');
    expect(res.body.result).toHaveProperty('nombre', 'Test Anuncio');
  });
});

describe('DELETE /apiv1/anuncios/:id', () => {
  it('should delete an anuncio', async () => {
    const newAnuncio = {
      nombre: 'Test Anuncio to Delete',
      venta: true,
      precio: 100,
      tags: ['test'],
      foto: 'test.jpg'
    };

    // Primero creamos un anuncio
    const createRes = await request(app)
      .post('/apiv1/anuncios')
      .send(newAnuncio)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    const anuncioId = createRes.body.result._id;

    // Luego eliminamos el anuncio creado
    const deleteRes = await request(app)
      .delete(`/apiv1/anuncios/${anuncioId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(deleteRes.body).toHaveProperty('success', true);
    expect(deleteRes.body).toHaveProperty('message', 'Anuncio eliminado correctamente');
  });
});
