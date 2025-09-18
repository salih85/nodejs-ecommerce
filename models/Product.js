const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  image: String,
  stock: Number,
  category: String   
});

module.exports = mongoose.model('Product', productSchema);
