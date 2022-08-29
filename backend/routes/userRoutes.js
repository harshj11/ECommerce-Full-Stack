const express = require('express');
const { createUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfileDetails } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfileDetails);

module.exports = router;