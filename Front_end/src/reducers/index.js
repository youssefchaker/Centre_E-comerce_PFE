import { combineReducers } from 'redux';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'

// Import custom components
import productReducer from './products';
import cartReducer from './cart';
import filtersReducer from './filters';
import {authReducer,userReducer,forgotPasswordReducer,contactFormulaireReducer} from './user';
import {storesReducer,storeDetailsReducer,newStoreReducer,userStoreDetailsReducer,storeReducer} from './store';
import {newsLetterReducer} from './newsLetter';




const rootReducer = combineReducers({
    data: productReducer,
    stores: storesReducer,
    storeDetails: storeDetailsReducer,
    userStore: userStoreDetailsReducer,
    newStore: newStoreReducer,
    store: storeReducer,
    cartList: cartReducer,
    filters: filtersReducer,
    auth:authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    contact: contactFormulaireReducer,
    newsLetter:newsLetterReducer,
    Intl
});

export default rootReducer;