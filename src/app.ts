import express, { Application } from 'express';

import errorHandler from './middlewares/errorHandler';
import routesHandler from './routes';

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routesHandler);

app.use(errorHandler);

export default app;
