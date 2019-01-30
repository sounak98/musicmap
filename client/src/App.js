import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import Spotify from './containers/Spotify';
import MusicPlayer from './components/MusicPlayer';
import CoreGenre from './components/CoreGenre';
import Logout from './components/Logout';
import Auth from './components/Auth';
import Profile from './components/Profile';
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
          <Switch>
            <ProtectedRoute exact path='/' component={CoreGenre} />
            <Route exact path='/auth' component={Auth} />
            <Route exact path='/auth/**' component={Auth} />
            <Route exact path='/logout' component={Logout} />
            {/* <Route path='/callback' component={CoreGenre} /> */}
            {/* <Route path='/spotify' component={CoreGenre} /> */}
            <ProtectedRoute exact path='/u/profile' component={Profile} />
            <Route path='*' component={NotFound} />
          </Switch>
        </Router>  
        
      </>
      </Provider>
      
    );
  }
}

export default App;
