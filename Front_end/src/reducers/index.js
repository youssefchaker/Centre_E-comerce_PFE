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
import {
    newEventReducer,
    deleteEventReducer,
    getLimitedEventsReducer,
    getEventsReducer,
    getEventReducer,
    getStoreEventsReducer,
    updateEventReducer,
    getAdminEventsReducer,
    deletrAdminEventReducer 
} from './events';
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
    ////////////////////////////////////////////////////////
    newreview:newReviewReducer,
    adminreviews:getAdminReviewsReducer,
    productreviews:getProductReviewReducer,
    deleteproductreview:deleteProductReviewReducer,
    deleteadminproductreview:deleteAdminProductReviewReducer,
    updateproductreview:updateProductReviewReducer,
    ///////////////////////////////////////////////////////////
    newevent:newEventReducer,
    delteevent:deleteEventReducer,
    limitedevents:getLimitedEventsReducer,
    events:getEventsReducer,
    event:getEventReducer,
    storeevents:getStoreEventsReducer,
    updateevent:updateEventReducer,
    adminevents:getAdminEventsReducer,
    deleteadminevent:deletrAdminEventReducer, 
    ///////////////////////////////////////////////////////////
    storename:getStoreNameReducer,
    cartList: cartReducer,
    filters: filtersReducer,
    Intl
});

export default rootReducer;