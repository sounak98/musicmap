import React, { Component } from 'react';
import './App.css';
import SubGenreList from './components/SubGenreList';
import MusicPlayer from './components/MusicPlayer';
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
      <div className="App">
       <SubGenreList />
       <MusicPlayer />
      </div>
    );
  }
}

export default App;
