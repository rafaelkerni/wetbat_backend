import { Router } from 'express';
import Clients from '../modules/clients/Routes';
import Quotes from '../modules/quotes/Routes';

const routes = Router();

routes.use(Clients);
routes.use(Quotes);

export default routes;
