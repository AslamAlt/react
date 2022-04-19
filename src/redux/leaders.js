import { ADD_LEADERS, LEADERS_LOADING, LEADERS_FAILED } from './ActionTypes';

export const Leader = (state  = { isLoading: true,
    errMess: null,
    promotions:[]}, action) => {
    switch(action.type) {

        case ADD_LEADERS:
        return {...state, isLoading: false, errMess: null, leaders: action.payload};

        case LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []}

        case LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default: return state;
    }
}