const express = require('express');
const { createUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfileDetails, getAllUsers, getSingleUser, deleteUser, updateUserRole } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfileDetails);
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;