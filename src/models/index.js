// @flow

import Car from './Car';
import User from './User';

export type ModelsType = {|
  Car: typeof Car,
  User: typeof User,
|}

export {
  Car,
  User,
};
