
// @flow

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';

export type UserType = {
  id: string,
  name: string,
  email: string,
  createdAt: string,
  updatedat: ?string,
  avatarUrl: ?string,
}

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLDateTime),
    },
    updatedAt: {
      type: GraphQLDateTime,
    },
    avatarUrl: {
      type: GraphQLString,
    },
  },
});

