const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ProductService = require('../services/productService');

// Create new product(Admin only).
exports.createProduct = catchAsyncErrors(ProductService.createProduct);

// Get all products.
exports.getAllProducts = catchAsyncErrors(ProductService.getAllProducts);

// Update a product with given id(Admin only).
exports.updateProduct = catchAsyncErrors(ProductService.updateProduct);

// Delete a product(Admin only).
exports.deleteProduct = catchAsyncErrors(ProductService.deleteProduct);

// Get specific product details.
exports.getProductDetails = catchAsyncErrors(ProductService.getProductDetails);

// Add product review.
exports.createOrUpdateProductReview = catchAsyncErrors(ProductService.createOrUpdateProductReview);

// Get all the reviews of a product.
exports.getProductReviews = catchAsyncErrors(ProductService.getProductReviews);

// Delete a review.
exports.deleteProductReview = catchAsyncErrors(ProductService.deleteProductReview);