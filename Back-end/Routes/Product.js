const express = require('express')
const router = express.Router();


const {
    getProducts,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//get all the products for a specific store

router.route('/store/products').get(authorizeRoles('admin'),getProducts,isAuthenticatedUser);

//get all products(admin)

router.route('/admin/products').get(authorizeRoles('admin'),getAdminProducts,isAuthenticatedUser);

//get a single product from a specific store

router.route('/store/products/:id').get(getSingleProduct);

//search for a specific product

router.route('/products/:id').get(getsearchedproduct);

//get top products(admin)

router.route('/products/:id1-:id2-:id3-:id4-:id5').get(gettopProducts, authorizeRoles('admin'),isAuthenticatedUser);

//get new products(admin)

router.route('/products/:id1-:id2-:id3-:id4-:id5').get(getnewProducts, authorizeRoles('admin'),isAuthenticatedUser)

//a store adds a single product

router.route('/store/products/').post(isAuthenticatedUser, authorizeRoles('store'), newProduct);

//a store updates a single product

router.route('/store/products/:id').post(isAuthenticatedUser, authorizeRoles('store'), updateProduct);

//the store can delete a specific product

router.route('/store/product/:id').delete(isAuthenticatedUser, authorizeRoles('store'), deleteProduct);

//the admin can delete a specific product

router.route('/admin/store/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;