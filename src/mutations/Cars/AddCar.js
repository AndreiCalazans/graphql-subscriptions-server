// @flow
import { GraphQLNonNull, GraphQLString } from 'graphql';

import { pubsub } from '../../config';
import GraphqlCar from '../../types/Car';
import type { CarType } from '../../types/Car';
import type { GraphqlContextType } from '../../flowTypes/GraphqlContextType';

type argsType = {
  brand: string,
  plate: string,
}

export default {
  type: GraphqlCar,
  args: {
    plate: {
      type: new GraphQLNonNull(GraphQLString),
    },
    brand: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (
    _: mixed,
    args: argsType,
    { models, user }: GraphqlContextType,
  ): Promise<CarType> => {
    const car = await new models.Car({
      ...args,
      createdBy: user._id,
    }).save();

    pubsub.publish('newCar', car);
    return car;
  },
};
