import shop from '../api/shop'
import store from "../store";
import * as types from '../constants/ActionTypes'
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    CONTACT_FORMULAIRE_REQUEST,
    CONTACT_FORMULAIRE_SUCCESS,
    CONTACT_FORMULAIRE_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS,
    CLEAR_RESPONSE
} from '../constants/ActionTypes'

//Stores

export const getStores = (/*keyword = '', currentPage = 1, price, category*/) => async (dispatch) => {
    try {

        dispatch({ type: types.ALL_STORES_REQUEST })

        //let link = `/api/mall/stores?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`

        //if (category) {
            //link = `/api/mall/stores?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
        //}

        const { data } = await axios.get('/api/mall/stores')

        dispatch({
            type: types.ALL_STORES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: types.ALL_STORES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getStoreDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: types.STORE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/mall/store/${id}`)

        dispatch({
            type: types.STORE_DETAILS_SUCCESS,
            payload: data.store
        })

    } catch (error) {
        dispatch({
            type: types.STORE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getUserStoreDetails = () => async (dispatch) => {
    try {

        dispatch({ type: types.MY_STORE_REQUEST })

        const { data } = await axios.get(`/api/mall/mystore`)

        dispatch({
            type: types.MY_STORE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: types.MY_STORE_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newStore = (storeData) => async (dispatch) => {
    try {

        dispatch({ type: types.NEW_STORE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/mall/store/new`, storeData, config)

        dispatch({
            type: types.NEW_STORE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: types.NEW_STORE_FAIL,
            payload: error.response.data.message
        })
    }
}

// User Update store 
export const updateStore = (id, storeData) => async (dispatch) => {
    try {

        dispatch({ type: types.UPDATE_STORE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/mall/user/store/${id}`, storeData, config)

        dispatch({
            type: types.UPDATE_STORE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: types.UPDATE_STORE_FAIL,
            payload: error.response.data.message
        })
    }
}

















//User

// Login
export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/mall/login', { email, password }, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        //const errorMessage = "login invalid";
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Register user
export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/mall/register', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Load user
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/mall/myprofile')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        });
        dispatch({
            type: CLEAR_ERRORS
        })
    }
}

// Update profile
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put('/api/mall/myprofile/update', userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update password
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/mall/password/update', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/mall/password/forgot', email, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/mall/password/reset/${token}`, passwords, config)

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}



// Contact Formulaire
export const contactFormulaire = (contactData) => async (dispatch) => {
    try {

        dispatch({ type: CONTACT_FORMULAIRE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/mall/contact', contactData, config)

        dispatch({
            type: CONTACT_FORMULAIRE_SUCCESS,
            payload: data.message
        });
        dispatch({
            type: CLEAR_RESPONSE
        })

    } catch (error) {
        dispatch({
            type: CONTACT_FORMULAIRE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {

        await axios.get('/api/mall/logout')

        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Admin Get all users
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/mall/admin/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update user - ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/mall/admin/user/${id}`, userData, config)

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })


        const { data } = await axios.get(`/api/mall/admin/user/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/api/mall/admin/user/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}


// Clear contact formulaire response
export const clearResponse = () => async (dispatch) => {
    dispatch({
        type: CLEAR_RESPONSE
    })
}



















// "Cart"
export const addToCart = (product,qty) => (dispatch) => {
    toast.success("Product Added to Cart!!");
        dispatch(addToCartUnsafe(product, qty))

}
export const addToCartAndRemoveWishlist = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty));
}
export const addToCartUnsafe = (product, qty) => ({
    type: types.ADD_TO_CART,
    product,
    qty
});
export const removeFromCart = product_id => (dispatch) => {
    toast.error("Product Removed from Cart!!");
    dispatch({
        type: types.REMOVE_FROM_CART,
        product_id
    })
};
export const incrementQty = (product,qty) => (dispatch) => {
    toast.success("Product Added to Cart!!");
    dispatch(addToCartUnsafe(product, qty))

}
export const decrementQty = productId => (dispatch) => {
    toast.warn("Item Decrement Qty to Cart");

    dispatch({
    type: types.DECREMENT_QTY,
    productId})
};



// Filters
export const filterCategory = (category) => ({
    type: types.FILTER_CATEGORY,
    category
});
export const filterStore = (store) => ({
    type: types.FILTER_STORE,
    store
});
export const filterPrice = (value) => ({
    type: types.FILTER_PRICE,
    value
});
export const filterPriceDT = (valueDT) => ({
    type: types.FILTER_PRICE_DT,
    valueDT
});
export const filterSort = (sort_by) => ({
    
    type: types.SORT_BY,
    sort_by
});

export const filterSortStore = (sort_by_store) => ({
    
    type: types.SORT_BY_STORE,
    sort_by_store
});

export const emptyFilter=(min,minDT)=>({
    type:types.EMPTY_FILTER,
    min,
    minDT
})
export const filterPriceStore = (valuestore) => ({
    type: types.FILTER_PRICE_STORE,
    valuestore
});
export const filterPriceDTStore = (valueDTstore) => ({
    type: types.FILTER_PRICE_DT_STORE,
    valueDTstore
});
export const emptyFilterStore=(minstore,minDTstore)=>({
    type:types.EMPTY_FILTER_STORE,
    minstore,
    minDTstore
})

// Currency
export const changeCurrency = (symbol) => ({
    type: types.CHANGE_CURRENCY,
    symbol
});



//News Letter

// User subscribe to the Newsletter
export const subscribeToNewsLetter = (userData) => async (dispatch) => {
    try {

        dispatch({ type: types.SUBSCRIBE_TO_NEWSLETTER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/mall/newsletter/subscribe`, userData, config)

        dispatch({
            type: types.SUBSCRIBE_TO_NEWSLETTER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: types.SUBSCRIBE_TO_NEWSLETTER_FAIL,
            payload: error.response.data.message
        })
    }
}
