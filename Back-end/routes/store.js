const express = require('express')
const router = express.Router();



const {
    newStore,
    getStores,
    getStoresAdmin,
    getSingleStore,
    updateStore,
    deleteStore,
    getProfileStore
   

} = require('../controllers/storeController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')


router.route('/store/new').post( isAuthenticatedUser,newStore);
router.route('/stores').get(getStores);
router.route('/store/:id').get(getSingleStore);

router.route('/user/store/:id').put(isAuthenticatedUser,authorizeRoles('Seller'),updateStore);
router.route('/admin/stores').get(isAuthenticatedUser,authorizeRoles('Admin'),getStoresAdmin);
router.route('/admin/store/:id').put(isAuthenticatedUser,authorizeRoles('Admin'),updateStore)
                                .delete(isAuthenticatedUser,authorizeRoles('Admin'),deleteStore);
 router.route('/mystore').get(isAuthenticatedUser,authorizeRoles('Seller'),getProfileStore);











module.exports = router;
