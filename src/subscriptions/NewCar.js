// @flow

import { pubsub } from '../config';
import GraphqlCar from '../types/Car';
import type { CarType } from '../types/Car';

export default {
  type: GraphqlCar,
  resolve: (payload: CarType) => payload,
  subscribe: () => pubsub.asyncIterator('newCar'),
};

