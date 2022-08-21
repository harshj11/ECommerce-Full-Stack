const Product = require('../model/productModel');
const ErrorHandler = require('../utils/errorHandler');
const { isValidProductId } = require('../utils/productUtil');
const ApiFeatures = require('../utils/apiFeatures');

class ProductService {

    /**
     * Persit the new product into the database.
     * 
     * @param {HTTP} req, a request object, body of which will be having new product details.
     * @param {HTTP} res
     * @param {function} next
     * 
     * @return an appropriate success response having product details, if product created successfully
     * or an appropriate failure response, if any error occurs.
     */
    static createProduct =  async (req, res, next) => {

        //Setting the User object to track the user who has created the given product.
        req.body.user = req.user.id;

        /*
            Persist product in db, if any error occurs while saving, send appropriate response. The error
            handling would be done at the place wherever this function would actually be called.
        */
        const product = await Product.create(req.body);
    
        //Otherwise return success response.
        return res.status(201).json({
            success: true,
            product
        });
    }

    /**
     * Get all the products from db.
     * 
     * @param {HTTP} req
     * @param {HTTP} res
     * @param {function} next
     * 
     * @return an appropriate success response having all the products details or an appropriate failure response,
     * if any error occurs.
     */
    static getAllProducts = async (req, res) => {
        
        let productsFindQuery = Product.find(), queryParameters = req.query;

        const productsPerPage = 5;
        const productCount = await Product.countDocuments();
        /*
            Preparing the query accordingly, so as to search the product based on the keyword, filter the
            products, showing the products for the corresponding page number.
        */
        const apiFeatures = new ApiFeatures(productsFindQuery, queryParameters)
            .search()
            .filter()
            .pagination(productsPerPage);

        /*
            Get all products from db / the products based on the keyword / the products based on the filter / the
            number of products based on the page number, if any error occurs while retrieving, send appropriate 
            response. The error handling would be done at the place wherever this function would actually be called.
        */
        const products = await apiFeatures.query;
        
        //Otherwise return success response.
        return res.status(200).json({
            success: true,
            products,
            productCount
        });
    }

    /**
     * Get specific product details from db.
     * 
     * @param {HTTP} req 
     * @param {HTTP} res 
     * @param {function} next
     * 
     * @return an appropriate success response if product details found successfully, or an appropriate 
     * failure response, if any error occurs.
     */
    static getProductDetails = async (req, res, next) => {
        let productId = req.params.id;
    
        //First checking if the product id is valid or not.
        if(!isValidProductId(productId))
            return next(new ErrorHandler(412, "Invalid Product Id!"));
        
        //Get product details.
        const product = await Product.findById(productId);
    
        //If product not found return product not found response.
        if(!product)
            return next(new ErrorHandler(404, "The requested resource was not found!"));
        
        //Otherwise return success response.
        return res.status(200).json({
            success: true,
            product
        });
    }

    /**
     * Update a product with given id in db.
     * 
     * @param {HTTP} req, a request object, body of which will be having updated product details.
     * @param {HTTP} res
     * @param {function} next
     * 
     * @return an appropriate success response having updated product details, if product updated successfully 
     * or an appropriate failure response, if any error occurs.
     */
    static updateProduct = async(req, res, next) => {
        let productToUpdate = null, productId = req.params.id;
    
        //First checking if the product id is valid or not.
        if(!isValidProductId(productId))
            return next(new ErrorHandler(412, "Invalid Product Id!"));
    
        //Check if product with given id is available or not in db.
        productToUpdate = await Product.findById(productId);
        
        //If not available return 404 status.
        if(!productToUpdate)
            return next(new ErrorHandler(404, "The requested resource was not found!"));
    
        //Otherwise, update the product.
        productToUpdate = await Product.findByIdAndUpdate(productId, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    
        //Return success response.
        return res.status(200).json({
            success: true,
            productToUpdate
        });
    }

    /**
     * Delete a product with given id from the db.
     * 
     * @param {HTTP} req 
     * @param {HTTP} res
     * @param {function} next
     * 
     * @return an appropriate success response if product deleted successfully, or an appropriate failure response,
     * if any error occurs.
     */
    static deleteProduct = async(req, res, next) => {

        let productToDelete = null, productId = req.params.id;
    
        //First checking if the product id is valid or not.
        if(!isValidProductId(productId))
            return next(new ErrorHandler(412, "Invalid Product Id!"));
        
        //Check if product with given id is available or not in db.
        productToDelete = await Product.findById(productId);
    
        //If not available return 404 status.
        if(!productToDelete)
            return next(new ErrorHandler(404, "The requested resource was not found!"));
    
        //Otherwise delete the product.
        productToDelete = await Product.findByIdAndDelete(productId);
    
        //Return success response.
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully!"
        });
    }
}

module.exports = ProductService;