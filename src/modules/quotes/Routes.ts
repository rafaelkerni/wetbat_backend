import { Router } from 'express';
import quotesController from './QuotesController';

const routes = Router();

routes.get('/quotes/:id?', quotesController.getQuotes);

routes.post('/quotes/:id?', quotesController.saveQuote);

routes.delete('/quotes/:id', quotesController.deleteQuote);

export default routes;
