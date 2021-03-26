import axios from 'axios'
import {toast} from 'react-toastify'
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
    CLEAR_ERRORS } from '../constants/productConstants'

export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`http://localhost:5000/api/mall/store/product/new`, productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getStoreProducts = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_STORE_PRODUCTS_REQUEST })

        const { data } = await axios.get(`http://localhost:5000/api/mall/store/products/${id}`)

        dispatch({
            type: GET_STORE_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_STORE_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getStoreProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_STORE_PRODUCT_REQUEST })

        const { data } = await axios.get(`http://localhost:5000/api/mall/product/${id}`)

        dispatch({
            type: GET_STORE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_STORE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getSearchedProducts = () => async (dispatch) => {
    try {

        dispatch({ type: SEARCH_PRODUCT_REQUEST })

        const { data } = await axios.get(`http://localhost:5000/api/mall/products/search`)

        dispatch({
            type: SEARCH_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SEARCH_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getTopProducts = () => async (dispatch) => {
    try {

        dispatch({ type: TOP_PRODUCTS_REQUEST })

        const { data } = await axios.get(`http://localhost:5000/api/mall/products/top`)

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
        

        const { data } = await axios.get(`http://localhost:5000/api/mall/products/new`)

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
        let link = `http://localhost:5000/api/mall/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) {
            link = `http://localhost:5000/api/mall/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }
*/

        const { data } = await axios.get(`http://localhost:5000/api/mall/products`)

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

export const updateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`http://localhost:5000/api/mall/store/product/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`http://localhost:5000/api/mall/store/product/${id}`)

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

        const { data } = await axios.get("api/mall/admin/products")

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

        const { data } = await axios.get(`api/mall/reviews/${id}`)

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

        const { data } = await axios.get(`api/mall/admin/reviews`)

        dispatch({
            type: GET_ADMIN_REVIEWS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: GET_ADMIN_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteReview = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/mall/reviews/${id}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteAdminReview = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ADMIN_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/mall/admin/reviews/${id}`)

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

export const updateReview = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/mall/product/updatereview/${id}`, productData, config)

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

        const { data } = await axios.get(`http://localhost:5000/api/mall/storename/${id}`)

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
