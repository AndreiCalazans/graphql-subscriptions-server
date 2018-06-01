// @flow
import { GraphQLInt } from 'graphql';
import { connectionDefinitions, connectionArgs } from 'graphql-relay';

import GraphqlCar from '../types/Car';
import { CarLoader } from '../loaders';
import type { GraphqlContextType } from '../flowTypes/GraphqlContextType';

const { connectionType: AllCarsConnection } = connectionDefinitions({
  name: 'Car',
  nodeType: GraphqlCar,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});

export default {
  type: AllCarsConnection,
  args: {
    ...connectionArgs,
  },
  resolve: async (_: mixed, args: Object, context: GraphqlContextType) =>
    CarLoader.loadCars(context, args),
};
