const express = require('express');
const {adminDashboard,viewCategories,addCategories,deleteCategories,viewProducts,addProductpage,addProduct,deleteProduct} = require('../controllers/admin');

const router = express.Router();

// Dashboard
router.get('/', adminDashboard);

// Categories
router.get('/categories', viewCategories);
router.post('/categories', addCategories);
router.post('/categories/delete/:id', deleteCategories);

// Products
router.get('/products', viewProducts);
router.get('/product/add', addProductpage);
router.post('/products/add', addProduct);
router.post('/products/delete/:id', deleteProduct);

module.exports = router;
