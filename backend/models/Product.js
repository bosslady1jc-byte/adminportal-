import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  longDescription: String,
  category: {
    type: String,
    enum: ['Tax Training', 'ERO Software', 'Tax Forms', 'Bundles', 'Other'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: Number,
  discount: {
    type: Number,
    default: 0
  },
  image: String,
  images: [String],
  sku: String,
  isActive: {
    type: Boolean,
    default: true
  },
  isDigital: {
    type: Boolean,
    default: true
  },
  downloadUrl: String,
  accessDuration: {
    type: String,
    enum: ['lifetime', '30days', '90days', '1year'],
    default: 'lifetime'
  },
  features: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', productSchema);
