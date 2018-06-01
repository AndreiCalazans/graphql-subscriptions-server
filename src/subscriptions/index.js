// @flow

import { GraphQLObjectType } from 'graphql';

import NewCar from './NewCar';
import RemovedCar from './RemovedCar';

export default new GraphQLObjectType({
  name: 'RootSubscription',
  description: 'Root Subscription',
  fields: {
    newCar: NewCar,
    removedCar: RemovedCar,
  },
});
