// @flow

import { GraphQLObjectType } from 'graphql';

import AllCars from './AllCars';
import Car from './Car';

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    car: Car,
    allCars: AllCars,
  },
});
