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
    DELETE_PRODUCT_RESET,
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
    DELETE_ADMIN_REVIEW_REQUEST,
    DELETE_ADMIN_REVIEW_SUCCESS,
    DELETE_ADMIN_REVIEW_FAIL,
    DELETE_ADMIN_REVIEW_RESET,
    UPDATE_REVIEW_REQUEST,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAIL,
    GET_STORE_NAME_REQUEST,
    GET_STORE_NAME_SUCCESS,
    GET_STORE_NAME_FAIL,
    CLEAR_ERRORS,
    CHANGE_CURRENCY,
    UPDATE_PRODUCT_DETAIL_REQUEST,
    UPDATE_PRODUCT_DETAIL_SUCCESS,
    UPDATE_PRODUCT_DETAIL_FAIL,
    GET_PRODUCTS_BY_CATEGORY_REQUEST,
    GET_PRODUCTS_BY_CATEGORY_SUCCESS,
    GET_PRODUCTS_BY_CATEGORY_FAIL,
    NEW_PRODUCT_RESET,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_DETAIL_RESET,
    NEW_REVIEW_RESET,
    UPDATE_REVIEW_RESET,
    DELETE_REVIEW_RESET
    
} from "../constants/productConstants";

export const newProductReducer = (state = { newproduct: {} }, action) => {
    switch (action.type) {

        case NEW_PRODUCT_REQUEST:
                  
            return {
                ...state,
                loading: true
            }

        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
            }
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
                }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case NEW_PRODUCT_RESET:
            return{
                ...state,
                loading:false,
                success:false
            }
        default:
            return state
    }
}

export const getStoreProductsReducer = (state = { storeproducts: {} }, action) => {
    switch (action.type) {

        case GET_STORE_PRODUCTS_REQUEST:           
            return {
                ...state,
                loading: true
            }
        case GET_STORE_PRODUCTS_SUCCESS:
            return{
                loading: false,
                products: action.payload,
            }
        case GET_STORE_PRODUCTS_FAIL:
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

export const getProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {

        case GET_STORE_PRODUCT_REQUEST:         
            return {
                ...state,
                loading: true
            }
        case GET_STORE_PRODUCT_SUCCESS:
            return{
                loading: false,
                product: action.payload,
            }
        case GET_STORE_PRODUCT_FAIL:
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

export const searchProductsReducer = (state = { searchedproducts: {} }, action) => {
    switch (action.type) {

        case SEARCH_PRODUCT_REQUEST:         
            return {
                ...state,
                loading: true
            }
        case SEARCH_PRODUCT_SUCCESS:
            return{
                loading:false,
                products:action.payload
            }
        case SEARCH_PRODUCT_FAIL:
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

export const topProductsReducer = (state = { topproducts: {} }, action) => {
    switch (action.type) {

        case TOP_PRODUCTS_REQUEST:         
            return {
                ...state,
                loading: true
            }

        case TOP_PRODUCTS_SUCCESS:
            return{
                loading:false,
                products:action.payload
            }    
        case TOP_PRODUCTS_FAIL:
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

export const getNewProductsReducer = (state = { newproducts: {} }, action) => {
    switch (action.type) {

        case NEW_PRODUCTS_REQUEST:         
            return {
                ...state,
                loading: true
            }
        case NEW_PRODUCTS_SUCCESS :
            return{
                loading:false,
                products:action.payload
            }
        case NEW_PRODUCTS_FAIL:
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

export const getAllProductsReducer = (state = { allproducts: {} }, action) => {
    switch (action.type) {

        case GET_ALL_PRODUCTS_REQUEST:       
            return {
                ...state,
                loading: true
            }
        case GET_ALL_PRODUCTS_SUCCESS:
            return{
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount,
                storenames:action.payload.storenames
            }
        case GET_ALL_PRODUCTS_FAIL:
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

export const getProductsByCategoryReducer = (state = { productsByCategory: {} }, action) => {
    switch (action.type) {

        case GET_PRODUCTS_BY_CATEGORY_REQUEST:       
            return {
                ...state,
                loading: true
            }
        case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
            return{
                loading: false,
                productsByCategory: action.payload.products,
                productsCount: action.payload.productsCount,
                filteredProductsCount: action.payload.filteredProductsCount,
                storenames:action.payload.storenames
            }
        case GET_PRODUCTS_BY_CATEGORY_FAIL:
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



export const updateProductReducer = (state = { updateproduct: {} }, action) => {
    switch (action.type) {

        case UPDATE_PRODUCT_REQUEST:           
            return {
                ...state,
                loading: true
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
                }
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
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

export const updateProductDetailsReducer = (state = { updateproductdetail: {} }, action) => {
    switch (action.type) {

        case UPDATE_PRODUCT_DETAIL_REQUEST:           
            return {
                ...state,
                loading: true
            }
        case UPDATE_PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_PRODUCT_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload
                }
        case UPDATE_PRODUCT_DETAIL_RESET:
            return {
                ...state,
                loading: false,
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

export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_PRODUCT_REQUEST:           
            return {
                ...state,
                loading: true
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
            case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case DELETE_PRODUCT_FAIL:
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

export const deleteAdminProductReducer = (state = { }, action) => {
    switch (action.type) {

        case DELETE_ADMIN_PRODUCT_REQUEST:          
            return {
                ...state,
                loading: true
            }
        case DELETE_ADMIN_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_ADMIN_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
                }
                case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
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

export const getAdminProductsReducer = (state = { adminProducts: [] }, action) => {
    switch (action.type) {

        case GET_ADMIN_PRODUCTS_REQUEST:           
            return {
                ...state,
                loading: true
            }
        case GET_ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                adminProducts: action.payload
            }

        case GET_ADMIN_PRODUCTS_FAIL:
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

export const newReviewReducer = (state = { newreview: {} }, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:          
            return {
                ...state,
                loading: true
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
                }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
                loading:false
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

export const getAdminReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {

        case GET_ADMIN_REVIEWS_REQUEST:         
            return {
                ...state,
                loading: true
            }
        case GET_ADMIN_REVIEWS_SUCCESS:
            return{
                loading: false,
                reviews: action.payload
            }
        case GET_ADMIN_REVIEWS_FAIL:
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

export const getProductReviewReducer = (state = { productreviews: {} }, action) => {
    switch (action.type) {

        case GET_PRODUCT_REVIEWS_REQUEST:             
            return {
                ...state,
                loading: true
            }
        case GET_PRODUCT_REVIEWS_SUCCESS:
            return{
                loading: false,
                reviews: action.payload
            }
        case GET_PRODUCT_REVIEWS_FAIL:
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

export const deleteProductReviewReducer = (state = { deleteproductreview: {} }, action) => {
    switch (action.type) {
 
        case DELETE_REVIEW_REQUEST:     
            return {
                ...state,
                loading: true
            }
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
                }
        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted:false,
                loading:false
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

export const deleteAdminProductReviewReducer = (state = {}, action) => {
    switch (action.type) {
 
        case DELETE_ADMIN_REVIEW_REQUEST:     
            return {
                ...state,
                loading: true
            }
        case DELETE_ADMIN_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_ADMIN_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
                }
        case DELETE_ADMIN_REVIEW_RESET:
             return {
                ...state,
                isDeleted: false
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

export const updateProductReviewReducer = (state = { updateproductreview: {} }, action) => {
    switch (action.type) {

        case UPDATE_REVIEW_REQUEST:            
            return {
                ...state,
                loading: true
            }
        case UPDATE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
                }
        case UPDATE_REVIEW_RESET:
            return {
                ...state,
                isUpdated:false,
                loading:false
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

export const getStoreNameReducer = (state = { storename: {} }, action) => {
    switch (action.type) {

        case GET_STORE_NAME_REQUEST:           
            return {
                ...state,
                loading: true
            }
        case GET_STORE_NAME_SUCCESS:
            return{
                loading: false,
                storename: action.payload,
            }
        case GET_STORE_NAME_FAIL:
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

export const symbolReducer = (state = {symbol:"€"}, action) => {
    switch (action.type) {
        case CHANGE_CURRENCY:
            return { ...state,
                symbol: action.symbol };
        default:
            return state;
    }
};

export const currencyDiffReducer = (state = 3.3, action) => {
            return state;
};
