import { combineReducers } from 'redux';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'

// custom Product Reducers
import { newProductReducer,
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
    updateProductDetailsReducer,
    getProductsByCategoryReducer
   } from './products';

// Cart Reducers
import cartReducer from './cart';

// Filters Reducers
import {filtersReducer} from './filters';


// Event Reducers
import {
    newEventReducer,
    deleteEventReducer,
    getLimitedEventsReducer,
    getEventsReducer,
    getEventReducer,
    getStoreEventsReducer,
    updateEventReducer,
    getAdminEventsReducer,
    deleteAdminEventReducer 
    }   from './events';

// User Reducers
import {authReducer,userReducer,forgotPasswordReducer,contactFormulaireReducer, allUsersReducer, userDetailsReducer, userAccountReducer} from './user';


// store Reducers
import {storesReducer,storeDetailsReducer,newStoreReducer,userStoreDetailsReducer,storeReducer} from './store';

// Newsletter Reducer
import {newsLetterReducer} from './newsLetter';

// Order Reducers
import {newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer} from './order';




const rootReducer = combineReducers({

    newproduct: newProductReducer,
    storeproducts:getStoreProductsReducer,
    product:getProductReducer,
    searchedproducts:searchProductsReducer,
    topproducts:topProductsReducer,
    newproducts:getNewProductsReducer,
    allproducts:getAllProductsReducer,
    productsByCategory:getProductsByCategoryReducer,
    updateproduct:updateProductReducer,
    deleteproduct:deleteProductReducer,
    deleteAdminProduct:deleteAdminProductReducer,
    adminproducts:getAdminProductsReducer,
    updateproductdetail:updateProductDetailsReducer,
    ////////////////////////////////////////////////////////
    newreview:newReviewReducer,
    adminReviews:getAdminReviewsReducer,
    productreviews:getProductReviewReducer,
    deleteproductreview:deleteProductReviewReducer,
    review:deleteAdminProductReviewReducer,
    updateproductreview:updateProductReviewReducer,
    ///////////////////////////////////////////////////////////
    newevent:newEventReducer,
    delteevent:deleteEventReducer,
    limitedevents:getLimitedEventsReducer,
    events:getEventsReducer,
    event:getEventReducer,
    storeevents:getStoreEventsReducer,
    updateevent:updateEventReducer,
    adminEvents:getAdminEventsReducer,
    deleteAdminEvent:deleteAdminEventReducer, 
    ///////////////////////////////////////////////////////////
    cartList: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    filters: filtersReducer,
    symbol: symbolReducer,
    currencydiff: currencyDiffReducer,
    stores: storesReducer,
    storeDetails: storeDetailsReducer,
    userStore: userStoreDetailsReducer,
    newStore: newStoreReducer,
    store: storeReducer,
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails:userDetailsReducer,
    userAccount:userAccountReducer,
    forgotPassword: forgotPasswordReducer,
    contact: contactFormulaireReducer,
    newsLetter:newsLetterReducer,
    Intl
});

export default rootReducer;