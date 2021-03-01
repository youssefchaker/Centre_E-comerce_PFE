const express = require('express')
const router = express.Router();


const {
    getStoreProducts,
    getallProducts,
    newProduct,
    getSingleProduct,
    getSearchedProduct,
    getTopProducts,
    getNewProducts,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//get all the products for a specific store

router.route('/store/products').get(getStoreProducts);

//a store adds a single product

router.route('/store/products/addproduct').post(/*isAuthenticatedUser, authorizeRoles('store'),*/ newProduct);

//get all products

router.route('/stores/products').get(getallProducts);

//get a single product from a specific store

router.route('/store/products/:id').get(getSingleProduct);


//search for a specific product

router.route('/stores/products/search/:id').get(getSearchedProduct);



//get top products

router.route('/stores/products/topproducts').get(getTopProducts);


//get new products

router.route('/products/newproducts').get(getNewProducts)



//a store updates a single product

router.route('/store/products/:id').put(/*isAuthenticatedUser, authorizeRoles('store'),*/ updateProduct);

//the store can delete a specific product

router.route('/store/product/:id').delete(/*isAuthenticatedUser, authorizeRoles('store'), */deleteProduct);

//the admin can delete a specific product

router.route('/admin/store/product/:id').delete(/*isAuthenticatedUser, authorizeRoles('admin'),*/ deleteProduct);

//a client creates a review for a product 
    
router.route('/store/product/addreview/:id').put(/*isAuthenticatedUser,authorizeRoles('client'),*/ createProductReview)

//the admin can get all the reviews

router.route('/products/reviews').get(/*isAuthenticatedUser,authorizeRoles('admin'),*/ getProductReviews)

//the admin can delete any review

router.route('/stores/products/:id').put(/*isAuthenticatedUser,authorizeRoles('admin'),*/ deleteReview); 


module.exports = router;