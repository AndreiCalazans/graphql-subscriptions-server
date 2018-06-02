// @flow
import DataLoader from 'dataloader';
import {
  connectionFromMongoCursor,
  mongooseLoader,
} from '@entria/graphql-mongoose-loader';
import type { ConnectionArguments } from 'graphql-relay';

import { User as UserModel } from '../models';
import type { UserType } from '../types/User';
import type { GraphqlContextType } from '../flowTypes/GraphqlContextType';

export default class User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: ?string;
  avatarUrl: ?string;

  // eslint-disable-next-line
  constructor(data: UserType, { user }: GraphqlContextType) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.avatarUrl = data.avatarUrl;
  }
}

export const getLoader = () =>
  //  $FlowFixMe
  new DataLoader(ids => mongooseLoader(UserModel, ids));

  // eslint-disable-next-line
const viewerCanSee = (context, data) =>
  // Anyone can see another cat
  true;


export const load = async (
  context: GraphqlContextType,
  id: string,
): Promise<?User> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.UserLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee(context, data) ? new User(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphqlContextType, id: string) =>
  dataloaders.UserLoader.clear(id.toString());

export const loadUsers = async (
  context: GraphqlContextType,
  args: ConnectionArguments,
) => {
  const cursor = context.models.User.find().sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor,
    context,
    args,
    loader: load,
  });
};
