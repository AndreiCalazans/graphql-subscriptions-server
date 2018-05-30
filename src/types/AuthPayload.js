// @flow

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import type { UserType } from './User';
import User from './User';

export type AuthPayloadType = {
  token: ?string,
  error: ?string,
  user: ?UserType,
}

export default new GraphQLObjectType({
  name: 'LoginPayload',
  fields: {
    token: {
      type: GraphQLString,
    },
    error: {
      type: GraphQLString,
    },
    user: {
      type: User,
    },
  },
});
