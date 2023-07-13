import request from 'supertest';
import app from '../../../app';
import knex from '../../../database/knex';
import Models from '../../../database/models';
import { newClient, updatedClient } from './__mocks__/clientMock';
import { removeTimestamps } from '../../../utils/functions';

describe('ClientsController', () => {
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  describe('GET /api/clients', () => {
    it('should return all clients', async () => {
      const response = await request(app).get('/api/clients');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return a specific client', async () => {
      const client = await Models(knex)
        .Clients.forge(newClient)
        .save();

      const response = await request(app).get(
        `/api/clients/${client.get('id')}`
      );

      //ignore timestamps
      const bodyData = removeTimestamps(response.body[0]);
      const clientData = removeTimestamps(client.toJSON());

      expect(response.status).toBe(200);
      expect(bodyData).toEqual(clientData);
    });
  });

  describe('DELETE /api/clients/:id', () => {
    it('should delete a client', async () => {
      const client = await Models(knex)
        .Clients.forge(newClient)
        .save();

      const response = await request(app).delete(
        `/api/clients/${client.get('id')}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'client deleted' });
    });

    it('should return an error if the client does not exist', async () => {
      const response = await request(app).delete('/api/clients/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'client not found' });
    });
  });

  describe('POST /api/clients', () => {
    it('should create a new client', async () => {
      const response = await request(app)
        .post('/api/clients')
        .send(newClient);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'client created' });
    });

    it('should update an existing client', async () => {
      const client = await Models(knex)
        .Clients.forge(newClient)
        .save();

      const response = await request(app)
        .post(`/api/clients/${client.get('id')}`)
        .send(updatedClient);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'client updated' });
    });
  });
});
