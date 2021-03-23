import {NEW_EVENT_REQUEST,
    NEW_EVENT_SUCCESS,
    NEW_EVENT_FAIL,
    DELETE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAIL,
    GET_LIMITED_EVENT_REQUEST,
    GET_LIMITED_EVENT_SUCCESS,
    GET_LIMITED_EVENT_FAIL,
    GET_EVENTS_REQUEST,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAIL,
    GET_EVENT_REQUEST,
    GET_EVENT_SUCCESS,
    GET_EVENT_FAIL,
    GET_STORE_EVENTS_REQUEST,
    GET_STORE_EVENTS_SUCCESS,
    GET_STORE_EVENTS_FAIL,
    UPDATE_EVENT_REQUEST,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAIL,
    GET_ADMIN_EVENTS_REQUEST,
    GET_ADMIN_EVENTS_SUCCESS,
    GET_ADMIN_EVENTS_FAIL,
    DELETE_ADMIN_EVENT_REQUEST,
    DELETE_ADMIN_EVENT_SUCCESS,
    DELETE_ADMIN_EVENT_FAIL,
    CLEAR_ERRORS } from '../constants/eventConstants'

    export const eventReducer = (state = { events: {} }, action) => {
        switch (action.type) {
    
            case NEW_EVENT_REQUEST:
            case DELETE_EVENT_REQUEST:
            case GET_LIMITED_EVENT_REQUEST:
            case GET_EVENTS_REQUEST:
            case GET_EVENT_REQUEST:
            case GET_STORE_EVENTS_REQUEST:
            case UPDATE_EVENT_REQUEST:
            case GET_ADMIN_EVENTS_REQUEST:
            case DELETE_ADMIN_EVENT_REQUEST:            
                return {
                    ...state,
                    loading: true
                }
    
            case NEW_EVENT_SUCCESS:
                return {
                    loading: false,
                    success: action.payload.success,
                    event: action.payload.event
                }
            case DELETE_EVENT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isDeleted: action.payload
                }
    
            case GET_LIMITED_EVENT_SUCCESS:
                return{
                    loading: false,
                    events: action.payload.events,
                }
            case GET_EVENTS_SUCCESS:
                return{
                    loading: false,
                    events: action.payload.events,
                }
            case GET_EVENT_SUCCESS:
                return{
                    loading: false,
                    event: action.payload.event,
                }
            case GET_STORE_EVENTS_SUCCESS:
                return {
                    loading: false,
                    events: action.payload
                }
            case UPDATE_EVENT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isUpdated: action.payload
                }
            case GET_ADMIN_EVENTS_SUCCESS:
                return{
                    loading: false,
                    events: action.payload
                }
            case DELETE_ADMIN_EVENT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isDeleted: action.payload
                }
            case NEW_EVENT_FAIL:
            case DELETE_EVENT_FAIL:
            case GET_LIMITED_EVENT_FAIL:
            case GET_EVENTS_FAIL:
            case GET_EVENT_FAIL:
            case GET_STORE_EVENTS_FAIL:
            case UPDATE_EVENT_FAIL:
            case GET_ADMIN_EVENTS_FAIL:
            case DELETE_ADMIN_EVENT_FAIL: 
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
    
    export default eventReducer;