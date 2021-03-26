import * as types from '../constants/ActionTypes'


const filtersReducerDefaultState = {
    category: [],
    value: { min: 250, max: 950 },
    sortBy: ""
};

const filtersReducer = (state = {}, action) => {
    // console.log('Action Result');
    // console.log(action);
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
}

export default filtersReducer;