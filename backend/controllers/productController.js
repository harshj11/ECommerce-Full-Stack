const Product = require('../model/productModel');
const { isValidProductId } = require('../utils/productUtil');

/**
 * Create new product(Admin only).
 * 
 * @param {HTTP} req, a request object, body of which will be having new product details.
 * @param {HTTP} res
 * 
 * @return an appropriate success response having product details, if product created successfully
 * or an appropriate failure response, if any error occurs.
 */
exports.createProduct = async (req, res) => {
    let product = null;

    //Persist product in db, if any error occurs while saving, send appropriate response.
    try {
        product = await Product.create(req.body);
    } catch(error) {
        return res.status(500).json({
            sucess: false,
            errorMessage: "Internal server error!"
        });
    }

    //Otherwise return success response.
    return res.status(201).json({
        success: true,
        product
    });
}

/**
 * Get all the products.
 * 
 * @param {HTTP} req
 * @param {HTTP} res
 * 
 * @return an appropriate success response having all the products details or an appropriate failure response,
 * if any error occurs.
 */
exports.getAllProducts = async (req, res) => {
    let products = null;
    
    //Get all products from db, if any error occurs while retrieving, send an appropriate response.
    try {
        products = await Product.find();
    } catch(error) {
        return res.status(500).json({
            sucess: false,
            errorMessage: "Internal server error!"
        });
    }

    //Otherwise return success response.
    return res.status(200).json({
        success: true,
        products
    });
}

/**
 * Update a product with given id(Admin only).
 * 
 * @param {HTTP} req
 * @param {HTTP} res
 * 
 * @return an appropriate success response having updated product details, if product updated successfully 
 * or an appropriate failure response, if any error occurs.
 */
exports.updateProduct = async(req, res) => {
    let productToUpdate = null, productId = req.params.id;

    //First checking if the product id is valid or not.
    if(!isValidProductId(productId))
        return res.status(412).json({
            success: false,
            errorMessage: "Invalid product id!"
        });

    //Check if product with given id is available or not in db.
    try {
        productToUpdate = await Product.findById(productId);
    } catch (error) {
        return res.status(500).json({
            success: false,
            errorMessage: "Internal server error!"
        });
    }

    //If not available return 404 status.
    if(!productToUpdate) {
        return res.status(404).json({
            success: false,
            errorMessage: "The requested resource was not found!"
        });
    }

    //Otherwise, update the product.
    try {
        productToUpdate = await Product.findByIdAndUpdate(productId, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            errorMessage: "Internal server error!"
        });
    }

    //Return success response.
    return res.status(200).json({
        success: true,
        productToUpdate
    })
}

/**
 * Delete a product(Admin only).
 * 
 * @param {HTTP} req 
 * @param {HTTP} res
 * 
 * @return an appropriate success response if product deleted successfully, or an appropriate failure response,
 * if any error occurs.
 */
exports.deleteProduct = async(req, res) => {

    let productToDelete = null, productId = req.params.id;

    //First checking if the product id is valid or not.
    if(!isValidProductId(productId))
        return res.status(412).json({
            success: false,
            errorMessage: "Invalid product id!"
        });
    
    //Check if product with given id is available or not in db.
    try {
        productToDelete = await Product.findById(productId);
    } catch (error) {
        return res.status(500).json({
            success: false,
            errorMessage: "Internal server error!"
        });
    }

    //If not available return 404 status.
    if(!productToDelete) {
        return res.status(404).json({
            success: false,
            errorMessage: "The requested resource was not found!"
        });
    }

    //Otherwise delete the product.
    try {
        productToDelete = await Product.findByIdAndDelete(productId);
    } catch(error) {
        return res.status(500).json({
            success: false,
            errorMessage: "Internal server error!"
        });
    }

    //Return success response.
    return res.status(200).json({
        success: true,
        message: "Product deleted successfully!"
    });
}

/**
 * Get specific product details.
 * 
 * @param {HTTP} req 
 * @param {HTTP} res 
 * 
 * @return an appropriate success response if product details found successfully, or an appropriate 
 * failure response, if any error occurs.
 */
exports.getProductDetails = async(req, res) => {
    let product = null, productId = req.params.id;

    //First checking if the product id is valid or not.
    if(!isValidProductId(productId))
        return res.status(412).json({
            success: false,
            errorMessage: "Invalid product id!"
        });
    
    //Get product details.
    try {
        product = await Product.findById(productId);
    } catch(error) {
        return res.status(500).json({
            success: false,
            errorMessage: "Internal server error!"
        });
    }

    //If product not found return product not found response.
    if(!product)
        return res.status(404).json({
            success: false,
            errorMessage: "The requested resource was not found!"
        });
    
    //Otherwise return success response.
    return res.status(200).json({
        success: true,
        product
    });
}