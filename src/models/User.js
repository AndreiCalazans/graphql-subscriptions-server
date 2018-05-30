import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
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

Schema.methods = {
  async authenticate(plainText) {
    try {
      return await bcrypt.compare(plainText, this.password);
    } catch (err) {
      return false;
    }
  },
  encryptPassword(password) {
    return bcrypt.hash(password, 8);
  },
};


Schema.pre('save', function checkPassword(next) {
  if (this.isModified('password')) {
    this.encryptPassword(this.password)
      .then((hash) => {
        this.password = hash;
        return next();
      })
      .catch(err => next(err));
  } else {
    return next();
  }
  return null;
});


const UserModel = mongoose.model('User', Schema);

export default UserModel;

