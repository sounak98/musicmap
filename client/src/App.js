import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect
} from 'react-router-dom'
import Spotify from './containers/Spotify';
import MusicPlayer from './components/MusicPlayer';
import CoreGenre from './components/CoreGenre';
import Login from './components/Login';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
     
    }
  }

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
    
  }

  render() {
    return (
     
      <Provider store={store}>
       <>
        <Router>
          <>
            <Route exact path='/' component={CoreGenre} />
            <Route exact path='/login' component={Login} />
            <Route path='/callback' component={CoreGenre} />
            <Route path='/spotify' component={CoreGenre} />
          </>
        </Router>  
        
      </>
      </Provider>
      
    );
  }
}

export default App;
