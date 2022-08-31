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

// Get all users(Admin route)
exports.getAllUsers = catchAsyncErrors(UserService.getAllUsers);

// Get specific user details(Admin route)
exports.getSingleUser = catchAsyncErrors(UserService.getSingleUser);

// Update user role(Admin route)
exports.updateUserRole = catchAsyncErrors(UserService.updateUserRole);

// Delete user(Admin route)
exports.deleteUser = catchAsyncErrors(UserService.deleteUser);