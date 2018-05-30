// @flow

import Cat from './Cat';
import User from './User';

export type ModelsType = {|
  Cat: typeof Cat,
  User: typeof User,
|}

export {
  Cat,
  User,
};
