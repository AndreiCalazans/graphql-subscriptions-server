// @flow

import { GraphQLObjectType } from 'graphql';

import AddCat from './Cats/AddCat';
import RemoveCat from './Cats/RemoveCat';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation',
  fields: {
    addCat: AddCat,
    removeCat: RemoveCat,
  },
});
