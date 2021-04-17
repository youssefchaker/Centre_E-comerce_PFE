import * as types from '../constants/ActionTypes'

 export const filtersReducer = (state = {filters:{},category:[],store:[],value:{},valueDT:{},sortBy:""}, action) => {
    switch (action.type) {
        case types.FILTER_CATEGORY:
            return {
                ...state,
                category: action.category
            };
        case types.FILTER_STORE:
            return {
                ...state,
                store: action.store
            };
        case types.FILTER_PRICE:
            return {
                ...state,
                value: action.value.value
            };
        case types.FILTER_PRICE_DT:
            return {
                ...state,
                valueDT: action.valueDT.value
                };
        case types.SORT_BY:
            return {
                ...state,
                sortBy: action.sort_by
            };
        case types.EMPTY_FILTER:
            return {
                ...state,
                value: 0,
                valueDT:0
            };
        default:
            return state;
    }
} 
