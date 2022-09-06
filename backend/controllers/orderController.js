const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const OrderService = require('../services/orderService');

// Create new order
exports.newOrder = catchAsyncErrors(OrderService.newOrder);

// Get single order (Admin Only)
exports.getSingleOrder = catchAsyncErrors(OrderService.getSingleOrder);

// Get my orders
exports.myOrders = catchAsyncErrors(OrderService.myOrders);

// Get all orders (Admin Only)
exports.getAllOrders = catchAsyncErrors(OrderService.getAllOrders);

// Update order status (Admin Only)
exports.updateOrderStatus = catchAsyncErrors(OrderService.updateOrderStatus);

// Delete an order (Admin Only)
exports.deleteOrder = catchAsyncErrors(OrderService.deleteOrder);