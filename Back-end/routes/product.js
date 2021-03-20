const express = require('express')
const router = express.Router();


const {
    
    newProduct,
    getStoreProducts,
    getProducts,
    adminGetProducts,
    getSingleProduct,
    getTopProducts,
    getNewProducts,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,
    updateProductReview,
    getAllProductReviews
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/store/product/new').post(isAuthenticatedUser, authorizeRoles('Seller'), newProduct);//
router.route('/store/products/:id').get(isAuthenticatedUser, authorizeRoles('Seller'),getStoreProducts);//
router.route('/store/product/:id')
              .put(isAuthenticatedUser, authorizeRoles('Seller'),updateProduct)//
              .delete(isAuthenticatedUser, authorizeRoles('Seller','Admin'),deleteProduct);//


router.route('/products').get(getProducts);//
router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles('Admin'),adminGetProducts);//
router.route('/product/:id').get(getSingleProduct);//
router.route('/products/top').get(getTopProducts);//
router.route('/products/new').get(getNewProducts);//
router.route('/products/search').get(getSearchedProduct);//
router.route('/review/:id').put(isAuthenticatedUser, createProductReview)//
router.route('/reviews/:id').get(getProductReviews)//
router.route('/reviews/:id').delete(isAuthenticatedUser, deleteReview)//
router.route('/product/updatereview/:id').put(isAuthenticatedUser, updateProductReview)//
router.route('/admin/reviews').get(isAuthenticatedUser,authorizeRoles('Admin'),getAllProductReviews)//

















module.exports = router;
