// @flow
import { GraphQLNonNull, GraphQLString } from 'graphql';
import jwt from 'jsonwebtoken';

import AuthPayload from '../types/AuthPayload';
import { errorCodes } from '../helpers/contants';
import { JWT_KEY } from '../config';

import type { AuthPayloadType } from '../types/AuthPayload';
import type { GraphqlContextType } from '../flowTypes/GraphqlContextType';

type argsType = {
  email: string,
  password: string,
}

export default {
  type: AuthPayload,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (
    object: mixed,
    args: argsType,
    { models }: GraphqlContextType,
  ): Promise<AuthPayloadType> => {
    const { email, password } = args;

    if (!email || !password) {
      return {
        token: null,
        error: errorCodes.EMPTY_FIELDS,
        user: null,
      };
    }

    const user = await models.User.findOne({
      email: email.toLowerCase(),
    });

    if (!user || (user && !user.password)) {
      return {
        token: null,
        error: errorCodes.INVALID_EMAIL_PASSWORD,
        user: null,
      };
    }

    const correctPassword = await user.authenticate(password);

    if (!correctPassword) {
      return {
        token: null,
        error: errorCodes.INVALID_EMAIL_PASSWORD,
        user: null,
      };
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_KEY,
    );

    return {
      token: `JWT ${token}`,
      error: null,
      user,
    };
  },
};
