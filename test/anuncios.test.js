const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const path = require('path');

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Anuncios API', () => {
  it('should return a list of anuncios', async () => {
    const res = await request(app)
      .get('/apiv1/anuncios')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('success', true);
    expect(res.body.results).toBeInstanceOf(Array);
  });

  it('should create a new anuncio', async () => {
    const newAnuncio = {
      nombre: 'Anuncio de prueba',
      venta: true,
      precio: 100,
      tags: 'tag1,tag2'
    };

    const res = await request(app)
      .post('/apiv1/anuncios')
      .field('nombre', newAnuncio.nombre)
      .field('venta', newAnuncio.venta)
      .field('precio', newAnuncio.precio)
      .field('tags', newAnuncio.tags)
      .attach('foto', path.join(__dirname, 'test.jpg'))
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toHaveProperty('_id');
    expect(res.body.result.nombre).toBe(newAnuncio.nombre);
    expect(res.body.result.venta).toBe(newAnuncio.venta);
    expect(res.body.result.precio).toBe(newAnuncio.precio);
    expect(res.body.result.tags).toEqual(expect.arrayContaining(newAnuncio.tags.split(',')));
  });
});
