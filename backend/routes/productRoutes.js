const express = require('express');

const { 
    getAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getProductDetails,
    createOrUpdateProductReview,
    getProductReviews,
    deleteProductReview
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/product").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route("/admin/product/:productId")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:productId").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createOrUpdateProductReview);

router.route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;``