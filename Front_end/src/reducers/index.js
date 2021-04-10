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
    symbolReducer,
    currencyDiffReducer
} from './products';
import cartReducer from './cart';
import {
    categoryFiltersReducer,
    storeFiltersReducer,
    priceFiltersReducer,
    sortbyFiltersReducer
} from './filters';
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
    cartList: cartReducer,
    category:categoryFiltersReducer,
    store:storeFiltersReducer,
    price:priceFiltersReducer,
    sortby:sortbyFiltersReducer,
    symbol:symbolReducer,
    currencydiff:currencyDiffReducer,
    Intl
});

export default rootReducer;