// @flow

import { GraphQLID } from 'graphql';
import type { GraphqlContextType } from '../flowTypes/GraphqlContextType';
import type { Cat as CatType } from '../flowTypes/Cat';
import GraphQLCat from '../types/Cat';

type argsType = {
  id: string,
}

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
