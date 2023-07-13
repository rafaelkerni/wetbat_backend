import { Request, Response } from 'express';
import knex from '../../database/knex';
import Models from '../../database/models';

class QuotesController {
  public async getQuotes(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        const quotes = await Models(knex).Quotes.fetchAll({
          withRelated: ['client'],
        });
        return res.json(quotes);
      }

      const quotes = await Models(knex)
        .Quotes.where('id', id)
        .fetchAll({
          withRelated: ['client'],
        });

      return res.json(quotes);
    } catch (error) {
      return res.status(500).json({ message: 'error on get quote' });
    }
  }

  public async deleteQuote(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ message: 'quote not found' });
      }

      const quote = await Models(knex)
        .Quotes.where('id', id)
        .fetch({ require: false });

      if (!quote) {
        return res.status(404).json({ message: 'quote not found' });
      }

      return await Models(knex)
        .Quotes.where('id', id)
        .destroy()
        .then(() => {
          res.json({ message: 'quote deleted' });
        })
        .catch(() => {
          res
            .status(500)
            .json({ message: 'error on deleting quote' });
        });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'error on creating/updating quote' });
    }
  }

  public async saveQuote(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        await Models(knex).Quotes.forge(req.body).save();

        return res.json({ message: 'quote created' });
      } else {
        await Models(knex)
          .Quotes.where('id', req.params.id)
          .save(req.body, { method: 'update' });

        return res.json({ message: 'quote updated' });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'error on creating/updating quote' });
    }
  }
}

export default new QuotesController();
