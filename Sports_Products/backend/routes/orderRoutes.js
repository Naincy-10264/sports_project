const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderToDelivered, // Import the new controller function
} = require('../controllers/orderController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

// Route for creating a new order. Only accessible to logged-in users.
router.route('/').post(protect, createOrder);

// Route for admin to get all orders.
router.route('/').get(protect, admin, getAllOrders);

// Route for a logged-in user to view their own orders.
router.route('/myorders').get(protect, getMyOrders);

// Route for an admin to update an order's status to delivered.
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

// Route for a logged-in user to view a specific order by its ID.
// This route should be protected.
router.route('/:id').get(protect, getOrderById);

module.exports = router;