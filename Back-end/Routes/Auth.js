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
    deleteUser,
    createProductReview,
    updateProductReview,
    deleteProductReview

} = require('../controllers/authController');


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

//user registration

router.route('/register').post(registerUser);

//user login

router.route('/login').post(loginUser);

//user forgets password

router.route('/forgotpass').post(forgotPassword)

//password reset

router.route('/password/reset/:token').put(resetPassword);

//user logout 

router.route('/logout').get(/*isAuthenticatedUser,authorizeRoles('user'),*/logout);

//user dashboard

router.route('/myprofile').get(/*isAuthenticatedUser,authorizeRoles('user'),*/ getUserProfile);

//the user updates his profile

router.route('/update').put(/*isAuthenticatedUser,authorizeRoles('user'),*/ updateUser)

//the admin gets all the users

router.route('/admin/users').get(/*isAuthenticatedUser, authorizeRoles('admin'),*/ allUsers);

//the admin adds deletes or gets a specific user

router.route('/admin/users/:id')
    .get(/*isAuthenticatedUser, authorizeRoles('admin'),*/ getUserDetails)
    .delete(/*isAuthenticatedUser, authorizeRoles('admin'),*/ deleteUser)
    
//the admin adds a specific user

router.route('/admin/users/register').post(/*isAuthenticatedUser, authorizeRoles('admin'),*/ registerUser);

//a client creates a review for a product 
    
router.route('/store/product/addreview/:id').put(/*isAuthenticatedUser,authorizeRoles('client'),*/ createProductReview)

//a client updates a specific product review
    
router.route('/store/product/updatereview/:id').put(/*isAuthenticatedUser,authorizeRoles('client'),*/ updateProductReview)

//a client deletes a specific product review
    
router.route('/store/product/deletereview/:id').put(/*isAuthenticatedUser,authorizeRoles('client'),*/ deleteProductReview)

module.exports = router;