import axios from 'axios'
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


    export const newEvent = (eventData) => async (dispatch) => {
        try {
            dispatch({ type: NEW_EVENT_REQUEST })
    
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
    
            const { data } = await axios.post(`http://localhost:5000/api/mall/store/event/new`, eventData, config)
    
            dispatch({
                type: NEW_EVENT_SUCCESS,
                payload: data
            })
    
        } catch (error) {
            dispatch({
                type: NEW_EVENT_FAIL,
                payload: error.response.data.message
            })
        }
    }

    export const deleteEvent = (id) => async (dispatch) => {
        try {
    
            dispatch({ type: DELETE_EVENT_REQUEST })
    
            const { data } = await axios.delete(`http://localhost:5000/api/mall/store/event/${id}`)
    
            dispatch({
                type: DELETE_EVENT_SUCCESS,
                payload: data.success
            })
    
        } catch (error) {
            dispatch({
                type: DELETE_EVENT_FAIL,
                payload: error.response.data.message
            })
        }
    }

    export const getEventsLimited = () => async (dispatch) => {
        try {
    
            dispatch({ type: GET_LIMITED_EVENT_REQUEST })
    
            const { data } = await axios.get(`api/mall/events/limited`)
    
            dispatch({
                type: GET_LIMITED_EVENT_SUCCESS,
                payload: data.events
            })
    
        } catch (error) {
            dispatch({
                type: GET_LIMITED_EVENT_FAIL,
                payload: error.response.data.message
            })
        }
    }

    export const getEvents = () => async (dispatch) => {
        try {
    
            dispatch({ type: GET_EVENTS_REQUEST })
    
            const { data } = await axios.get(`api/mall/events`)
    
            dispatch({
                type: GET_EVENTS_SUCCESS,
                payload: data.events
            })
    
        } catch (error) {
            dispatch({
                type: GET_EVENTS_FAIL,
                payload: error.response.data.message
            })
        }
    }

    export const getEvent = (id) => async (dispatch) => {
        try {
    
            dispatch({ type: GET_EVENT_REQUEST })
    
            const { data } = await axios.get(`api/mall/event/${id}`)
    
            dispatch({
                type: GET_EVENT_SUCCESS,
                payload: data.events
            })
    
        } catch (error) {
            dispatch({
                type: GET_EVENT_FAIL,
                payload: error.response.data.message
            })
        }
    }

    export const getStoreEvents = (id) => async (dispatch) => {
        try {
    
            dispatch({ type: GET_STORE_EVENTS_REQUEST })
    
            const { data } = await axios.get(`api/mall/event/${id}`)
    
            dispatch({
                type: GET_STORE_EVENTS_SUCCESS,
                payload: data.events
            })
    
        } catch (error) {
            dispatch({
                type: GET_STORE_EVENTS_FAIL,
                payload: error.response.data.message
            })
        }
    }

    export const updateEvent = (id, eventData) => async (dispatch) => {
        try {
    
            dispatch({ type: UPDATE_EVENT_REQUEST })
    
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
    
            const { data } = await axios.put(`/api/mall/store/event/${id}`, eventData, config)
    
            dispatch({
                type: UPDATE_EVENT_SUCCESS,
                payload: data.success
            })
    
        } catch (error) {
            dispatch({
                type: UPDATE_EVENT_FAIL,
                payload: error.response.data.message
            })
        }
    }

    export const getAdminEvents = () => async (dispatch) => {
        try {
    
            dispatch({ type: GET_ADMIN_EVENTS_REQUEST })
    
            const { data } = await axios.get(`api/mall/admin/events`)
    
            dispatch({
                type: GET_ADMIN_EVENTS_SUCCESS,
                payload: data.events
            })
    
        } catch (error) {
            dispatch({
                type: GET_ADMIN_EVENTS_FAIL,
                payload: error.response.data.message
            })
        }
    }

    export const deleteAdminEvent = (id) => async (dispatch) => {
        try {
    
            dispatch({ type: DELETE_ADMIN_EVENT_REQUEST })
    
            const { data } = await axios.delete(`/api/mall/admin/event/${id}`)
    
            dispatch({
                type: DELETE_ADMIN_EVENT_SUCCESS,
                payload: data.success
            })
    
        } catch (error) {
            dispatch({
                type: DELETE_ADMIN_EVENT_FAIL,
                payload: error.response.data.message
            })
        }
    }

    // Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}