//  @flow

import DataLoader from 'dataloader';
import type { ModelsType } from '../models';

export type dataloadersType = {|
  UserLoader: DataLoader<string, any>,
  CarLoader: DataLoader<string, any>,
|}

type UserType = any;

export type GraphqlContextType = {|
  user: UserType,
  pubsub: Object,
  models: ModelsType,
  dataloaders: dataloadersType,
|}

