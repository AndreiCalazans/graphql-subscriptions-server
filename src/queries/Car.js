// @flow

import { GraphQLID } from 'graphql';
import type { GraphqlContextType } from '../flowTypes/GraphqlContextType';
import GraphqlCar from '../types/Car';
import type { CarType } from '../types/Car';

type argsType = {
  id: string,
}

export default {
  type: GraphqlCar,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve: async (
    _: mixed,
    { id }: argsType,
    { models }: GraphqlContextType,
  ): Promise<CarType> => {
    const car = await models.Car.find({ _id: id });

    return car[0];
  },
};
