const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

const jwt = require('jsonwebtoken');

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if(!token)
        return next(new ErrorHandler(401, "Please login to access this resource."));
    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
});

module.exports = isAuthenticatedUser;
