import { combineReducers } from 'redux';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'

// Import custom components
import {newProductReducer,
    getStoreProductsReducer,
    getProductReducer,
    searchProductsReducer,
    topProductsReducer,
    getNewProductsReducer,
    getAllProductsReducer,
    updateProductReducer,
    deleteProductReducer,
    deleteAdminProductReducer,
    getAdminProductsReducer,
    newReviewReducer,
    getAdminReviewsReducer,
    getProductReviewReducer,
    deleteProductReviewReducer,
    deleteAdminProductReviewReducer,
    updateProductReviewReducer,
    getStoreNameReducer

} from './products';
import cartReducer from './cart';
import filtersReducer from './filters';
import eventReducer from './events';
import {productReducer} from './products';

const rootReducer = combineReducers({
    data: productReducer,
    newproduct: newProductReducer,
    storeproducts:getStoreProductsReducer,
    product:getProductReducer,
    searchedproducts:searchProductsReducer,
    topproducts:topProductsReducer,
    newproducts:getNewProductsReducer,
    allproducts:getAllProductsReducer,
    updateproduct:updateProductReducer,
    deleteproduct:deleteProductReducer,
    deleteadminproduct:deleteAdminProductReducer,
    adminproducts:getAdminProductsReducer,
    newreview:newReviewReducer,
    adminreviews:getAdminReviewsReducer,
    productreviews:getProductReviewReducer,
    deleteproductreview:deleteProductReviewReducer,
    deleteadminproductreview:deleteAdminProductReviewReducer,
    updateproductreview:updateProductReviewReducer,
    storename:getStoreNameReducer,
    cartList: cartReducer,
    filters: filtersReducer,
    events:eventReducer,
    Intl
});

export default rootReducer;