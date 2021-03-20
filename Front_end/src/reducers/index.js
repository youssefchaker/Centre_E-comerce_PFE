import { combineReducers } from 'redux';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'

// Import custom components
import productReducer from './products';
import cartReducer from './cart';
import filtersReducer from './filters';
import eventReducer from './events';


const rootReducer = combineReducers({
    products: productReducer,
    cartList: cartReducer,
    filters: filtersReducer,
    events:eventReducer,
    Intl
});

export default rootReducer;