
export default class Spotify {
 
    redirectToSpotifyApi(){
        let clientId = 'f329b587614b4f97b8e2aadc26693dbc';
        let scopes = 'user-read-email';
        let redirect_uri = "http://localhost:3000/callback/";
        let url = 'https://accounts.spotify.com/authorize' +
        '?response_type=token' +
        '&client_id=' + clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri);
        window.location = url;  
        
    }
    
    getHashParamsFromCurrentUrl(){
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
}
 