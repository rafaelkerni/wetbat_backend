import { Router } from 'express';
import clientsController from './ClientsController';

const routes = Router();

routes.get('/clients/:id?', clientsController.getClients);

routes.post('/clients/:id?', clientsController.saveClient);

routes.delete('/clients/:id', clientsController.deleteClient);

export default routes;
