// @flow

import { GraphQLObjectType } from 'graphql';

import AddCar from './Cars/AddCar';
import RemoveCar from './Cars/RemoveCar';
import Login from './Login';
import Signup from './Signup';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation',
  fields: {
    login: Login,
    signup: Signup,
    addCar: AddCar,
    removeCar: RemoveCar,
  },
});
