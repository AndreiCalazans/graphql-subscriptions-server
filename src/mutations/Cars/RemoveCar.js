// @flow

import { GraphQLNonNull, GraphQLID } from 'graphql';

import { pubsub } from '../../config';
import GraphqlCar from '../../types/Car';
import type { CarType } from '../../types/Car';
import type { GraphqlContextType } from '../../flowTypes/GraphqlContextType';

type argsType = {
  id: string,
}

export default {
  type: GraphqlCar,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (
    _: mixed,
    { id }: argsType,
    { models }: GraphqlContextType,
  ): Promise<CarType> => {
    const cat = await new models.Car({ _id: id }).remove();

    pubsub.publish('removedCar', cat);
    return cat;
  },
};
