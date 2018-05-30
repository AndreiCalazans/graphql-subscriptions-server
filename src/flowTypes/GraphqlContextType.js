//  @flow

import DataLoader from 'dataloader';
import type { ModelsType } from '../models';

export type dataloadersType = {|
  CatLoader: DataLoader<string, any>,
|}

export type GraphqlContextType = {|
  pubsub: Object,
  models: ModelsType,
  dataloaders: dataloadersType,
|}

