import fs from 'fs';
import path from 'path';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import { schema as GraphqlSchema } from '../schema';

async function generateSchema(schema, relativePath) {
  // eslint-disable-next-line
  console.log('generate schemas: ', relativePath);

  const result = await graphql(schema, introspectionQuery);

  if (result.errors) {
  // eslint-disable-next-line
    console.error('ERROR introspecting schema: ', JSON.stringify(result.errors, null, 2));
  } else {
    fs.writeFileSync(path.join(__dirname, `${relativePath}/schema.json`), JSON.stringify(result, null, 2));

    fs.writeFileSync(path.join(__dirname, `${relativePath}/schema.graphql`), printSchema(schema));
  }
}

(async () => {
  const configs = [
    {
      schema: GraphqlSchema,
      path: '../schemas',
    },
  ];

  await Promise.all(configs.map(async (config) => {
    await generateSchema(config.schema, config.path);
  }));

  process.exit(0);
})();
