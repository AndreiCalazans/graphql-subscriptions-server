import mongoose from 'mongoose';

const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'cats',
  },
);

Schema.index({ description: 'text', name: 'text' });

class CatDoc /* :: extends Mongoose$Model */ {}

Schema.loadClass(CatDoc);

const CatModel: typeof CatDoc = mongoose.model('Cat', Schema);

export default CatModel;
