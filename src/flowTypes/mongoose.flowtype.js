/* @flow */
/* eslint-disable */

import mongoose from 'mongoose';

export type MongoId = typeof mongoose.Types.ObjectId | {
  toString(): string,
};
export type MongoOrScalarId = MongoId | string | number;

declare class MongooseDocumentFieldsT {
  id: string | number;
  _id: MongoOrScalarId;
  __v?: number;
}

// D - Document instance
// S - Shape of document props
declare class MongooseDocumentMethodsT<D,S> extends MongooseDocumentFieldsT {
  constructor(data?: S): D,
  save(): Promise<D>;
}

type UpdateResult = {
  nMatched: number,
  nUpserted: number,
  nModified: number,
  ok?: boolean,
};

type MongooseProjection = Object | string;

declare class MongooseQuery<Result> extends Promise<Result> {
  exec(): Promise<Result>,
  where(criteria: Object): MongooseQuery<Result>,
  sort(fields: Object | string): MongooseQuery<Result>,
  limit(n: number): MongooseQuery<Result>,
  select(fields: MongooseProjection): MongooseQuery<Result>,
};

// D - Document instance
// S - Shape of document
declare class MongooseModelT<D,S> {
  constructor(data?: S): D,
  find(criteria: Object, projection?: MongooseProjection, options?: Object): MongooseQuery<Array<D>>;
  findOne(criteria: Object, projection?: MongooseProjection): MongooseQuery<?D>;
  findById(id: MongoOrScalarId, projection?: MongooseProjection): MongooseQuery<?D>;
  count(criteria: Object): Promise<number>;
  remove(criteria: Object): Promise<mixed>;
  update(criteria: Object, update: Object, options?: Object): (Promise<UpdateResult> & { exec(): Promise<UpdateResult> });
  findOneAndRemove(criteria: ?Object, options?: Object): MongooseQuery<?D>,
  findByIdAndRemove(id: MongoOrScalarId, options?: Object): MongooseQuery<?D>,

  modelName: string,
  schema: any,
  create(doc: S | S[]): Promise<D>,
  where(criteria: Object): MongooseQuery<D>,
}


/// DO NOT REMOVE!!!
/// FOLLOWING STUBS ARE REQUIRED FOR PROPER IMPORT CHECKS
// $FlowFixMe
export class MongooseDocumentFieldsT {};
// $FlowFixMe
export class MongooseDocumentMethodsT {};
// $FlowFixMe
export class MongooseModelT {};