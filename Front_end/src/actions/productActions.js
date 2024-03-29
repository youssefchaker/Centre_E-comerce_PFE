import axios from 'axios'
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
    GET_PRODUCTS_BY_CATEGORY_FAIL } from '../constants/productConstants'

export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/mall/store/product/new`, productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error
        })
    }
}

export const getStoreProducts = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_STORE_PRODUCTS_REQUEST })

        const { data } = await axios.get(`/api/mall/store/products/${id}`)

        dispatch({
            type: GET_STORE_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_STORE_PRODUCTS_FAIL,
            payload: error
        })
    }
}

export const getStoreProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_STORE_PRODUCT_REQUEST })

        const { data } = await axios.get(`/api/mall/product/${id}`)

        dispatch({
            type: GET_STORE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_STORE_PRODUCT_FAIL,
            payload: error
        })
    }
}

export const getSearchedProducts = (keyword) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_PRODUCT_REQUEST })
        const { data } = await axios.get(`/api/mall/products/search/${keyword}`)

        dispatch({
            type: SEARCH_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SEARCH_PRODUCT_FAIL,
            payload: error
        })
    }
}

export const getTopProducts = () => async (dispatch) => {
    try {

        dispatch({ type: TOP_PRODUCTS_REQUEST })

        const { data } = await axios.get(`/api/mall/products/top`)

        dispatch({
            type: TOP_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TOP_PRODUCTS_FAIL,
            payload: error
        })
    }
}

export const getNewProducts = () => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCTS_REQUEST })
        

        const { data } = await axios.get(`/api/mall/products/new`)

        dispatch({
            type: NEW_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCTS_FAIL,
            payload: error
        })
    }
}

export const getProducts = () => async (dispatch) => {
    try {

        dispatch({ type: GET_ALL_PRODUCTS_REQUEST })
/*
        let link = `/api/mall/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) {
            link = `/api/mall/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }
*/

        const { data } = await axios.get(`/api/mall/products`)

        dispatch({
            type: GET_ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_ALL_PRODUCTS_FAIL,
            payload: error
        })
    }
}

export const getProductsByCategory = (category) => async (dispatch) => {
    try {

        dispatch({ type: GET_PRODUCTS_BY_CATEGORY_REQUEST })

        let link = `/api/mall/products`

        if (category) {
            link = `/api/mall/products?category=${category}`
        }


        const { data } = await axios.get(link)

        dispatch({
            type: GET_PRODUCTS_BY_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_BY_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/mall/store/product/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error
        })
    }
}

export const updateProductDetails = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_DETAIL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/mall/store/productdetail/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_DETAIL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_DETAIL_FAIL,
            payload: error
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`/api/mall/store/product/${id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteAdminProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ADMIN_PRODUCT_REQUEST })

        const { data } = await axios.delete(`/api/mall/store/product/${id}`)

        dispatch({
            type: DELETE_ADMIN_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({ type: GET_ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get("/api/mall/admin/products")

        dispatch({
            type: GET_ADMIN_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (id,reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/mall/review/${id}`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_PRODUCT_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/mall/reviews/${id}`)

        dispatch({
            type: GET_PRODUCT_REVIEWS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: GET_PRODUCT_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminReviews = () => async (dispatch) => {
    try {

        dispatch({ type: GET_ADMIN_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/mall/admin/reviews`)

        dispatch({
            type: GET_ADMIN_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: GET_ADMIN_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteReview = (reviewid,productid) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/mall/reviews/${reviewid}/${productid}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error
        })
    }
}

export const deleteAdminReview = (reviewid,productid) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ADMIN_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/mall/admin/reviews/${reviewid}/${productid}`)

        dispatch({
            type: DELETE_ADMIN_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ADMIN_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateReview = (id, reviewData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/mall/product/updatereview/${id}`, reviewData, config)

        dispatch({
            type: UPDATE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getStoreName = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_STORE_NAME_REQUEST })

        const { data } = await axios.get(`/api/mall/storename/${id}`)

        dispatch({
            type: GET_STORE_NAME_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_STORE_NAME_FAIL,
            payload: error
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

// Currency
export const changeCurrency = (symbol) =>async (dispatch)=> {
    dispatch({
        type: CHANGE_CURRENCY,
        symbol
    })
};



