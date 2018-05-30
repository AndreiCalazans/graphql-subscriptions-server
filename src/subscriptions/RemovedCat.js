// @flow

import { pubsub } from '../config';
import GraphQLCat from '../types/Cat';
import type { Cat } from '../flowTypes/Cat';

export default {
  type: GraphQLCat,
  resolve: (payload: Cat) => payload,
  subscribe: () => pubsub.asyncIterator('removedCat'),
};
