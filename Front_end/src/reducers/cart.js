import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREMENT_QTY,
    CLEAR_RESPONSE,
    DECREMENT_QTY,
    SAVE_SHIPPING_INFO } from "../constants/cartConstants";
    import {toast} from 'react-toastify'


export default function cartReducer(state = {
    cart: [], shippingInfo: {}
}, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const productId = action.product._id
            if (state.cart.findIndex(product => product._id === productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product._id === productId) {
                        cartAcc.push({ ...product, qty: product.qty+1, sum: (product.price *product.discount/100) *(product.qty+1) }) // Increment qty
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
                        if(product.qty!=1){
                        cartAcc.push({ ...product, qty: product.qty-1, sum:(product.price*product.discount/100)*(product.qty-1) })} // Decrement qty
                        toast.warn("Item Decrement Qty to Cart");
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            }

            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: action.product.price-(action.product.price*action.product.discount/100)*action.qty }] }

        case REMOVE_FROM_CART:
            return {
                cart: state.cart.filter(item => item._id !== action.product_id._id)
            }
            case CLEAR_RESPONSE:
            return {

                cart: []
            }

            case SAVE_SHIPPING_INFO:
                return {
                    ...state,
                    shippingInfo: action.payload
                }

        default:
            return state;

    }
}
