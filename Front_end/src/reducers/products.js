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
    DELETE_ADMIN_REVIEW_REQUEST,
    DELETE_ADMIN_REVIEW_SUCCESS,
    DELETE_ADMIN_REVIEW_FAIL,
    UPDATE_REVIEW_REQUEST,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAIL,
    GET_STORE_NAME_REQUEST,
    GET_STORE_NAME_SUCCESS,
    GET_STORE_NAME_FAIL,
    CLEAR_ERRORS,
    FETCH_PRODUCTS_BEGIN,
    RECEIVE_PRODUCTS,
    FETCH_SINGLE_PRODUCT,
    CHANGE_CURRENCY


} from "../constants/productConstants";

/* export const productReducer = (state = { products: {} }, action) => {
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
} */

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
                product: action.payload
            }
        case NEW_PRODUCT_FAIL:
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
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const deleteProductReducer = (state = { deleteproduct: {} }, action) => {
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

export const deleteAdminProductReducer = (state = { deleteadminproduct: {} }, action) => {
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
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const getAdminProductsReducer = (state = { adminproducts: {} }, action) => {
    switch (action.type) {

        case GET_ADMIN_PRODUCTS_REQUEST:           
            return {
                ...state,
                loading: true
            }
        case GET_ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
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
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const getAdminReviewsReducer = (state = { adminreviews: {} }, action) => {
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
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const deleteAdminProductReviewReducer = (state = { deleteadminproductreview: {} }, action) => {
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

//zeydin
const initialState = {
    products: [],
    symbol: '$',
    product_details: []
};
export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            return { ...state,
                products: action.products };
        case FETCH_SINGLE_PRODUCT:
            if (state.products.findIndex(product => product.id === action.productId) !== -1) {
                const singleItem = state.products.reduce((itemAcc, product) => {
                    return product
                }, [])
                return { ...state,
                    product_details: singleItem };
            }

        case CHANGE_CURRENCY:
            return { ...state,
                symbol: action.symbol };
        default:
            return state;
    }
};