import { Request, Response } from 'express';
import knex from '../../database/knex';
import Models from '../../database/models';

class ClientsController {
  public async getClients(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        const clients = await Models(knex).Clients.fetchAll();

        return res.json(clients);
      }

      const clients = await Models(knex)
        .Clients.where('id', id)
        .fetchAll();

      return res.json(clients);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'error on get clients' });
    }
  }

  public async deleteClient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: 'client not found' });
      }

      const client = await Models(knex)
        .Clients.where('id', id)
        .fetch({ require: false });

      if (!client) {
        return res.status(404).json({ message: 'client not found' });
      }

      return await Models(knex)
        .Clients.where('id', id)
        .destroy()
        .then(() => {
          res.json({ message: 'client deleted' });
        })
        .catch(() => {
          res
            .status(500)
            .json({ message: 'error on deleting client' });
        });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'error on deleting client' });
    }
  }

  public async saveClient(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        await Models(knex).Clients.forge(req.body).save();

        return res.json({ message: 'client created' });
      } else {
        await Models(knex)
          .Clients.where('id', req.params.id)
          .save(req.body, { method: 'update' });

        return res.json({ message: 'client updated' });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'error on creating/updating client' });
    }
  }
}

export default new ClientsController();
