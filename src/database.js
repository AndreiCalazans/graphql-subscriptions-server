//  @flow

import mongoose from 'mongoose';

import { MONGO_URI, MONGO_DATABASE_NAME } from './config';

const connectDatabase = (): Promise<any> =>
  new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', error => reject(error))
      // eslint-disable-next-line
      .on('close', () => console.log('Database connection closed.'))
      // eslint-disable-next-line
      .on('open', () => console.log('Database connection openned.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(`${MONGO_URI}${MONGO_DATABASE_NAME}`, { autoIndex: false });
  });


export default connectDatabase;
