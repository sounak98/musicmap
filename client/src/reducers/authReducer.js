import { AUTH } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type){
        case AUTH.SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        default:
            return state;
    }
}