import { AUTH } from './types';

export const setCurrentUser = (user) => {
    return {
        type: AUTH.SET_CURRENT_USER,
        payload: user
    };
}

// difference b/w `return dispatch` and `dispatch`
// other files follow `return dispatch`
export const logoutUser = user => dispatch => {
    dispatch(setCurrentUser({}));
}

export const loginUser = user => dispatch => {
    dispatch(setCurrentUser(user));
};