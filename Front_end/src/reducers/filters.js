import * as types from '../constants/ActionTypes'


/* const filtersReducer = (state = {filters:{}}, action) => {
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
                value: {min: action.value.value.min, max: action.value.value.max }
            };
        case types.SORT_BY:
            return {
                ...state,
                sortBy: action.sort_by
            };
        default:
            return state;
    }
} */
export const categoryFiltersReducer = (state = {category:{}}, action) => {
    switch (action.type) {
        case types.FILTER_CATEGORY:
            return {
                ...state,
                category: action.category
            };
        default:
            return state;
    }
}

export const storeFiltersReducer = (state = {store:{}}, action) => {
    switch (action.type) {
        case types.FILTER_STORE:
            return {
                ...state,
                store: action.store
            };
        default:
            return state;
    }
}

export const priceFiltersReducer = (state = {price:{}}, action) => {
    switch (action.type) {
        case types.FILTER_PRICE:
            return {
                ...state,
                value: {min: action.value.value.min, max: action.value.value.max }
            };
        default:
            return state;
    }
}

export const sortbyFiltersReducer = (state = {sortby:{}}, action) => {
    switch (action.type) {
        case types.SORT_BY:
            return {
                ...state,
                sortBy: action.sort_by
            };
        default:
            return state;
    }
}