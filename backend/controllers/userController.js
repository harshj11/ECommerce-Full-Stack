const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const UserService = require('../services/userService');

//Register new user.
exports.createUser = catchAsyncErrors(UserService.createUser);

//Login user.
exports.loginUser = catchAsyncErrors(UserService.loginUser);

//Logout user.
exports.logoutUser = catchAsyncErrors(UserService.logoutUser);

//Forgot password.
exports.forgotPassword = catchAsyncErrors(UserService.forgotPassword);