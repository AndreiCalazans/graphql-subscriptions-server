import config from 'dotenv';
import { PubSub } from 'graphql-yoga';
import * as loaders from './loaders';

config.config();

export const dataloaders = Object.keys(loaders).reduce(
  (dtloaders, loaderKey) => ({
    ...dtloaders,
    [loaderKey]: loaders[loaderKey].getLoader(),
  }),
  {},
);

export const pubsub = new PubSub();
export const PORT = process.env.PORT || 8080;
export const BASE_URI = process.env.BASE_URI || `http://localhost:${PORT}`;
export const WS_BASE_URI =
  process.env.WS_BAS_URI || BASE_URI.replace(/^https?/, 'ws');
export const { MONGO_URI, JWT_KEY } = process.env;
export const MONGO_DATABASE_NAME =
  process.env.NODE_ENV === 'test' ? 'test' : process.env.MONGO_DATABASE_NAME;
