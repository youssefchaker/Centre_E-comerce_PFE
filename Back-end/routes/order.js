const express = require('express')
const router = express.Router();

const {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    deleteOrder

} = require('../controllers/orderController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get( isAuthenticatedUser,getSingleOrder);
router.route('/orders/me').get( isAuthenticatedUser,myOrders);
router.route('/admin/orders/').get(isAuthenticatedUser,authorizeRoles('Admin'),allOrders);
router.route('/admin/order/:id')
    .put( isAuthenticatedUser,authorizeRoles('Admin'),updateOrder)
    .delete(isAuthenticatedUser,authorizeRoles('Admin'),deleteOrder);
















module.exports = router;
