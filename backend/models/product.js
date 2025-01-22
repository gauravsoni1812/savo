import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  adname: { type: String, required: true },
  category: { type: String, required: true},
  price: { type: Number, required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
