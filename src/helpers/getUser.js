// @flow

import jwt from 'jsonwebtoken';
import { User } from '../models';
import { JWT_KEY } from '../config';

export async function getUser(token: string) {
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwt.verify(token.replace('JWT', '').trim(), JWT_KEY);

    return await User.findOne({
      _id: decodedToken.id,
    });
  } catch (err) {
    return null;
  }
}
