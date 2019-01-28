import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import jwt from 'jsonwebtoken';
import store from './store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import { setCurrentUser } from './actions/authActions';


const customTheme = createMuiTheme({
    palette: {
        type: 'light'
    },
    typography: {
        useNextVariants: true,
    }
})

if (localStorage.jwtToken) {
    const payload = jwt.decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser({
        email: payload.email,
        username: payload.username
    }));
}

const MusicMapApp = () => (
    <MuiThemeProvider theme={customTheme}>
        <App />
    </MuiThemeProvider>
)
ReactDOM.render(<MusicMapApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
