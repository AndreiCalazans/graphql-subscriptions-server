
// @flow

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';

export type CarType = {
  id: string,
  plate: string,
  brand: string,
  createdBy: string,
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
      type: new GraphQLNonNull(GraphQLID),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLDateTime),
    },
    updatedAt: {
      type: GraphQLDateTime,
    },
  },
});

