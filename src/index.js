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
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }

  const createContext = async (ctx) => {
    const user = await getUser(ctx.request.headers.authorization);

    return {
      user,
      pubsub,
      models,
      dataloaders,
    };
  }

  const server = new GraphQLServer({
    schema,
    context: createContext,
  });

  server.start({ port: PORT, cacheControl: true }, () =>
    console.log(`GraphQL Server is now running on ${BASE_URI}`));
})();
