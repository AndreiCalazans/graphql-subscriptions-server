import mongoose from 'mongoose';

const Schema = mongoose.Schema(
  {
    plate: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'cars',
  },
);

Schema.index({ description: 'text', name: 'text' });

class CarDoc /* :: extends Mongoose$Model */ {}

Schema.loadClass(CarDoc);

const CarModel: typeof CarDoc = mongoose.model('Car', Schema);

export default CarModel;
