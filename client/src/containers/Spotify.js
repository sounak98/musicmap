import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import SpotifyWebApi from 'spotify-web-api-js';
import Script from 'react-load-script';
import Provider from  '../providerConfig';
import SpotifyApi from '../api/spotify';
import { connect } from 'react-redux';
import Player from '../components/PlayerUI';

let spotify = new SpotifyWebApi();

const spotifyApi = new SpotifyApi();
let player = null;
const styles = {
    root: {
      flexGrow: 1,
    }
  };
  

class Spotify extends Component {

    constructor(props){
        super(props);
        this.state = {
            scriptLoaded: false,
            scriptError: false,
            playerConnected: false,
            spotifyPlayerId: null,
            playerReady: false,
            isPlaying: false,
            isMuted: false
        }
    }

    handleScriptCreate() {
        console.log("Loading spotify player...")
        this.setState({ scriptLoaded: false });
        //TODO : display loading cursor
      }
       
      handleScriptError() {
        console.log("Error occured while loading spotify player..")
        this.setState({ scriptError: true })
        //TODO : display error message
      }
       
      handleScriptLoad() {
        console.log("Loaded spotify player.")
        this.setState({ scriptLoaded: true }) 
      }

      loadPlayerScript(){
        console.log("going to load script");
        return <Script
        url= {Provider.spotify.sdkUrl}
        onCreate={this.handleScriptCreate.bind(this)}
        onError={this.handleScriptError.bind(this)}
        onLoad={this.handleScriptLoad.bind(this)}
      />
      }

      connectPlayerToSpotify(){
        let token  = spotifyApi.getToken();
        console.log("token : " +  token)
        
        window.onSpotifyWebPlaybackSDKReady = () => {
            let Spotify = window.Spotify;
           player = new Spotify.Player({
                name: 'Ocean Protocol\'s Music Map',
                getOAuthToken: cb => { cb(token); }
            });
        
            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error("Auth : " + message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });
        
            // Playback status updates
            player.addListener('player_state_changed', state => { console.log(state); });
        
            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                this.setState({
                    playerReady: true
                })
            });
        
            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
                this.setState({
                    playerReady: false
                })
            });
        
            // Connect to the player!
            player
            .connect()
            .then(success => {
                if (success) {
                  console.log('The Web Playback SDK successfully connected to Spotify!');
                  this.setState({
                      playerConnected: true,
                      spotifyPlayerId: player['_options'].id
                  })
                }
            });
        }
      }

      
      play(trackId){
        spotifyApi.fetchTrack("95a5d7de21184c365403f37ce6e4bde412b6987b", trackId);
      }

      resume(){
        player.resume().then(() => {
            console.log('Resumed!');
          });
      }

      pause(){
        player.pause().then(() => {
            console.log('Paused!');
        });
        }

      seek(){
        player.seek(60 * 1000).then(() => {
            console.log('Changed position!');
          });
      }

      volume(){
        player.setVolume(0.5).then(() => {
            console.log('Volume updated!');
        });
      }
     
      
      componentWillMount(){
          console.log("Will mount")
        //check if user has denied access to Spotify
        if(!window.location.href.includes('?error=access_denied')){
            
            //check if we have valid token
            if(!spotifyApi.isTokenValid()){
                console.log("invalid token")
                spotifyApi.removeToken();
                spotifyApi.removeTokenExpiry();
                spotifyApi.redirectToSpotify();
            }
            //check if user has authenticated with Spotify
            if(window.location.href.includes('#access_token')){
                spotifyApi.storeTokenAndExpiry();    
            }
            //connect to spotify web playback sdk
            if(!this.state.playerConnected){
                this.connectPlayerToSpotify();
            }      
        }
        else {
            console.log("Access Denied by User");
        }
        
      }

      componentWillUnmount(){
            player.disconnect().then(() => {
                console.log("Player Disconnected..");
            })
      }

    render() {
        const { classes } = this.props;
        let test = this.state.playerConnected ? player.getCurrentState().then((res) => console.log(res)) : null
        return (
            <div className={classes.root}>
                {this.state.playerConnected ?  this.loadPlayerScript(): null}
                {this.state.scriptLoaded ? null : <LinearProgress />}
                <Player 
                    play={this.play} 
                    pause={this.pause}
                    volume={this.volume}
                    isPlaying={this.state.isPlaying}
                    isMuted={this.state.isMuted}/>
            </div>
            
        );
    }
 

}

const mapStateToProps = state => ({
    currentTrack: state.player.currentTrack
})

Spotify.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Spotify);


