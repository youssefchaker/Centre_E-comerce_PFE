import {
    SUBSCRIBE_TO_NEWSLETTER_REQUEST,
    SUBSCRIBE_TO_NEWSLETTER_SUCCESS,
    SUBSCRIBE_TO_NEWSLETTER_FAIL,
    CLEAR_ERRORS
   
    
   } from "../constants/ActionTypes";



   export const newsLetterReducer = (state = { newsletter: {} }, action) => {
    switch (action.type) {

        case SUBSCRIBE_TO_NEWSLETTER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SUBSCRIBE_TO_NEWSLETTER_SUCCESS:
            return {
                loading: false,
                message: action.payload.message,
                newsletter: action.payload.response
            }

        case SUBSCRIBE_TO_NEWSLETTER_FAIL:
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
   