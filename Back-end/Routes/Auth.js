const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    logout,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser

} = require('../controllers/authController');


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

//user registration

router.route('/register').post(registerUser);

//user login

router.route('/login').post(loginUser);

//user forgets password

router.route('/password/forgot').post(forgotPassword)



//user logout 

router.route('/logout').get(isAuthenticatedUser,logout,authorizeRoles('client'));

//user dashboard

router.route('/myprofile').get(isAuthenticatedUser, getUserProfile,authorizeRoles('client'));




//get all users(admin)

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);

//get add or delte a specific user (admin)

router.route('/admin/users/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)
    .post(isAuthenticatedUser, authorizeRoles('admin'), registerUser);


/*
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)*/


/*//user wants to reset password

router.route('/password/reset/:token').put(resetPassword)*/
module.exports = router;