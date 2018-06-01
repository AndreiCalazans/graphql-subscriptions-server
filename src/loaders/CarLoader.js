// @flow
import DataLoader from 'dataloader';
import {
  connectionFromMongoCursor,
  mongooseLoader,
} from '@entria/graphql-mongoose-loader';
import type { ConnectionArguments } from 'graphql-relay';

import { Car as CarModel } from '../models';
import type { CarType } from '../types/Car';
import type { GraphqlContextType } from '../flowTypes/GraphqlContextType';

export default class Car {
  id: string;
  plate: string;
  brand: string;
  createdBy: string;
  createdAt: string;
  updatedAt: ?string;

  // eslint-disable-next-line
  constructor(data: CarType, { cat }: GraphqlContextType) {
    this.id = data.id;
    this.plate = data.plate;
    this.brand = data.brand;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.createdBy = data.createdBy;
  }
}

export const getLoader = () =>
  //  $FlowFixMe
  new DataLoader(ids => mongooseLoader(CarModel, ids));

  // eslint-disable-next-line
const viewerCanSee = (context, data) =>
  // Anyone can see another cat
  true;


export const load = async (
  context: GraphqlContextType,
  id: string,
): Promise<?Car> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.CarLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee(context, data) ? new Car(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphqlContextType, id: string) =>
  dataloaders.CarLoader.clear(id.toString());

export const loadCars = async (
  context: GraphqlContextType,
  args: ConnectionArguments,
) => {
  const cursor = context.models.Car.find().sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor,
    context,
    args,
    loader: load,
  });
};
