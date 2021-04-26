import {toast} from 'react-toastify'
import * as types from '../constants/cartConstants'
//it seems that I should probably use this as the basis for "Cart"
export const addToCart = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
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
    toast.error("Item Removed from Cart");
    dispatch({
        type: types.REMOVE_FROM_CART,
        product_id
    })
};
export const incrementQty = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty))

}
export const decrementQty = productId => (dispatch) => {


    dispatch({
    type: types.DECREMENT_QTY,
    productId})
};


export const clearResponse = ()  => (dispatch) => {


    dispatch({
    type: types.CLEAR_RESPONSE
    })
};





/* import axios from 'axios'
import shop from '../api/shop'
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO,DECREMENT_QTY } from '../constants/cartConstants'
import { toast  } from 'react-toastify';
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/mall/product/${id}`)
    toast.success("Item Added to Cart");
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (item) => async (dispatch, getState) => {
    console.log(item)
    toast.error("Item Removed from Cart");
    dispatch({
        type: REMOVE_ITEM_CART,
        payload: item
    })

    localStorage.setItem('cartItems', JSON.stringify(getState()))

}

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}
export const incrementQty = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty))

}
export const decrementQty = productId => (dispatch) => {
    toast.warn("Item Decrement Qty to Cart");

    dispatch({
    type: DECREMENT_QTY,
    productId})
};
export const addToCartUnsafe = (product, qty) => ({
    type: ADD_TO_CART,
    product,
    qty
}); */