import { SPOTIFY } from './types';
import { Spotify } from '../api';

let year = '2015'
export const getSpotifyAccessToken =  () => dispatch => {

    //redirect user to spotify api
    Spotify.redirectToSpotifyApi();

    //
    return dispatch({
        type: PLAYER.CURRENT_TRACK,
        payload: year
    });   
}