const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  stock: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);
