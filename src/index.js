// @flow

import { GraphQLServer } from 'graphql-yoga';

import { getUser } from './helpers/getUser';
import { pubsub, dataloaders, BASE_URI, PORT } from './config';
import { schema } from './schema';
import * as models from './models';
import connectDatabase from './database';

(async () => {
  try {
    const info = await connectDatabase();
    //  eslint-disable-next-line
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    //  eslint-disable-next-line
    console.error('Unable to connect to database');
    process.exit(1);
  }

  const createContext = async (ctx) => {
    const hasRequest = 'request' in ctx;
    const hasConnection = 'connection' in ctx;
    const connectionToken = hasConnection ? ctx.connection.context.authorization : undefined;
    const token = hasRequest ? ctx.request.headers.authorization : connectionToken;

    const user = await getUser(token);

    return {
      user,
      pubsub,
      models,
      dataloaders,
    };
  };

  const server = new GraphQLServer({
    schema,
    context: createContext,
  });

  server.start({ port: PORT, cacheControl: true }, () =>
    //  eslint-disable-next-line
    console.log(`GraphQL Server is now running on ${BASE_URI}`));
})();
