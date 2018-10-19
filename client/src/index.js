import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';

const customTheme = createMuiTheme({
    palette: {
        type: 'dark'
    },
    typography: {
        useNextVariants: true,
    }
})

console.log(customTheme);

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
