import express, { Application } from 'express';
import cors from 'cors';
import routes from './middlewares/Routes';

class App {
  public express: Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.disable('x-powered-by');
  }

  private routes(): void {
    this.express.use('/api', routes);
  }
}

export default new App().express;
