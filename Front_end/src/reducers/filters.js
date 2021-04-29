import * as types from '../constants/ActionTypes'

 export const filtersReducer = (state = {filters:{},category:[],store:[],value:{},valueDT:{},sortBy:"",valuestore:{},valueDTstore:{},sortByStore:{}}, action) => {
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
                value: action.min,
                valueDT:action.minDT
            };
            case types.FILTER_PRICE_STORE:
                return {
                    ...state,
                    valuestore: action.valuestore.value
                };
            case types.FILTER_PRICE_DT_STORE:
                return {
                    ...state,
                    valueDTstore: action.valueDTstore.value
                    };
                    case types.EMPTY_FILTER_STORE:
                        return {
                            ...state,
                            valuestore: action.minstore.min,
                            valueDTstore:action.minDTstore.min
                        };
                        case types.SORT_BY_STORE:
                            return {
                                ...state,
                                sortByStore: action.sort_by_store
                            };
                        case types.CHANGE_MODE:
                            return{
                                ...state,
                                mode:action.mode
                            }
        default:
            return state;
    }
} 
