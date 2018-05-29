// @flow

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import type { GraphqlContextType } from '../types/GraphqlContextType';
import type { Cat as CatType } from '../types/Cat';

type argsType = {
  id: string,
}

export const GraphQLCat = new GraphQLObjectType({
  name: 'Cat',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    nickName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLDateTime),
    },
    updatedAt: {
      type: GraphQLDateTime,
    },
    avatarUrl: {
      type: new GraphQLNonNull(GraphQLString),
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
});

export default {
  type: GraphQLCat,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve: async (
    _: mixed,
    { id }: argsType,
    { models }: GraphqlContextType,
  ): Promise<CatType> => {
    const cats = await models.Cat.find({ _id: id });

    return cats[0];
  },
};
