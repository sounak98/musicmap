import { PLAYER } from './types';

let year = '2015'
export const updateCurrentTrack =  () => dispatch => {
    console.log("Actions : playerActions")
    return dispatch({
        type: PLAYER.CURRENT_TRACK,
        payload: year
    });   
}