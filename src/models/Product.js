const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name cannot be longer than 50 characters'],
      index: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9]+$/,
      minlength: [3, 'Code must be at least 3 characters long'],
      maxlength: [20, 'Code cannot be longer than 20 characters'],
    },
    value: {
      type: Number,
      required: true,
      min: [0, 'Value must be positive'],
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: 'version',
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  },
);

productSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Product', productSchema);
