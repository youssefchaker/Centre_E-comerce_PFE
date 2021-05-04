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
    deleteAdminReview,
    updateProductReview,
    getAllProductReviews,
    getSearchedProduct,
    getStorename,
    updateProductDetails
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/store/product/new').post( isAuthenticatedUser, authorizeRoles('Seller'),  newProduct);//
router.route('/store/products/:id').get( isAuthenticatedUser, authorizeRoles('Seller'), getStoreProducts);//
router.route('/store/product/:id')
              .put( isAuthenticatedUser, authorizeRoles('Seller'), updateProduct)//
              .delete( isAuthenticatedUser, authorizeRoles('Seller','Admin'), deleteProduct);//
router.route('/store/productdetail/:id').put( isAuthenticatedUser, authorizeRoles('Seller'), updateProductDetails)//

router.route('/products').get(getProducts);//
router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles('Admin'),adminGetProducts);//
router.route('/product/:id').get(getSingleProduct);//
router.route('/products/top').get(getTopProducts);//
router.route('/products/new').get(getNewProducts);//
router.route('/products/search/:keyword').get(getSearchedProduct);//
router.route('/review/:id').put( isAuthenticatedUser,  createProductReview)//
router.route('/reviews/:id').get(getProductReviews)//
router.route('/reviews/:reviewid/:productid').delete( isAuthenticatedUser,  deleteReview)//
router.route('/admin/reviews/:reviewid/:productid').delete(isAuthenticatedUser, authorizeRoles('Admin'),deleteAdminReview)//
router.route('/product/updatereview/:id').put( isAuthenticatedUser, updateProductReview)//
router.route('/admin/reviews').get(isAuthenticatedUser,authorizeRoles('Admin'),getAllProductReviews)//
router.route('/storename/:id').get(getStorename);//
















module.exports = router;
