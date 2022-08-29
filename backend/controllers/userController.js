const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const UserService = require('../services/userService');

// Register new user.
exports.createUser = catchAsyncErrors(UserService.createUser);

// Login user.
exports.loginUser = catchAsyncErrors(UserService.loginUser);

// Logout user.
exports.logoutUser = catchAsyncErrors(UserService.logoutUser);

// Forgot password.
exports.forgotPassword = catchAsyncErrors(UserService.forgotPassword);

// Reset password.
exports.resetPassword = catchAsyncErrors(UserService.resetPassword);

// Get user details.
exports.getUserDetails = catchAsyncErrors(UserService.getUserDetails);

// Change user password.
exports.updatePassword = catchAsyncErrors(UserService.updatePassword);

// Update profile details
exports.updateProfileDetails = catchAsyncErrors(UserService.updateProfile);