const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

const jwt = require('jsonwebtoken');

/**
 * Authenticates the user.
 * 
 * @return an Error response if user is unauthenticated or any error occurs, 
 * else calls the next middleware .
 */
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if(!token)
        return next(new ErrorHandler(401, "Please login to access this resource."));
    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
});

/**
 * Authorizes the user.
 * 
 * @param {Array} roles
 * 
 * @return an Error response if the user is unauthorized, else calls the next middleware.
 */
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role))
            return next(new ErrorHandler(403, "Access not allowed!"));
        next();
    }
};