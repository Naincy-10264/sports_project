// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

// Public routes for all products and single products
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

// Admin-only routes
router.route('/').post(protect, admin, createProduct);
router.route('/:id').put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;