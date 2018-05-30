// @flow

import { GraphQLObjectType } from 'graphql';

import AddCat from './Cats/AddCat';
import RemoveCat from './Cats/RemoveCat';
import Login from './Login';
import Signup from './Signup';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation',
  fields: {
    addCat: AddCat,
    removeCat: RemoveCat,
    login: Login,
    signup: Signup,
  },
});
