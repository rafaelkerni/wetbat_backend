import request from 'supertest';
import app from '../../../app';
import knex from '../../../database/knex';
import Models from '../../../database/models';
import { newQuote, updatedQuote } from './__mocks__/quoteMock';
import { removeTimestamps } from '../../../utils/functions';
import { newClient } from '../../clients/__tests__/__mocks__/clientMock';

describe('QuotesController', () => {
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  describe('GET /api/quotes', () => {
    it('should return all quotes', async () => {
      const response = await request(app).get('/api/quotes');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return a specific quote', async () => {
      const client = await Models(knex)
        .Clients.forge(newClient)
        .save();
      const quote = await Models(knex).Quotes.forge(newQuote).save();

      const response = await request(app).get(
        `/api/quotes/${quote.get('id')}`
      );

      //ignore timestamps
      const bodyData = removeTimestamps(response.body[0]);
      bodyData.client = removeTimestamps(bodyData.client);
      const quoteData = removeTimestamps(quote.toJSON());
      const clientData = removeTimestamps(client.toJSON());

      expect(response.status).toBe(200);
      expect(bodyData).toEqual({
        ...quoteData,
        client: clientData,
      });
    });
  });

  describe('DELETE /api/quotes/:id', () => {
    it('should delete a quote', async () => {
      const quote = await Models(knex).Quotes.forge(newQuote).save();

      const response = await request(app).delete(
        `/api/quotes/${quote.get('id')}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'quote deleted' });
    });

    it('should return an error if the quote does not exist', async () => {
      const response = await request(app).delete('/api/quotes/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'quote not found' });
    });
  });

  describe('POST /api/quotes', () => {
    it('should create a new quote', async () => {
      const response = await request(app)
        .post('/api/quotes')
        .send(newQuote);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'quote created' });
    });

    it('should update an existing quote', async () => {
      await Models(knex).Clients.forge(newClient).save();
      const quote = await Models(knex).Quotes.forge(newQuote).save();

      const response = await request(app)
        .post(`/api/quotes/${quote.get('id')}`)
        .send(updatedQuote);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'quote updated' });
    });
  });
});
