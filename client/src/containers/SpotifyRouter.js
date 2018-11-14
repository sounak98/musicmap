import React from 'react';
import { Route } from 'react-router-dom';
import Spotify from '../../api/index';

const SpotifyRouter = ({component: Component, ...otherProps }) => {
    <Route {...otherProps} render={(props) => {
        let params = Spotify.getHashParamsFromCurrentUrl();

    }}></Route>
}


