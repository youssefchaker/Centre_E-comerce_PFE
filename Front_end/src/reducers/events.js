import {NEW_EVENT_REQUEST,
    NEW_EVENT_SUCCESS,
    NEW_EVENT_FAIL,
    NEW_EVENT_RESET,
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
    DELETE_ADMIN_EVENT_RESET,
    CLEAR_ERRORS,
    UPDATE_EVENT_RESET,
    DELETE_EVENT_RESET } from '../constants/eventConstants'
    
    export const newEventReducer = (state = { newevent: {} }, action) => {
        switch (action.type) {
    
            case NEW_EVENT_REQUEST:           
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
            case NEW_EVENT_FAIL: 
                return {
                    ...state,
                    error: action.payload
                    }

             case NEW_EVENT_RESET:
                return {
                ...state,
                success: false
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

    export const deleteEventReducer = (state = { deleteevent: {} }, action) => {
        switch (action.type) {
    
            case DELETE_EVENT_REQUEST:            
                return {
                    ...state,
                    loading: true
                }
    
            case DELETE_EVENT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isDeleted: action.payload
                }
            case DELETE_EVENT_FAIL:
                return {
                    ...state,
                    error: action.payload
                    }
            case DELETE_EVENT_RESET:
                return {
                    ...state,
                    isDeleted:false
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

    export const getLimitedEventsReducer = (state = { limitedevents: {} }, action) => {
        switch (action.type) {
    
            case GET_LIMITED_EVENT_REQUEST:           
                return {
                    ...state,
                    loading: true
                }
    
            case GET_LIMITED_EVENT_SUCCESS:
                return{
                    loading: false,
                    events: action.payload,
                }
            case GET_LIMITED_EVENT_FAIL:
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

    export const getEventsReducer = (state = { events: {} }, action) => {
        switch (action.type) {
    
            case GET_EVENTS_REQUEST:            
                return {
                    ...state,
                    loading: true
                }
            case GET_EVENTS_SUCCESS:
                return{
                    loading: false,
                    events: action.payload,
                }
            case GET_EVENTS_FAIL: 
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

    export const getEventReducer = (state = { event: {} }, action) => {
        switch (action.type) {
    
            case GET_EVENT_REQUEST:           
                return {
                    ...state,
                    loading: true
                }
            case GET_EVENT_SUCCESS:
                return{
                    loading: false,
                    event: action.payload.event,
                }

            case GET_EVENT_FAIL:
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

    export const getStoreEventsReducer = (state = { storeevents: {} }, action) => {
        switch (action.type) {

            case GET_STORE_EVENTS_REQUEST:           
                return {
                    ...state,
                    loading: true
                }
            case GET_STORE_EVENTS_SUCCESS:
                return {
                    loading: false,
                    events: action.payload
                }
            case GET_STORE_EVENTS_FAIL:
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

    export const updateEventReducer = (state = { updateevent: {} }, action) => {
        switch (action.type) {

            case UPDATE_EVENT_REQUEST:          
                return {
                    ...state,
                    loading: true
                }
            case UPDATE_EVENT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isUpdated: action.payload
                }
            case UPDATE_EVENT_FAIL:
                return {
                    ...state,
                    error: action.payload
                    }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }
            case UPDATE_EVENT_RESET:
                return {
                    ...state,
                    isUpdated: false
                    }
            default:
                return state
        }
    }
    
    export const getAdminEventsReducer = (state = { events: [] }, action) => {
        switch (action.type) {
    
            case GET_ADMIN_EVENTS_REQUEST:          
                return {
                    ...state,
                    loading: true
                }
            case GET_ADMIN_EVENTS_SUCCESS:
                return{
                    loading: false,
                    events: action.payload
                }
            case GET_ADMIN_EVENTS_FAIL:
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

    export const deleteAdminEventReducer = (state = {}, action) => {
        switch (action.type) {

            case DELETE_ADMIN_EVENT_REQUEST:            
                return {
                    ...state,
                    loading: true
                }
            case DELETE_ADMIN_EVENT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isDeleted: action.payload
                }
            case DELETE_ADMIN_EVENT_FAIL: 
                return {
                    ...state,
                    error: action.payload
                    }
            case DELETE_ADMIN_EVENT_RESET: 
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