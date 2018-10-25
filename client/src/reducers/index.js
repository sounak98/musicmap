import { combineReducers } from 'redux';
import PlayerReducer from './playerReducer';

export default combineReducers({
    player: PlayerReducer
})