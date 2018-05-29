import mongoose from 'mongoose';

const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

class UserDoc /* :: extends Mongoose$Model */ {

}

Schema.loadClass(UserDoc);

const UserModel: typeof UserDoc = mongoose.model('User', Schema);

export default UserModel;

