// @flow
import DataLoader from 'dataloader';
import {
  connectionFromMongoCursor,
  mongooseLoader,
} from '@entria/graphql-mongoose-loader';
import type { ConnectionArguments } from 'graphql-relay';

import { Cat as CatModel } from '../models';
import type { Cat as CatType } from '../flowTypes/Cat';
import type { GraphqlContextType } from '../flowTypes/GraphqlContextType';

export default class Cat {
  id: string
  name: string
  nickName: string
  description: string
  createdAt: string
  updatedAt: string
  avatarUrl: string
  age: number

  // eslint-disable-next-line
  constructor(data: CatType, { cat }: GraphqlContextType) {
    this.id = data.id;
    this.name = data.name;
    this.nickName = data.nickName;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.avatarUrl = data.avatarUrl;
    this.age = data.age;
  }
}

export const getLoader = () =>
  //  $FlowFixMe
  new DataLoader(ids => mongooseLoader(CatModel, ids));

  // eslint-disable-next-line
const viewerCanSee = (context, data) =>
  // Anyone can see another cat
  true;


export const load = async (
  context: GraphqlContextType,
  id: string,
): Promise<?Cat> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.CatLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee(context, data) ? new Cat(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphqlContextType, id: string) =>
  dataloaders.CatLoader.clear(id.toString());

export const loadCats = async (
  context: GraphqlContextType,
  args: ConnectionArguments,
) => {
  const cursor = context.models.Cat.find().sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor,
    context,
    args,
    loader: load,
  });
};
