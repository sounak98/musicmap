import { combineReducers } from 'redux';
import PlayerReducer from './playerReducer';
import AuthReducer from './authReducer';

export default combineReducers({
    player: PlayerReducer,
    auth: AuthReducer
})