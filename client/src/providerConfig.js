export default {
    spotify: {
        sourceType: 'SPOTIFY',
        sdkUrl:'https://sdk.scdn.co/spotify-player.js',
        authUrl: 'https://accounts.spotify.com/authorize',
        redirectUrl: 'http://localhost:3000/callback/',
        clientId: 'f329b587614b4f97b8e2aadc26693dbc',
        scopes: 'user-read-email user-read-private user-read-birthdate user-modify-playback-state user-read-currently-playing user-read-playback-state streaming'
    }
}