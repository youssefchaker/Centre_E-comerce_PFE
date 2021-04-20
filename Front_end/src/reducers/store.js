import {
 ADMIN_STORES_REQUEST,
 ADMIN_STORES_SUCCESS,
 ADMIN_STORES_FAIL,

 ALL_STORES_REQUEST, 
 ALL_STORES_SUCCESS,
 ALL_STORES_FAIL,

 NEW_STORE_REQUEST, 
 NEW_STORE_SUCCESS,
 NEW_STORE_RESET,
 NEW_STORE_FAIL, 

 DELETE_STORE_REQUEST,
 DELETE_STORE_SUCCESS, 
 DELETE_STORE_RESET,
 DELETE_STORE_FAIL,

 UPDATE_STORE_REQUEST, 
 UPDATE_STORE_SUCCESS, 
 UPDATE_STORE_RESET, 
 UPDATE_STORE_FAIL,

 STORE_DETAILS_REQUEST, 
 STORE_DETAILS_SUCCESS,
 STORE_DETAILS_FAIL,

 MY_STORE_REQUEST, 
 MY_STORE_SUCCESS,
 MY_STORE_FAIL,
 CLEAR_ERRORS
} from "../constants/ActionTypes";



 export const storesReducer = (state = { stores: [] }, action) => {
    switch (action.type) {
        case ALL_STORES_REQUEST:
        case ADMIN_STORES_REQUEST:
            return {
                loading: true,
                stores: []
            }

        case ALL_STORES_SUCCESS:
            return {
                loading: false,
                stores: action.payload.stores,
                storesCount: action.payload.storesCount,
                resPerPage: action.payload.resPerPage,
                
            }

        case ADMIN_STORES_SUCCESS:
            return {
                loading: false,
                stores: action.payload
            }

        case ALL_STORES_FAIL:
        case ADMIN_STORES_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newStoreReducer = (state = { store: {} }, action) => {
    switch (action.type) {

        case NEW_STORE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_STORE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                store: action.payload.store
            }

        case NEW_STORE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_STORE_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const storeReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_STORE_REQUEST:
        case UPDATE_STORE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_STORE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_STORE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_STORE_FAIL:
        case UPDATE_STORE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_STORE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_STORE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const storeDetailsReducer = (state = { store: {} }, action) => {
    switch (action.type) {

        case STORE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case STORE_DETAILS_SUCCESS:
            return {
                loading: false,
                store: action.payload
            }

        case STORE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const userStoreDetailsReducer = (state = { store: {} }, action) => {
    switch (action.type) {

        case MY_STORE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case MY_STORE_SUCCESS:
            return {
                loading: false,
                store: action.payload.store
            }

        case MY_STORE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}