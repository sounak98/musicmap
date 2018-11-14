
import config from '../providerConfig';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyTokenStorageKey = 'mm_spotify_token',
        spotifyExpiryStorageKey = 'mm_spotify_expiry'; 

const { authUrl, redirectUrl, clientId, scopes } = config.spotify;

let spotifyWebApi = new SpotifyWebApi();

export default class SpotifyApi {

    fetchTrack(deviceId, trackId){
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [`spotify:track:${trackId}`] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.getToken()}`
            },
        });
    }
    
    authorize(){
         //check if user has denied access to Spotify
         if(!window.location.href.includes('?error=access_denied')){
                    
            //check if we have valid token
            if(!this.isTokenValid()){
                console.log("invalid token")
                this.removeToken();
                this.removeTokenExpiry();
                this.redirectToSpotify();
            }
            //check if user has authenticated with Spotify
            if(window.location.href.includes('#access_token')){
                this.storeTokenAndExpiry();    
            }  
        }
        else {
            console.log("Access Denied by User");
        }
    }
    async createSpotifyPlayer(player){
        let token = this.getToken();
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
                this.play('1geovaCdfs5fSa4NNgFPVe');
            });
        
            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
        
            // Connect to the player!
            return player.connect();
        };
    }

    redirectToSpotify(){
        let url = `${authUrl}?response_type=token` +
        `&client_id=${clientId}` +
        `${scopes ? '&scope=' + encodeURIComponent(scopes) : ''}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`  
        
        window.location = url;
    }
    
    storeTokenAndExpiry(){
        let params = this.getHashParamsFromCurrentUrl();
        let accessToken = params['access_token'];
        let expiry = new Date(new Date().getTime() + parseInt(params['expires_in'])).getTime()
        localStorage.setItem(spotifyTokenStorageKey, accessToken); 
        localStorage.setItem(spotifyExpiryStorageKey, expiry);  
    }

    getHashParamsFromCurrentUrl(){
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    isTokenValid(){
       
        if(this.getTokenExpiry() != null){
            let expiry = this.getTokenExpiry();
           
            if(expiry === (null || undefined)){
                return false;
            }
            if(Date.now() > expiry){
                this.removeToken();
                this.removeTokenExpiry();
                return false;
            }
            return true;
        }
        
        
        return false;
    }

    removeToken(){
        if(localStorage.getItem(spotifyTokenStorageKey) != null){
            localStorage.removeItem(spotifyTokenStorageKey);
        }
    }

    removeTokenExpiry(){
        if(localStorage.getItem(spotifyExpiryStorageKey) != null){
            localStorage.removeItem(spotifyExpiryStorageKey);
        }
    }

    getToken(){
        return localStorage.getItem(spotifyTokenStorageKey);
    }

    getTokenExpiry(){
        return localStorage.getItem(spotifyExpiryStorageKey);
    }
}
 