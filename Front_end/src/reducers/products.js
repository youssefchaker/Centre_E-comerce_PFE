import {NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    GET_STORE_PRODUCTS_REQUEST,
    GET_STORE_PRODUCTS_SUCCESS,
    GET_STORE_PRODUCTS_FAIL,
    GET_STORE_PRODUCT_REQUEST,
    GET_STORE_PRODUCT_SUCCESS,
    GET_STORE_PRODUCT_FAIL,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_FAIL,
    TOP_PRODUCTS_REQUEST,
    TOP_PRODUCTS_SUCCESS,
    TOP_PRODUCTS_FAIL,
    NEW_PRODUCTS_REQUEST,
    NEW_PRODUCTS_SUCCESS,
    NEW_PRODUCTS_FAIL,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_ADMIN_PRODUCT_REQUEST,
    DELETE_ADMIN_PRODUCT_SUCCESS,
    DELETE_ADMIN_PRODUCT_FAIL,
    GET_ADMIN_PRODUCTS_REQUEST,
    GET_ADMIN_PRODUCTS_SUCCESS,
    GET_ADMIN_PRODUCTS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    GET_ADMIN_REVIEWS_REQUEST,
    GET_ADMIN_REVIEWS_SUCCESS,
    GET_ADMIN_REVIEWS_FAIL,
    GET_PRODUCT_REVIEWS_REQUEST,
    GET_PRODUCT_REVIEWS_SUCCESS,
    GET_PRODUCT_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    UPDATE_REVIEW_REQUEST,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAIL,
    CLEAR_ERRORS } from "../constants/productConstants";

export const productReducer = (state = { product: {} }, action) => {
    switch (action.type) {

        case NEW_PRODUCT_REQUEST:
        case GET_STORE_PRODUCTS_REQUEST:
        case GET_STORE_PRODUCT_REQUEST:
        case SEARCH_PRODUCT_REQUEST:
        case TOP_PRODUCTS_REQUEST:
        case NEW_PRODUCTS_REQUEST:
        case GET_ALL_PRODUCTS_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
        case DELETE_ADMIN_PRODUCT_REQUEST:
        case GET_ADMIN_PRODUCTS_REQUEST:
        case NEW_REVIEW_REQUEST:
        case GET_ADMIN_REVIEWS_REQUEST:
        case GET_PRODUCT_REVIEWS_REQUEST:   
        case DELETE_REVIEW_REQUEST:
        case UPDATE_REVIEW_REQUEST:            
            return {
                ...state,
                loading: true
            }

        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }

        case GET_STORE_PRODUCTS_SUCCESS:
            return{
                loading: false,
                products: action.payload.products,
            }
        case GET_STORE_PRODUCT_SUCCESS:
            return{
                loading: false,
                product: action.payload.product,
            }
        case SEARCH_PRODUCT_SUCCESS:
            return{
                loading:false,
                products:action.payload.products
            }
        case TOP_PRODUCTS_SUCCESS:
            return{
                loading:false,
                products:action.payload.products
            }
        case NEW_PRODUCTS_SUCCESS :
            return{
                loading:false,
                products:action.payload.products
            }
        case GET_ALL_PRODUCTS_SUCCESS:
            return{
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_ADMIN_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case GET_ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case GET_ADMIN_REVIEWS_SUCCESS:
            return{
                loading: false,
                reviews: action.payload
            }
        case GET_PRODUCT_REVIEWS_SUCCESS:
            return{
                loading: false,
                reviews: action.payload
            }
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case NEW_PRODUCT_FAIL:
        case GET_STORE_PRODUCTS_FAIL:
        case GET_STORE_PRODUCT_FAIL:
        case SEARCH_PRODUCT_FAIL:
        case TOP_PRODUCTS_FAIL:
        case NEW_PRODUCTS_FAIL:
        case GET_ALL_PRODUCTS_FAIL:
        case UPDATE_PRODUCT_FAIL:
        case DELETE_PRODUCT_FAIL:
        case DELETE_ADMIN_PRODUCT_FAIL:
        case GET_ADMIN_PRODUCTS_FAIL:
        case NEW_REVIEW_FAIL:
        case GET_ADMIN_REVIEWS_FAIL:
        case GET_PRODUCT_REVIEWS_FAIL:
        case DELETE_REVIEW_FAIL:
        case UPDATE_REVIEW_FAIL:
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

export default productReducer;