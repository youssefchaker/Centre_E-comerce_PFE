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
    currencyDiffReducer,
    updateProductDetailsReducer
} from './products';
import cartReducer from './cart';
import {
    filtersReducer
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
import {authReducer,userReducer,forgotPasswordReducer,contactFormulaireReducer} from './user';
import {storesReducer,storeDetailsReducer,newStoreReducer,userStoreDetailsReducer,storeReducer} from './store';
import {newsLetterReducer} from './newsLetter';




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
    updateproductdetail:updateProductDetailsReducer,
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
    filters: filtersReducer,
    symbol:symbolReducer,
    currencydiff:currencyDiffReducer,
    stores: storesReducer,
    storeDetails: storeDetailsReducer,
    userStore: userStoreDetailsReducer,
    newStore: newStoreReducer,
    store: storeReducer,
    auth:authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    contact: contactFormulaireReducer,
    newsLetter:newsLetterReducer,
    Intl
});

export default rootReducer;