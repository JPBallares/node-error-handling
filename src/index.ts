import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { itemsRouter } from './routers/items';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { isOperationalError, logError, logErrorMiddleware, returnError } from './middlewares/logError';
import httpLogger from './errors/httpLogger';

dotenv.config();

process.on('unhandledRejection', error => {
  throw error;
});

process.on('uncaughtException', error => {
  logError(error);
 
  if (!isOperationalError(error)) {
    process.exit(1);
  }
});

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(httpLogger);

// health check route
app.get('/_health', (req, res) => {
  res.status(200).send('ok');
});

// rest api
app.use('/api/items', itemsRouter);

// error handler should be placed at last
app.use(logErrorMiddleware);
app.use(returnError);

/**
 * this will be the last in the configs
 * anything that doesn't match the route will use this for fallback
 */
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
