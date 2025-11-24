import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.01
  },
  imageUrl: {
    type: String,
    default: '/uploads/default.png'
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
});

export default model('Product', ProductSchema);