import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREMENT_QTY,
    DECREMENT_QTY } from "../constants/cartConstants";


export default function cartReducer(state = {
    cart: []
}, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const productId = action.product._id
            if (state.cart.findIndex(product => product._id === productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product._id === productId) {
                        cartAcc.push({ ...product, qty: product.qty+1, sum: (product.price)/* *product.discount/100) */*(product.qty+1) }) // Increment qty
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            }

            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: (action.product.price*action.product.discount/100)*action.qty }] }

        case DECREMENT_QTY:
            
            if (state.cart.findIndex(product => product._id === action.productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product._id === action.productId && product.qty > 1) {
                        //console.log('price: '+product.price+'Qty: '+product.qty)
                        cartAcc.push({ ...product, qty: product.qty-1, sum: (product.price*product.discount/100)*(product.qty-1) }) // Decrement qty
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            }

            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: action.product.price*action.qty }] }

        case REMOVE_FROM_CART:
            return {
                cart: state.cart.filter(item => item._id !== action.product_id._id)
            }

        default:
    }
    return state;
}