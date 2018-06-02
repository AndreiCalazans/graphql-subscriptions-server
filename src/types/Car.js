
// @flow

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import UserGraphql from './User';
import type { UserType } from './User';

export type CarType = {
  id: string,
  plate: string,
  brand: string,
  createdBy: UserType,
  createdAt: string,
  updatedAt: ?string,
}

export default new GraphQLObjectType({
  name: 'Car',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    plate: {
      type: new GraphQLNonNull(GraphQLString),
    },
    brand: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdBy: {
      type: UserGraphql,
      resolve: async ({ createdBy }, args, context) => {
        const user = await context.dataloaders.UserLoader.load(createdBy);
        return user;
      },
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLDateTime),
    },
    updatedAt: {
      type: GraphQLDateTime,
    },
  },
});

