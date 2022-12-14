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

        // Setting the User object to track the user who has created the given product.
        req.body.user = req.user.id;
        req.body.category = req.body.category.toUpperCase();

        /*
            Persist product in db, if any error occurs while saving, send appropriate response. The error
            handling would be done at the place wherever this function would actually be called.
        */
        const product = await Product.create(req.body);
    
        // Otherwise return success response.
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

        const productsPerPage = 8;
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
        
        // Otherwise return success response.
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
        let productId = req.params.productId;
        // First checking if the product id is valid or not.
        if(!isValidProductId(productId))
            return next(new ErrorHandler(412, "Invalid Product Id!"));
        
        // Get product details.
        const product = await Product.findById(productId);
    
        // If product not found return product not found response.
        if(!product)
            return next(new ErrorHandler(404, `Product with id ${productId} not found!`));
        
        // Otherwise return success response.
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
        let productToUpdate = null, productId = req.params.productId;
    
        // First checking if the product id is valid or not.
        if(!isValidProductId(productId))
            return next(new ErrorHandler(412, "Invalid Product Id!"));
    
        // Check if product with given id is available or not in db.
        productToUpdate = await Product.findById(productId);
        
        // If not available return 404 status.
        if(!productToUpdate)
            return next(new ErrorHandler(404, `Product with id ${productId} not found!`));
    
        // Otherwise, update the product.
        productToUpdate = await Product.findByIdAndUpdate(productId, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    
        // Return success response.
        return res.status(200).json({
            success: true,
            product: productToUpdate
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

        let productToDelete = null, productId = req.params.productId;
    
        // First checking if the product id is valid or not.
        if(!isValidProductId(productId))
            return next(new ErrorHandler(412, "Invalid Product Id!"));
        
        // Check if product with given id is available or not in db.
        productToDelete = await Product.findById(productId);
    
        // If not available return 404 status.
        if(!productToDelete)
            return next(new ErrorHandler(404, `Product with id ${productId} not found!`));
    
        // Otherwise delete the product.
        productToDelete = await Product.findByIdAndDelete(productId);
    
        // Return success response.
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully!"
        });
    }

    /**
     * Create or update the product review.
     * 
     * @param {HTTP} req 
     * @param {HTTP} res 
     * @param {function} next
     * 
     * @return an appropriate success or failure response.
     */
    static createOrUpdateProductReview = async (req, res, next) => {
        let productId = req.query.productId;

        // First checking if the product id is valid or not.
        if(!isValidProductId(productId))
            return next(new ErrorHandler(412, "Invalid Product Id!"));

        // Now getting the product for which review has to be entered
        const product = await Product.findById(productId);

        // Throw the failure response, if product with given id doesn't exists.
        if(!product)
            return next(new ErrorHandler(404, `Product with id ${productId} not found!`));

        const { rating, comment } = req.body;
        
        // If rating not entered.
        if(!rating) 
            return next(new ErrorHandler(400, "Rating is required!"));

        // Preparing new review object.
        const review = { 
            user: req.user.id,
            name: req.user.name, 
            rating: rating === undefined ? undefined : Number(rating), 
            comment 
        };

        /*
            In the given for loop, we are checking if review for the given product exists, then replace the existing 
            review, otherwise after the for loop, check if review has not been added then add this review to the 
            reviews array for the given product.
        */
        let isReviewed = false;
        let avg = 0

        for(let i = 0; i < product.reviews.length; i++) {
            if(product.reviews[i].user.toString() === req.user.id) {
                product.reviews[i] = {...review}
                isReviewed = true;
            }
            avg += product.reviews[i].rating;
        }

        if(!isReviewed) {
            avg += review.rating;
            product.reviews.push(review);
            product.numberOfReviews += 1;
        }

        product.rating = Math.round((avg / product.reviews.length) * 100) / 100;
        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true
        });
    }

    /**
     * Return all the reviews of a product.
     * 
     * @param {HTTP} req 
     * @param {HTTP} res 
     * @param {function} next 
     * 
     * @return a sucess response with all the reviews if the product with given product id exists else
     * the error response if product with given product id not found.
     */
    static getProductReviews = async (req, res, next) => {
        const product = await Product.findById(req.query.productId);

        if(!product)
            return next(new ErrorHandler(404, `Product with id ${productId} not found!`));

        res.status(200).json({
            success: true,
            reviews: product.reviews
        });
    }

    /**
     * Delete a product review given by the user.
     * 
     * @param {HTTP} req 
     * @param {HTTP} res 
     * @param {function} next 
     * 
     * @return a success response if review deleted successfully or a failure response if product not found
     * with the given product id or user is trying to delete some another person's review.
     */
    static deleteProductReview = async (req, res, next) => {
        const product = await Product.findById(req.query.productId);

        if(!product)
            return next(new ErrorHandler(404, `Product with id ${productId} not found!`));
        
        let avg = 0, isValidUser = true;

        /*
            Removing the current review, also calculating the average under this filter method, so as to 
            prevent calculating it further. Also making sure that the user deletes only his / her review
            if it's not so, failure response would be thrown further.
         */
        const reviews = product.reviews.filter(review => {
            if(review.id.toString() !== req.query.id) {
                avg += review.rating;
                return true;
            }

            // Checking if the user id stored in review is same as the requested user's id.
            if(review.user.toString() !== req.user.id)
                isValidUser = false;
            
            return false;
        });

        // If user is trying to delete some other user's review.
        if(!isValidUser)
            return next(new ErrorHandler(422, "Not allowed!"));

        const rating = avg / reviews.length;
        const numberOfReviews = reviews.length;

        await Product.findByIdAndUpdate(req.query.productId, {
            rating,
            numberOfReviews,
            reviews
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            reviews
        });
    }

    /**
     * Get all products by specific category.
     * 
     * @param {HTTP} req 
     * @param {HTTP} res 
     * @param {function} next 
     * 
     * @return a success response if review deleted successfully or a failure response if product not found
     * with the given product id or user is trying to delete some another person's review.
     */
    static getProductsByCategory = async (req, res, next) => {
        const productsBasedOnCategory = await Product.find({ category: req.params.category.toUpperCase() });
        if(!productsBasedOnCategory)
            return next(new ErrorHandler(404, `No ${productsBasedOnCategory} available!`));
        
            return res.status(200).json({
                success: true,
                products: productsBasedOnCategory
            });
    }
}

module.exports = ProductService;