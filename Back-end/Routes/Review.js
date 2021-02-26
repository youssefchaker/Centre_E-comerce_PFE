const express = require('express')
const router = express.Router();


const {
    createProductReview,
    getProductReviews,
    deleteReview

} = require('../controllers/reviewController')


//a client creates a review for a product 
    
router.route('/store/product/reviews/').put(isAuthenticatedUser,authorizeRoles('client'), createProductReview)

//the admin can get all the reviews

router.route('/reviews').get(isAuthenticatedUser,authorizeRoles('admin'), getProductReviews)

//the admin can delete any review

router.route('/reviews').delete(isAuthenticatedUser, deleteReview,authorizeRoles('admin'))
