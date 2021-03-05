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
    getProductReviews,
    getallProductReviews
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//a store adds a new product

router.route('/store/addproduct').post(/*isAuthenticatedUser, authorizeRoles('store'),*/ newProduct);

//get all the products for a specific store

router.route('/store/products/:id').get(/*isAuthenticatedUser, authorizeRoles('store'),*/getStoreProducts);

//get a single product from a specific store

router.route('/store/product/:id').get(/*isAuthenticatedUser, authorizeRoles('store'),*/getSingleProduct);

//search for a specific product

router.route('/products/search').get(getSearchedProduct);

//get top products

router.route('/products/topproducts').get(getTopProducts);

//get new products

router.route('/products/newproducts').get(getNewProducts)

//get all products

router.route('/products').get(/*isAuthenticatedUser, authorizeRoles('store'),*/getallProducts);

//a store updates a single product

router.route('/store/product/update/:id').put(/*isAuthenticatedUser, authorizeRoles('store'),*/ updateProduct);

//the store can delete a specific product

router.route('/store/product/delete/:id').delete(/*isAuthenticatedUser, authorizeRoles('store'), */deleteProduct);

//the admin can delete a specific product

router.route('/admin/store/product/:id').delete(/*isAuthenticatedUser, authorizeRoles('admin'),*/ deleteProduct);

//the admin can get all the products

router.route('/admin/products').get(/*isAuthenticatedUser, authorizeRoles('store'),*/getallProducts);

//the admin can get a specifc product

router.route('/admin/products/:id').get(/*isAuthenticatedUser, authorizeRoles('admin'),*/getSingleProduct);

//the admin can get all the reviews for a specific product

router.route('/admin/product/reviews/:id').get(/*isAuthenticatedUser,authorizeRoles('admin'),*/ getProductReviews)

//the admin can get all the reviews

router.route('/admin/products/reviews').get(/*isAuthenticatedUser,authorizeRoles('admin'),*/ getallProductReviews)

module.exports = router;