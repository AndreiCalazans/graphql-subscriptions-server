//  @flow
import CatModel from '../models/Cat';

export type modelsType = {|
  Cat: typeof CatModel,
|}

export type dataloadersType = {|
  CatLoader: Object,
|}

export type GraphqlContextType = {|
  pubsub: Object,
  models: modelsType,
  dataloaders: dataloadersType,
|}

