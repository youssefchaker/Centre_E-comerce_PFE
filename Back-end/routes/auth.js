const express = require('express');
const router = express.Router();


const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateUser,
    allUsers,
    getUserDetails,
    AdminUpdateUser,
    deleteUser

} = require('../controllers/authController');



const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')




router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/myprofile').get(isAuthenticatedUser,getUserProfile);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/myprofile/update').put(isAuthenticatedUser,updateUser);
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('Admin'),allUsers);
router.route('/admin/user/:id')
              .get(isAuthenticatedUser,authorizeRoles('Admin'),getUserDetails)
              .put(isAuthenticatedUser,authorizeRoles('Admin'),AdminUpdateUser)
              .delete(isAuthenticatedUser,authorizeRoles('Admin'),deleteUser);






















module.exports = router;




