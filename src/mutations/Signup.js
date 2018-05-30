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
  passwordConfirmation: string,
  name: string,
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
    passwordConfirmation: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (
    object: mixed,
    args: argsType,
    { models }: GraphqlContextType,
  ): Promise<AuthPayloadType> => {
    const {
      email,
      password,
      passwordConfirmation,
      name,
    } = args;


    if (!email || !password || !passwordConfirmation || !name) {
      return {
        token: null,
        error: errorCodes.EMPTY_FIELDS,
        user: null,
      };
    }

    const user = await models.User.findOne({
      email: email.toLowerCase(),
    });

    if (user) {
      return {
        token: null,
        error: errorCodes.USER_EXISTS,
        user: null,
      };
    }

    if (password !== passwordConfirmation) {
      return {
        token: null,
        error: errorCodes.PASSWORD_CONFIRMATION_ERR,
        user: null,
      };
    }

    const newUser = await new models.User({
      name,
      password,
      email,
    }).save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      JWT_KEY,
    );

    return {
      token: `JWT ${token}`,
      user: newUser,
      error: null,
    };
  },
};
